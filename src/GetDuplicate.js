// @flow

import React from 'react';
import type { Node as ReactNode } from 'react';
import { DedupeContext } from './Context';
import type { DedupeContextType, DuplicateGetter } from './Context';
import type { Path } from './utils/path';

type ExternalGetDuplicateProps = {|
  type: string,
  children: (getDuplicate: DuplicateGetter) => ReactNode
|};

type GetDuplicateProps = {|
  ...ExternalGetDuplicateProps,
  context: DedupeContextType
|};

class GetDuplicate extends React.Component<GetDuplicateProps> {
  get dedupeContext() {
    return this.props.context[this.props.type];
  }

  get getDuplicate(): DuplicateGetter {
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

export default (props: ExternalGetDuplicateProps) => (
  <DedupeContext.Consumer>
    {(context: DedupeContextType) => (
      <GetDuplicate {...props} context={context} />
    )}
  </DedupeContext.Consumer>
);
