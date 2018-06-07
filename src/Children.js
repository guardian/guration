// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import { type Path } from './types/Path';

const updatePath = (path: Path[], childrenKey: string) => {
  const parent = path[path.length - 1];

  return [
    ...path.slice(0, path.length - 1),
    {
      ...parent,
      childrenKey
    }
  ];
};

type GetDropProps = (
  i: number
) => {
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent) => void
};

type ChildFunc = (getDropProps: GetDropProps) => ReactNode;

type ChildrenProps = {
  childrenKey?: string,
  type: string,
  children: ChildFunc | ReactNode
};

const Children = ({
  type,
  children,
  childrenKey = `${type}s`
}: ChildrenProps) => (
  <RootContext.Consumer>
    {({ handleDrop }) => (
      <PathContext.Consumer>
        {({ path, fields }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <PathContext.Provider
                value={{
                  path: updatePath(path, childrenKey),
                  fields,
                  type
                }}
              >
                {typeof children === 'function'
                  ? children(i => ({
                      onDragOver: e => e.preventDefault(),
                      onDrop: handleDrop(
                        [
                          ...updatePath(path, childrenKey),
                          { type, index: i, id: '@@DROP' }
                        ],
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
