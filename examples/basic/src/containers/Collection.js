import React from 'react';
import * as Guration from '../../../../src';
import Indent from '../components/Indent';

const Collection = ({ id, index, groups, children }) => (
  <Guration.Node type="collection" id={id} index={index}>
    {getDragProps => (
      <Guration.Dedupe type="articleFragment">
        <div>
          <h1 {...getDragProps()}>{id}</h1>
          <Indent>
            {groups.map((child, i) => (
              <div key={child.id}>{children(child)}</div>
            ))}
          </Indent>
        </div>
      </Guration.Dedupe>
    )}
  </Guration.Node>
);

export default Collection;
