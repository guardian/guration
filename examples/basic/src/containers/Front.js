import React from 'react';
import * as Guration from '../../../../src';

const Front = ({ collections, children }) => (
  <Guration.Children childrenKey="collections" type="collection">
    {collections.map((child, i) => (
      <React.Fragment key={child.id}>{children(child, i)}</React.Fragment>
    ))}
  </Guration.Children>
);

export default Front;