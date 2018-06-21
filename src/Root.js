// @flow

import React, { type Node as ReactNode } from 'react';
import throttle from 'lodash.throttle';
import { RootContext, PathContext } from './Context';
import Node from './Node';
import { addOffset, eq } from './utils/PathUtils';
import { type Path } from './types/Path';
import { type InsertData, type MoveData } from './types/Data';
import { type ChildCountSpec } from './types/Children';
import { type Edit } from './Edits';
import { type GetDuplicate } from './Dedupe';
import { getEdits } from './utils/EditUtils';

const INTERNAL_TRANSFER_TYPE = '@@TRANSFER';

type RootProps = {
  type: string,
  id: string,
  onChange: (edits: Edit[]) => void,
  onError: (error: string) => void,
  dropMappers: {
    [string]: (data: string) => InsertData | string
  },
  children: ReactNode
};

type InsertDrop = InsertData & { dropType: 'INSERT' };
type MoveDrop = MoveData & { dropType: 'MOVE' };

type ValidDrop = InsertDrop | MoveDrop;

type RootState = {
  dropPath: ?(Path[])
};

class Root extends React.Component<RootProps, RootState> {
  eventHandled = false;

  state = {
    dropPath: null
  };

  static defaultProps = {
    onError: () => {},
    dropMappers: {}
  };

  runLowest = (fn: () => void) => {
    if (this.eventHandled) {
      return;
    }
    this.eventHandled = true;
    fn();
  };

  handleDragStart = (path: Path[], type: string) => (e: DragEvent) => {
    if (!e.dataTransfer) {
      return;
    }
    e.dataTransfer.setData(
      INTERNAL_TRANSFER_TYPE,
      JSON.stringify({
        path,
        type
      })
    );
  };

  get dropMappers(): { [string]: (text: string) => ValidDrop | string } {
    const { dropMappers } = this.props;
    const insertMappers = Object.keys(dropMappers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: (text: string): string | InsertDrop => {
          const data = dropMappers[key](text);

          if (typeof data === 'string') {
            return data;
          }

          return {
            ...data,
            dropType: 'INSERT'
          };
        }
      }),
      {}
    );

    return {
      ...insertMappers,
      [INTERNAL_TRANSFER_TYPE]: (data): MoveDrop => ({
        ...(JSON.parse(data): MoveData),
        dropType: 'MOVE'
      })
    };
  }

  setDropPath(path: ?(Path[])) {
    if (
      (!path && this.state.dropPath) ||
      (path && !this.state.dropPath) ||
      (path && this.state.dropPath && !eq(path, this.state.dropPath))
    ) {
      console.log('setdroppath');
      this.setState({
        dropPath: path
      });
    }
  }

  getDropData(e: DragEvent): ValidDrop | string {
    const { dataTransfer } = e;

    if (!dataTransfer) {
      return 'Unable to drop';
    }

    const type = Object.keys(this.dropMappers).find(key =>
      dataTransfer.getData(key)
    );

    if (!type) {
      return 'Unable to drop this';
    }

    return this.dropMappers[type](dataTransfer.getData(type));
  }

  handleDragOver = (
    candidatePath: Path[],
    getIndexOffset: ?(e: DragEvent) => number
  ) => (e: DragEvent) => {
    this.runLowest(() => {
      e.preventDefault();
      this.runDragOver(candidatePath, getIndexOffset, e);
    });
  };

  runDragOver = throttle(
    (
      candidatePath: Path[],
      getIndexOffset: ?(e: DragEvent) => number,
      e: DragEvent
    ) => {
      const indexOffset = getIndexOffset ? getIndexOffset(e) : 0;
      const path = addOffset(candidatePath, indexOffset);
      this.setDropPath(path);
    },
    100,
    {
      trailing: false
    }
  );

  handleDrop = (
    candidatePath: Path[],
    getDuplicate: GetDuplicate,
    childInfo: ?ChildCountSpec,
    getIndexOffset: ?(e: DragEvent) => number
  ) => (e: DragEvent) => {
    this.runLowest(() => {
      const { dataTransfer } = e;

      if (!dataTransfer) {
        return;
      }

      // TODO: separate this logic and run it on dragover as well so that
      // drop path can be set to null if things don't validate, meaning drop
      // zones won't highlight

      const indexOffset = getIndexOffset ? getIndexOffset(e) : 0;
      const path = addOffset(candidatePath, indexOffset);

      const data = this.getDropData(e);

      if (typeof data === 'string') {
        this.props.onError(data);
        return;
      }

      try {
        const edits = getEdits(data, path, getDuplicate, childInfo);
        if (edits.length) {
          this.props.onChange(edits);
        }
      } catch (e) {
        console.log(e.message);
        this.props.onError(e.message);
      }
    });
  };

  render() {
    const { type, id, children } = this.props;
    return (
      <div
        onDragOver={() => {
          if (!this.eventHandled) {
            this.setDropPath(null);
          }
          this.eventHandled = false;
        }}
        onDragEnd={() => {
          console.l;
          this.eventHandled = false;
          this.setDropPath(null);
        }}
      >
        <PathContext.Consumer>
          {({ ...pathContext }) => (
            <PathContext.Provider value={{ ...pathContext, type }}>
              <RootContext.Provider
                value={{
                  handleDragStart: this.handleDragStart,
                  handleDrop: this.handleDrop,
                  handleDragOver: this.handleDragOver,
                  dropPath: this.state.dropPath
                }}
              >
                <Node type={type} id={id} index={0}>
                  {children}
                </Node>
              </RootContext.Provider>
            </PathContext.Provider>
          )}
        </PathContext.Consumer>
      </div>
    );
  }
}

export type { ValidDrop };

export default Root;
