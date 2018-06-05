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
    id: string,
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
        [id]: {
          path,
          fields,
          index
        }
      }
    };
  };

  deregister = (type: string, id: string) => {
    const prevOfType = this.context[type] || {};

    this.context = {
      ...this.context,
      [type]: {
        ...Object.keys(prevOfType)
          .filter(id2 => id2 !== id)
          .reduce(
            (acc, id2) => ({
              ...acc,
              [id2]: prevOfType[id2]
            }),
            {}
          )
      }
    };
  };

  getDuplicate = (type: string, id: string): ?MoveData =>
    (this.context[type] || {})[id] || null;

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
