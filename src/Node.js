import React from 'react';
import DedupeNode from './DedupeNode';
import { AddPathLevel } from './utils/path';

const getDropIndexOffset = ({ currentTarget: el, clientY }) => {
  const { top, height } = el.getBoundingClientRect();
  const y = clientY - top;
  return y > height / 2 ? 1 : 0;
};

class Node extends React.Component {
  render() {
    const {
      item,
      id,
      dedupeKey,
      type,
      childrenField,
      index,
      handleDragStart,
      handleDragOver,
      handleDrop,
      children
    } = this.props;
    return (
      <AddPathLevel
        id={id}
        type={type}
        childrenField={childrenField}
        index={index}
      >
        {path => (
          <DedupeNode dedupeKey={dedupeKey} type={type} data={{ index, path }}>
            {getDuplicate =>
              children(
                item,
                () => ({
                  draggable: true,
                  onDragStart: handleDragStart(path, id, type),
                  ...(handleDrop
                    ? {
                        onDrop: handleDrop(
                          path,
                          getDuplicate,
                          getDropIndexOffset
                        ),
                        onDragOver: handleDragOver(
                          path,
                          getDuplicate,
                          getDropIndexOffset
                        )
                      }
                    : {})
                }),
                index
              )
            }
          </DedupeNode>
        )}
      </AddPathLevel>
    );
  }
}

export default Node;
