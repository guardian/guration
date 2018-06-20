// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import { eq } from './utils/PathUtils';
import { type Path } from './types/Path';
import { type ChildCountSpec } from './types/Children';

type ChildFunc = (
  getDropProps: (
    i: number,
    childInfo: ChildCountSpec,
    getIndexOffset: ?(e: DragEvent) => number
  ) => Object,
  isTarget: (index: number) => boolean
) => ReactNode;

type ChildrenProps = {
  field?: string,
  type: string,
  children: ChildFunc | ReactNode
};

type ChildrenPropsWithContext = ChildrenProps & {
  handleDragOver: *,
  handleDrop: *,
  dropPath: ?(Path[]),
  path: Path[],
  getDuplicate: *
};

class Children extends React.Component<ChildrenPropsWithContext> {
  get field() {
    return this.props.field || `${this.props.type}s`;
  }

  get path() {
    const { field } = this;
    const { path } = this.props;
    const parent = path[path.length - 1];

    return [
      ...path.slice(0, path.length - 1),
      {
        ...parent,
        childrenField: field
      }
    ];
  }

  getDropPath(i) {
    const { type } = this.props;
    return [...this.path, { type, index: i, id: '@@DROP' }];
  }

  getDropProps = (i: number, childInfo: ?ChildCountSpec, getOffsetIndex: *) => {
    const { type, handleDragOver, handleDrop, path, getDuplicate } = this.props;

    return {
      onDragOver: handleDragOver(this.getDropPath(i), getOffsetIndex),
      onDrop: handleDrop(this.getDropPath(i), getDuplicate, childInfo)
    };
  };

  render() {
    const { path } = this;
    const { type, children, dropPath } = this.props;

    return (
      <PathContext.Provider
        value={{
          path,
          type
        }}
      >
        {typeof children === 'function'
          ? children(
              this.getDropProps,
              (i: number) => !!dropPath && eq(dropPath, this.getDropPath(i))
            )
          : children}
      </PathContext.Provider>
    );
  }
}

export default (props: ChildrenProps) => (
  <RootContext.Consumer>
    {({ handleDrop, handleDragOver, dropPath }) => (
      <PathContext.Consumer>
        {({ path }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <Children
                {...props}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                dropPath={dropPath}
                path={path}
                getDuplicate={getDuplicate}
              />
            )}
          </DedupeContext.Consumer>
        )}
      </PathContext.Consumer>
    )}
  </RootContext.Consumer>
);
