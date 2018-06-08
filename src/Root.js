// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext } from './Context';
import Node from './Node';
import { move, insert, update } from './Edits';
import { isSubPath, pathForMove, hasMoved } from './utils/PathUtils';
import { getChangedFields, hasFields } from './utils/FieldUtils';
import { type Path } from './types/Path';
import { type InsertData, type MoveData } from './types/Data';
import { type Edit } from './Edits';
import { type GetDuplicate } from './Dedupe';

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

class Root extends React.Component<RootProps> {
  static defaultProps = {
    onError: () => {}
  };

  handleDragStart = (path: Path[], fields: Object, type: string) => (
    e: DragEvent
  ) => {
    if (!e.dataTransfer) {
      return;
    }
    e.dataTransfer.setData(
      INTERNAL_TRANSFER_TYPE,
      JSON.stringify({
        path,
        fields,
        type
      })
    );
  };

  getDropData(e: DragEvent) {
    const { dropMappers } = this.props;

    const { dataTransfer } = e;

    if (!dataTransfer) {
      return 'Unable to drop';
    }

    const type = Object.keys(dropMappers).find(key =>
      dataTransfer.getData(key)
    );

    if (!type) {
      return 'Unable to drop this';
    }

    return dropMappers[type](dataTransfer.getData(type));
  }

  handleDrop = (path: Path[], fields: Object, getDuplicate: GetDuplicate) => (
    e: DragEvent
  ) => {
    const { dataTransfer } = e;

    if (!dataTransfer) {
      return;
    }

    const moveDataStr = dataTransfer.getData(INTERNAL_TRANSFER_TYPE);

    if (moveDataStr) {
      const moveData: MoveData = JSON.parse(moveDataStr);
      this.handleMove(moveData, path, fields);
      return;
    }

    const data = this.getDropData(e);

    console.log(data);

    if (typeof data === 'string') {
      this.props.onError(data);
      return;
    }

    this.handleInsert(data, path, fields, getDuplicate);
  };

  handleMove(dragData: MoveData, path: Path[], fields: Object) {
    const { path: dragPath, fields: dragFields } = dragData;

    const { type: dragType, id } = dragPath[dragPath.length - 1];
    const { type } = path[path.length - 1];

    if (dragType !== type) {
      this.props.onError(`can't drop ${dragType} where ${type} should go`);
      return;
    }

    if (isSubPath(dragPath, path)) {
      this.props.onError(`can't drop into itself`);
      return;
    }

    const movePath = pathForMove(dragPath, path);

    const { index } = movePath[movePath.length - 1];

    const changedFields = getChangedFields(dragFields, fields);

    console.log(dragPath, path, hasMoved(dragPath, path));

    const edits = [
      hasMoved(dragPath, path)
        ? move(type, id, dragPath, movePath, index)
        : null,
      hasFields(changedFields) ? update(type, id, changedFields) : null
    ].filter(Boolean);

    if (edits.length) {
      this.props.onChange(edits);
    }
  }

  handleInsert(
    { type: dragType, id }: InsertData,
    path: Path[],
    fields: Object,
    getDuplicate: GetDuplicate
  ) {
    const { type, index } = path[path.length - 1];
    if (dragType !== type) {
      this.props.onError(`can't drop ${dragType} where ${type} should go`);
      return;
    }

    const duplicate = getDuplicate(dragType, id);

    console.log(duplicate);

    if (duplicate) {
      this.handleMove(duplicate, path, fields);
    } else {
      this.props.onChange(
        [
          insert(type, id, path, index),
          hasFields(fields) ? update(type, id, fields) : null
        ].filter(Boolean)
      );
    }
  }

  render() {
    const { type, id, children } = this.props;
    return (
      <PathContext.Consumer>
        {({ ...pathContext }) => (
          <PathContext.Provider value={{ ...pathContext, type }}>
            <RootContext.Provider
              value={{
                handleDragStart: this.handleDragStart,
                handleDrop: this.handleDrop
              }}
            >
              <Node type={type} id={id} index={0}>
                {children}
              </Node>
            </RootContext.Provider>
          </PathContext.Provider>
        )}
      </PathContext.Consumer>
    );
  }
}

export default Root;
