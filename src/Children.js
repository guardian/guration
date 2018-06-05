import React from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';

const updatePath = (path, childrenKey) => {
  const parent = path[path.length - 1] || {};

  return [
    ...path.slice(0, path.length - 1),
    {
      ...parent,
      childrenKey
    }
  ];
};

const Children = ({ childrenKey, type, children }) => (
  <RootContext.Consumer>
    {({ handleDrop }) => (
      <PathContext.Consumer>
        {({ path, fields }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <PathContext.Provider
                value={{
                  path: updatePath(path, childrenKey),
                  fields
                }}
              >
                {typeof children === 'function'
                  ? children(i => ({
                      onDragOver: e => e.preventDefault(),
                      onDrop: handleDrop(
                        [...updatePath(path, childrenKey), { type, index: i }],
                        fields,
                        getDuplicate
                      )
                    }))
                  : children}
              </PathContext.Provider>
            )}
          </DedupeContext.Consumer>
        )}
      </PathContext.Consumer>
    )}
  </RootContext.Consumer>
);

export default Children;
