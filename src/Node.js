// @flow

import React, { type Node as ReactNode } from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';
import Dedupe from './Dedupe';
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
  dedupeType?: string | string[],
  dedupeKey?: string,
  index: number
};

type NodePropsWithContext = NodeProps & {
  path: Path[],
  fields: Object,
  register: (
    type: string,
    id: string,
    path: Path[],
    fields: Object,
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

  reregister = () => {
    const { register, deregister, fields, type, index } = this.props;
    this.deregister();
    register(type, this.dedupeKey, this.path, fields, index);
    this.deregister = () => deregister(type, this.dedupeKey);
  };

  componentDidMount = () => this.reregister();
  componentDidUpdate = () => this.reregister();
  componentWillUnmount = () => this.deregister();

  getDedupeWrapperAndProps = () =>
    this.props.dedupeType
      ? {
          Wrapper: Dedupe,
          props: { type: this.props.dedupeType }
        }
      : { Wrapper: React.Fragment, props: {} };

  render = () => {
    const { children, dedupeType, fields, type, id, index } = this.props;

    const { Wrapper, props } = this.getDedupeWrapperAndProps();

    return (
      <RootContext.Consumer>
        {({ handleDragStart }) => (
          <PathContext.Provider value={{ path: this.path, fields, type }}>
            <Wrapper {...props}>
              {typeof children === 'function'
                ? children(() => ({
                    draggable: true,
                    onDragStart: handleDragStart(this.path, fields, type)
                  }))
                : children}
            </Wrapper>
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
