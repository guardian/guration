import React from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';

const Field = ({ type, value, children }) => (
  <RootContext.Consumer>
    {({ handleDrop }) => (
      <PathContext.Consumer>
        {({ path, fields }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <PathContext.Provider
                value={{
                  path,
                  fields: { ...fields, [type]: value }
                }}
              >
                {typeof children === 'function'
                  ? children(i => ({
                      onDragOver: e => e.preventDefault(),
                      onDrop: handleDrop(
                        path,
                        { ...fields, [type]: value },
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

export default Field;
