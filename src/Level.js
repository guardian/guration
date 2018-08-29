import React from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import DedupeLevel from './DedupeLevel';
import DedupeNode from './DedupeNode';
import { RootContext } from './Context';
import { AddPathLevel, eq } from './utils/path';

const isUndefined = x => typeof x === 'undefined';

const doRenderDrop = (
  renderDrop,
  onDrop,
  onDragOver,
  canDrop,
  dropPath,
  path,
  i
) => {
  if (!renderDrop) {
    return null;
  }

  const isTarget = dropPath && eq(path, dropPath);

  return renderDrop(
    () => ({
      onDrop,
      onDragOver
    }),
    {
      canDrop: isTarget && canDrop,
      isTarget
    },
    i
  );
};

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

    let didWarnKey = false;
    let didWarnDedupeKey = false;

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
                  {arr.map((item, i) => {
                    const key = getKey(item);
                    const dedupeKey = getDedupeKey(item);

                    if (isUndefined(key) && !didWarnKey) {
                      console.warn(
                        `\`getKey\` is returning undefined for type ${type}. This may cause unnecessary re-renders for these nodes and will cause React errors in development.`
                      );
                      didWarnKey = true;
                    }

                    if (isUndefined(dedupeKey) && !didWarnDedupeKey) {
                      console.warn(
                        `\`getDedupeKey\` is returning undefined for type ${type}. This will cause issues when trying to dedupe new nodes in this context.`
                      );
                      didWarnDedupeKey = true;
                    }

                    return (
                      <React.Fragment key={getKey(item)}>
                        <AddPathLevel
                          childrenField={this.childrenField}
                          id="@@DROP"
                          type={type}
                          index={i}
                        >
                          {path =>
                            doRenderDrop(
                              renderDrop,
                              handleDrop(path, getDuplicate, 0),
                              handleDragOver(path, getDuplicate, 0),
                              canDrop,
                              dropPath,
                              path,
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
                    );
                  })}
                  <AddPathLevel
                    childrenField={this.childrenField}
                    id="@@DROP"
                    type={type}
                    index={arr.length}
                  >
                    {path =>
                      doRenderDrop(
                        renderDrop,
                        handleDrop(path, getDuplicate, 0),
                        handleDragOver(path, getDuplicate, 0),
                        canDrop,
                        dropPath,
                        path,
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
