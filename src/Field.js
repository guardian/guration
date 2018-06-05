// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';

type GetDropProps = (i: number) => ({
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent) => void
})

type ChildFunc = (getDropProps: GetDropProps) => ReactNode;

type FieldProps = {
  type: string,
  value: string | number | boolean,
  children: ReactNode | ChildFunc
};

const Field = ({ type, value, children }: FieldProps) => (
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
