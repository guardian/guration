import React from 'react';
import * as Guration from '../../../../src';
import Children from './Children';

const ArticleFragment = ({ id, index, meta, children }) => (
  <Guration.Node type="articleFragment" id={id} index={index}>
    {getDragProps => (
      <div>
        <h1 {...getDragProps()}>{id}</h1>
        <Children
          childrenKey="meta.supporting"
          type="articleFragment"
          childArray={meta.supporting}
        >
          {children}
        </Children>
      </div>
    )}
  </Guration.Node>
);

export default ArticleFragment;
