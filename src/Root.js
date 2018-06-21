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
  dragData: ?MoveDrop,
  dropInfo: {
    path: ?(Path[]),
    canDrop: boolean
  }
};

class Root extends React.Component<RootProps, RootState> {
  eventHandled = false;

  state = {
    dragData: null,
    dropInfo: {
      path: null,
      canDrop: false
    }
  };

  static defaultProps = {
    onError: () => {},
    dropMappers: {}
  };

  runLowestOnly = (fn: () => void) => {
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

    // set this as we can't inspect dataTransfer on dragover
    this.setState({
      dragData: {
        dropType: 'MOVE',
        path,
        type
      }
    });
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
        ...JSON.parse(data),
        dropType: 'MOVE'
      })
    };
  }

  setDropInfo(path: ?(Path[]), canDrop: boolean) {
    const { path: dropPath } = this.state.dropInfo;
    if (
      (!path && dropPath) ||
      (path && !dropPath) ||
      (path && dropPath && !eq(path, dropPath))
    ) {
      this.setState({
        dropInfo: {
          path,
          canDrop
        }
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
    getDuplicate: GetDuplicate,
    childInfo: ?ChildCountSpec,
    getIndexOffset: ?(e: DragEvent) => number
  ) => (e: DragEvent) => {
    this.runLowestOnly(() => {
      e.preventDefault();
      this.runDragOver(
        candidatePath,
        getDuplicate,
        childInfo,
        getIndexOffset,
        e
      );
    });
  };

  runDragOver = throttle(
    (
      candidatePath: Path[],
      getDuplicate: GetDuplicate,
      childInfo: ?ChildCountSpec,
      getIndexOffset: ?(e: DragEvent) => number,
      e: DragEvent
    ) => {
      const indexOffset = getIndexOffset ? getIndexOffset(e) : 0;
      const path = addOffset(candidatePath, indexOffset);

      let edits = [];
      try {
        edits = this.state.dragData
          ? getEdits(this.state.dragData, path, getDuplicate, childInfo)
          : [];
      } catch (e) {}
      this.setDropInfo(path, !!edits.length);
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
    this.runLowestOnly(() => {
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
        onDrop={() => {
          this.setDropInfo(null, false);
        }}
        onDragOver={() => {
          if (!this.eventHandled) {
            this.setDropInfo(null, false);
          }
          this.eventHandled = false;
        }}
        onDragEnd={() => {
          this.eventHandled = false;
          this.setDropInfo(null, false);
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
                  dropInfo: this.state.dropInfo
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
