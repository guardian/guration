// @flow

import React, { type Node as ReactNode } from 'react';

type RenderChildrenProps<T> = {
  arr: T[],
  children: (child: T, i: number) => ReactNode,
  renderDrop: (i: number) => ReactNode,
  idKey?: string
};

const RenderChildren = <T: *>({
  arr,
  children,
  renderDrop,
  idKey
}: RenderChildrenProps<T>) => (
  <React.Fragment>
    {arr.map((child, i) => (
      <React.Fragment key={child[idKey || 'id']}>
        {renderDrop(i)}
        {children(child, i)}
      </React.Fragment>
    ))}
    {renderDrop(arr.length)}
  </React.Fragment>
);

export default RenderChildren;
