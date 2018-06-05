import React from 'react';
import { DedupeContext } from './Context';

class Dedupe extends React.Component {
  children = {};

  get type() {
    const { type } = this.props;
    return Array.isArray(type) ? type : [type];
  }

  register = (path, fields, type, id, index) => {
    if (this.type.indexOf(type) === -1) {
      return;
    }

    const prevOfType = this.context[type] || {};

    this.context = {
      ...this.context,
      [type]: {
        ...prevOfType,
        [id]: {
          path,
          fields,
          index
        }
      }
    };
  };

  deregister = (type, id) => {
    const prevOfType = this.context[type] || {};

    this.context = {
      ...this.context,
      [type]: {
        ...Object.entries(prevOfType)
          .filter(([id2]) => id2 !== id)
          .reduce((acc, [id2, node]) => ({
            ...acc,
            [id2]: node
          }))
      }
    };
  };

  getDuplicate = (type, id) => (this.context[type] || {})[id] || null;

  render = () => {
    const { children } = this.props;
    return (
      <DedupeContext.Provider
        value={{
          register: this.register,
          deregister: this.deregister,
          getDuplicate: this.getDuplicate
        }}
      >
        {children}
      </DedupeContext.Provider>
    );
  };
}

export default Dedupe;
