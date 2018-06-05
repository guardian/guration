import React from 'react';
import * as Guration from '../../../../src';
import Children from './Children';

const Group = ({ id, index, articleFragments, children }) => (
  <Guration.Field type="group" value={id} index={index}>
    <div>
      <h1>{id}</h1>
      <Children
        childrenKey="articleFragments"
        type="articleFragment"
        childArray={articleFragments}
      >
        {children}
      </Children>
    </div>
  </Guration.Field>
);

export default Group;
