import React from 'react';
import PropTypes from 'prop-types';
import { DedupeContext } from './Context';

class DedupeLevel extends React.Component {
  
  static propTypes = {
    type: PropTypes.string,
    parentContext: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  dedupeContext = {};

  register = (key, data) => {
    this.dedupeContext = {
      ...this.dedupeContext,
      [key]: data
    };
  };

  deregister = key => {
    const { [key]: omit, ...rest } = this.dedupeContext;
    this.dedupeContext = rest;
  };

  getDuplicate = key => this.dedupeContext[key] || null;

  render() {
    const context = this.props.type
      ? {
          [this.props.type]: {
            register: this.register,
            deregister: this.deregister,
            getDuplicate: this.getDuplicate
          },
          ...this.props.parentContext // keep parent context where possible
        }
      : this.props.parentContext;
    return (
      <DedupeContext.Provider value={context}>
        {this.props.children}
      </DedupeContext.Provider>
    );
  }
}

export default props => (
  <DedupeContext.Consumer>
    {parentContext => <DedupeLevel {...props} parentContext={parentContext} />}
  </DedupeContext.Consumer>
);
