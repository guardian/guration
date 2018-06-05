// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import { type Path } from './types/Path';

type GetDropProps = () => {
  draggable: true,
  onDragStart: (e: DragEvent) => void
};

type ChildFunc = (getDropProps: GetDropProps) => ReactNode;

type NodeProps = {
  children: ChildFunc | ReactNode,
  type: string,
  id: string,
  index: number
};

type NodePropsWithContext = NodeProps & {
  path: Path[],
  fields: Object,
  register: (
    path: Path[],
    fields: Object,
    type: string,
    id: string,
    index: number
  ) => void,
  deregister: (type: string, id: string) => void
};

class Node extends React.Component<NodePropsWithContext> {
  get path() {
    const { path, type, id, index } = this.props;
    return [...path, { type, id, index }];
  }

  deregister = () => {};

  componentDidMount = () => {
    const { register, deregister, fields, type, id, index } = this.props;
    register(this.path, fields, type, id, index);
    this.deregister = () => deregister(type, id);
  };

  componentDidUpdate = () => {
    const { register, deregister, fields, type, id, index } = this.props;
    this.deregister();
    register(this.path, fields, type, id, index);
    this.deregister = () => deregister(type, id);
  };

  componentWillUnmount = () => this.deregister();

  render = () => {
    const { children, fields, type, id, index } = this.props;
    return (
      <RootContext.Consumer>
        {({ handleDragStart }) => (
          <PathContext.Provider value={{ path: this.path, fields }}>
            {typeof children === 'function'
              ? children(() => ({
                  draggable: true,
                  onDragStart: handleDragStart(this.path, fields, type, id, index)
                }))
              : children}
          </PathContext.Provider>
        )}
      </RootContext.Consumer>
    );
  };
}

export default (props: NodeProps) => (
  <PathContext.Consumer>
    {({ path, fields }) => (
      <DedupeContext.Consumer>
        {({ register, deregister }) => (
          <Node
            {...props}
            register={register}
            deregister={deregister}
            path={path}
            fields={fields}
          />
        )}
      </DedupeContext.Consumer>
    )}
  </PathContext.Consumer>
);
