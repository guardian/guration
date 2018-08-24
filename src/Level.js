import React from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import DedupeLevel from './DedupeLevel';
import DedupeNode from './DedupeNode';
import { RootContext } from './Context';
import { AddPathLevel, eq } from './utils/path';

class Level extends React.Component {
  static propTypes = {
    arr: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
    children: PropTypes.func.isRequired,
    renderDrop: PropTypes.func,
    getKey: PropTypes.func,
    getDedupeKey: PropTypes.func,
    dropOnNode: PropTypes.bool,
    dedupeType: PropTypes.string,
    field: PropTypes.string
  };

  static defaultProps = {
    dropOnNode: true, // sets node drag props to allow drops
    getKey: ({ id }) => id
  };

  get childrenField() {
    return this.props.field || `${this.props.type}s`;
  }

  render() {
    const {
      arr,
      type,
      children,
      renderDrop,
      getKey,
      getDedupeKey = getKey,
      dropOnNode,
      dedupeType
    } = this.props;

    return (
      <DedupeLevel type={dedupeType}>
        <DedupeNode type={type}>
          {getDuplicate => (
            <RootContext.Consumer>
              {({
                handleDragStart,
                handleDragOver,
                handleDrop,
                dropInfo: { canDrop, path: dropPath }
              }) => (
                <React.Fragment>
                  {arr.map((item, i) => (
                    <React.Fragment key={getKey(item)}>
                      <AddPathLevel
                        childrenField={this.childrenField}
                        id="@@DROP"
                        type={type}
                        index={i}
                      >
                        {path =>
                          renderDrop &&
                          renderDrop(
                            () => ({
                              onDrop: handleDrop(path, getDuplicate, 0),
                              onDragOver: handleDragOver(path, getDuplicate, 0)
                            }),
                            {
                              canDrop,
                              isOver: dropPath && eq(path, dropPath)
                            },
                            i
                          )
                        }
                      </AddPathLevel>
                      <Node
                        item={item}
                        id={getKey(item)}
                        dedupeKey={getDedupeKey(item)}
                        type={type}
                        index={i}
                        childrenField={this.childrenField}
                        // TODO: maybe move this into Node?
                        handleDragStart={handleDragStart}
                        handleDragOver={dropOnNode && handleDragOver}
                        handleDrop={dropOnNode && handleDrop}
                      >
                        {children}
                      </Node>
                    </React.Fragment>
                  ))}
                  <AddPathLevel
                    childrenField={this.childrenField}
                    id="@@DROP"
                    type={type}
                    index={arr.length}
                  >
                    {path =>
                      renderDrop &&
                      renderDrop(
                        () => ({
                          onDrop: handleDrop(path, getDuplicate, 0),
                          onDragOver: handleDragOver(path, getDuplicate, 0)
                        }),
                        {
                          canDrop,
                          isOver: dropPath && eq(path, dropPath)
                        },
                        arr.length
                      )
                    }
                  </AddPathLevel>
                </React.Fragment>
              )}
            </RootContext.Consumer>
          )}
        </DedupeNode>
      </DedupeLevel>
    );
  }
}

export default Level;
