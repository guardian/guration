import React from 'react';
import { DedupeContext } from './Context';

class DedupeNode extends React.Component {
  get dedupeContext() {
    return this.props.context[this.props.type];
  }

  deregister = () => {};

  reregister = () => {
    const { dedupeContext } = this;
    const { data, dedupeKey } = this.props;

    if (!dedupeKey) {
      return;
    }

    this.deregister();

    if (!dedupeContext) {
      return;
    }

    const { register, deregister } = dedupeContext;
    register(dedupeKey, data);
    this.deregister = () => deregister(dedupeKey);
  };

  componentDidMount = () => this.reregister();
  componentDidUpdate = () => this.reregister();
  componentWillUnmount = () => this.deregister();

  get getDuplicate() {
    const { dedupeContext } = this;

    if (!dedupeContext) {
      return () => null;
    }

    return dedupeContext.getDuplicate;
  }

  render() {
    return this.props.children(this.getDuplicate);
  }
}

export default props => (
  <DedupeContext.Consumer>
    {context => <DedupeNode {...props} context={context} />}
  </DedupeContext.Consumer>
);
