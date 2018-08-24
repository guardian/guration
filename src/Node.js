import React from 'react';
import PropTypes from 'prop-types';
import DedupeNode from './DedupeNode';
import { AddPathLevel } from './utils/path';

const getDropIndexOffset = ({ currentTarget: el, clientY }) => {
  const { top, height } = el.getBoundingClientRect();
  const y = clientY - top;
  return y > height / 2 ? 1 : 0;
};

class Node extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dedupeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    type: PropTypes.string.isRequired,
    childrenField: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    handleDragStart: PropTypes.func.isRequired,
    handleDragOver: PropTypes.func.isRequired,
    handleDrop: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };

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
                  onDragStart: handleDragStart(item, path, id, type),
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
