import React from 'react';
import * as Guration from '../../../../src';
import Indent from '../components/Indent';
import DropZone from '../components/DropZone';

const Children = ({ children, childArray, ...props }) => (
  <Guration.Children {...props}>
    {getDropProps => (
      <Indent>
        {childArray.map((child, i) => (
          <React.Fragment key={child.id}>
            <DropZone {...getDropProps(i)} />
            <div>{children(child, i)}</div>
          </React.Fragment>
        ))}
        <DropZone {...getDropProps(childArray.length)} />
      </Indent>
    )}
  </Guration.Children>
);

export default Children;
