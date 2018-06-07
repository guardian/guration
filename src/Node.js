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
  dedupeKey?: string,
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

  get dedupeKey() {
    const { id, dedupeKey } = this.props;
    return dedupeKey || id;
  }

  deregister = () => {};

  componentDidMount = () => {
    const { register, deregister, fields, type, index } = this.props;
    register(this.path, fields, type, this.dedupeKey, index);
    this.deregister = () => deregister(type, this.dedupeKey);
  };

  componentDidUpdate = () => {
    const { register, deregister, fields, type, index } = this.props;
    this.deregister();
    register(this.path, fields, type, this.dedupeKey, index);
    this.deregister = () => deregister(type, this.dedupeKey);
  };

  componentWillUnmount = () => this.deregister();

  render = () => {
    const { children, fields, type, id, index } = this.props;
    return (
      <RootContext.Consumer>
        {({ handleDragStart }) => (
          <PathContext.Provider value={{ path: this.path, fields, type }}>
            {typeof children === 'function'
              ? children(() => ({
                  draggable: true,
                  onDragStart: handleDragStart(this.path, fields, type)
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
    {({ path, fields, type }) => (
      <DedupeContext.Consumer>
        {({ register, deregister }) => (
          <Node
            {...props}
            type={type}
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
