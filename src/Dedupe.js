// @flow

import React, { type Node as ReactNode } from 'react';
import { DedupeContext } from './Context';
import { type Path } from './types/Path';
import { type InsertData, type MoveData } from './types/Data';

type GetDuplicate = (type: string, id: string) => ?MoveData;

type DedupeProps = {
  children: ReactNode,
  type: string | string[]
};

type EntityMap = {
  [string]: {
    [string]: MoveData
  }
};

class Dedupe extends React.Component<DedupeProps> {
  context: EntityMap = {};

  get type() {
    const { type } = this.props;
    return Array.isArray(type) ? type : [type];
  }

  register = (
    path: Path[],
    fields: Object,
    type: string,
    key: string,
    index: number
  ) => {
    if (this.type.indexOf(type) === -1) {
      return;
    }

    const prevOfType = this.context[type] || {};

    this.context = {
      ...this.context,
      [type]: {
        ...prevOfType,
        [key]: {
          path,
          fields,
          index
        }
      }
    };
  };

  deregister = (type: string, key: string) => {
    const prevOfType = this.context[type] || {};

    this.context = {
      ...this.context,
      [type]: {
        ...Object.keys(prevOfType)
          .filter(key2 => key2 !== key)
          .reduce(
            (acc, key2) => ({
              ...acc,
              [key2]: prevOfType[key2]
            }),
            {}
          )
      }
    };
  };

  getDuplicate = (type: string, key: string): ?MoveData =>
    (this.context[type] || {})[key] || null;

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

export type { GetDuplicate };

export default Dedupe;
