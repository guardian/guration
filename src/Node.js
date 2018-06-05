import React from 'react';
import { RootContext, PathContext, DedupeContext } from './Context';

class Node extends React.Component {
  get path() {
    const { path, type, id, index } = this.props;
    return [...path, { type, id, index }];
  }

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
    const { children, fields } = this.props;
    return (
      <RootContext.Consumer>
        {({ handleDragStart }) => (
          <PathContext.Provider
            value={{ path: this.path, fields }}
          >
            {typeof children === 'function'
              ? children(() => ({
                  draggable: true,
                  onDragStart: handleDragStart(this.path, fields)
                }))
              : children}
          </PathContext.Provider>
        )}
      </RootContext.Consumer>
    );
  };
}

export default ({ ...props }) => (
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
