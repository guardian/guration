import React from 'react';
import * as Guration from '../../../../src';

const Supporting = ({ id, index }) => (
  <Guration.Node type="articleFragment" id={id} index={index}>
    {getDragProps => (
      <div>
        <h1 {...getDragProps()}>{id}</h1>
      </div>
    )}
  </Guration.Node>
);

export default Supporting;
