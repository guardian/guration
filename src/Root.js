import React from 'react';
import { RootContext } from './Context';
import { move, insert, update } from './Edits';
import { isSubPath, pathForMove } from './utils/PathUtils';
import { getChangedFields, hasFields } from './utils/FieldUtils';

const INTERNAL_TRANSFER_TYPE = '@@TRANSFER';

class Root extends React.Component {
  handleDragStart = (path, fields, type, id, index) => e => {
    e.dataTransfer.setData(
      INTERNAL_TRANSFER_TYPE,
      JSON.stringify({
        path,
        fields,
        type,
        id,
        index
      })
    );
  };

  getDropData(e) {
    const { dropMappers } = this.props;

    const type = Object.keys(dropMappers).find(key =>
      e.dataTransfer.getData(key)
    );

    if (!type) {
      return null;
    }

    return dropMappers[type](e.dataTransfer.getData(type));
  }

  handleDrop = (path, fields, getDuplicate) => e => {
    const moveData = e.dataTransfer.getData(INTERNAL_TRANSFER_TYPE);

    if (moveData) {
      return this.handleMove(JSON.parse(moveData), path, fields);
    }

    const data = this.getDropData(e);

    if (!data) {
      return;
    }

    this.handleInsert(data, path, fields, getDuplicate);
  };

  handleMove(dragData, path, fields) {
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

    this.props.onChange([
      move(type, id, dragPath, movePath, index),
      hasFields(fields) && update(type, id, changedFields)
    ].filter(Boolean));
  }

  handleInsert({ type: dragType, id }, path, fields, getDuplicate) {
    const { type, index } = path[path.length - 1];
    if (dragType !== type) {
      this.props.onError(`can't drop ${dragType} where ${type} should go`);
      return;
    }

    const duplicate = getDuplicate(dragType, id);

    if (duplicate) {
      this.handleMove(duplicate, path, fields);
    } else {
      this.props.onChange([
        insert(type, id, path, index),
        hasFields(fields) && update(type, id, fields) 
      ].filter(Boolean));
    }
  }

  render = () => (
    <RootContext.Provider
      value={{
        handleDragStart: this.handleDragStart,
        handleDrop: this.handleDrop
      }}
    >
      {this.props.children}
    </RootContext.Provider>
  );
}

Root.defaultProps = {
  onError: () => {}
};

export default Root;
