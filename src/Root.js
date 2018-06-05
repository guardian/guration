// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext } from './Context';
import Node from './Node';
import { move, insert, update } from './Edits';
import { isSubPath, pathForMove } from './utils/PathUtils';
import { getChangedFields, hasFields } from './utils/FieldUtils';
import { type Path } from './types/Path';
import { type InsertData, type MoveData } from './types/Data';
import { type Edit } from './Edits';
import { type GetDuplicate } from './Dedupe';

const INTERNAL_TRANSFER_TYPE = '@@TRANSFER';

type RootProps = {
  onChange: (edits: Edit[]) => void,
  onError: (error: string) => void,
  dropMappers: {
    [string]: (data: string) => InsertData | null
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
      return;
    }

    const type = Object.keys(dropMappers).find(key =>
      dataTransfer.getData(key)
    );

    if (!type) {
      return null;
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

    if (!data) {
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

    // TODO: find the changed fields
    const changedFields = getChangedFields(dragFields, fields);

    this.props.onChange(
      [
        move(type, id, dragPath, movePath, index),
        hasFields(fields) && update(type, id, changedFields)
      ].filter(Boolean)
    );
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

    if (duplicate) {
      this.handleMove(duplicate, path, fields);
    } else {
      this.props.onChange(
        [
          insert(type, id, path, index),
          hasFields(fields) && update(type, id, fields)
        ].filter(Boolean)
      );
    }
  }

  render = () => (
    <RootContext.Provider
      value={{
        handleDragStart: this.handleDragStart,
        handleDrop: this.handleDrop
      }}
    >
      <Node type="@@ROOT" id="@@ROOT" index={0}>
        {this.props.children}
      </Node>
    </RootContext.Provider>
  );
}

export default Root;
