// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import { type Path } from './types/Path';

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

type ChildrenPropsWithContext = ChildrenProps & {
  handleDrop: *,
  path: Path[],
  fields: Object,
  getDuplicate: *
};

class Children extends React.Component<ChildrenPropsWithContext> {
  get childrenKey() {
    return this.props.childrenKey || `${this.props.type}s`;
  }

  get path() {
    const { childrenKey } = this;
    const { path } = this.props;
    const parent = path[path.length - 1];

    return [
      ...path.slice(0, path.length - 1),
      {
        ...parent,
        childrenKey
      }
    ];
  }

  getDragProps = i => {
    const { type, handleDrop, path, fields, getDuplicate } = this.props;

    return {
      onDragOver: e => e.preventDefault(),
      onDrop: handleDrop(
        [...this.path, { type, index: i, id: '@@DROP' }],
        fields,
        getDuplicate
      )
    };
  };

  render() {
    const { childrenKey, path } = this;
    const { type, children, fields } = this.props;

    return (
      <PathContext.Provider
        value={{
          path,
          fields,
          type
        }}
      >
        {typeof children === 'function'
          ? children(this.getDragProps)
          : children}
      </PathContext.Provider>
    );
  }
}

export default (props: ChildrenProps) => (
  <RootContext.Consumer>
    {({ handleDrop }) => (
      <PathContext.Consumer>
        {({ path, fields }) => (
          <DedupeContext.Consumer>
            {({ getDuplicate }) => (
              <Children
                {...props}
                handleDrop={handleDrop}
                path={path}
                fields={fields}
                getDuplicate={getDuplicate}
              />
            )}
          </DedupeContext.Consumer>
        )}
      </PathContext.Consumer>
    )}
  </RootContext.Consumer>
);
