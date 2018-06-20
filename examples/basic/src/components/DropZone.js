import React from 'react';

const DropZone = ({ isOver, ...props }) => (
  <div
    {...props}
    style={{
      border: '2px dashed blue',
      height: '20px',
      backgroundColor: isOver ? 'white' : 'transparent'
    }}
  />
);

export default DropZone;
