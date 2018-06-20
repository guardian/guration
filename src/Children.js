// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import { type Path } from './types/Path';
import { type GetDropProps } from './types/Props';
import { type ChildCountSpec } from './types/Children';

type ChildFunc = (getDropProps: GetDropProps) => ReactNode;

type ChildrenProps = {
  field?: string,
  type: string,
  children: ChildFunc | ReactNode
};

type ChildrenPropsWithContext = ChildrenProps & {
  handleDrop: *,
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

  getDropProps = (i: number, childInfo: ?ChildCountSpec) => {
    const { type, handleDrop, path, getDuplicate } = this.props;

    return {
      onDragOver: e => e.preventDefault(),
      onDrop: handleDrop(
        [...this.path, { type, index: i, id: '@@DROP' }],
        getDuplicate,
        childInfo
      )
    };
  };

  render() {
    const { path } = this;
    const { type, children } = this.props;

    return (
      <PathContext.Provider
        value={{
          path,
          type
        }}
      >
        {typeof children === 'function'
          ? children(this.getDropProps)
          : children}
      </PathContext.Provider>
    );
  }
}

export default (props: ChildrenProps) => (
  <RootContext.Consumer>
    {({ handleDrop }) => (
      <PathContext.Consumer>
        {({ path }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <Children
                {...props}
                handleDrop={handleDrop}
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
