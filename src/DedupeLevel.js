// @flow

import React from 'react';
import type { Node as ReactNode } from 'react';
import PropTypes from 'prop-types';
import { DedupeContext } from './Context';
import type { DedupeContextType } from './Context';
import type { Path } from './utils/Path';

type ExternalDedupeLevelProps = {|
  type?: string,
  children: ReactNode
|};

type DedupeLevelProps = {|
  ...ExternalDedupeLevelProps,
  parentContext: DedupeContextType
|};

type DedupeInfo = { index: number, path: Path[] };

class DedupeLevel extends React.Component<DedupeLevelProps> {
  dedupeContext: { [string]: DedupeInfo } = {};

  register = (key: string, index: number, path: Path[]) => {
    this.dedupeContext = {
      ...this.dedupeContext,
      [key]: {
        index,
        path
      }
    };
  };

  deregister = (key: string) => {
    const { [key]: omit, ...rest } = this.dedupeContext;
    this.dedupeContext = rest;
  };

  getDuplicate = (key: string) => this.dedupeContext[key] || null;

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

export default (props: ExternalDedupeLevelProps) => (
  <DedupeContext.Consumer>
    {parentContext => <DedupeLevel {...props} parentContext={parentContext} />}
  </DedupeContext.Consumer>
);
