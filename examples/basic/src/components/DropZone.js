import React from 'react';

const DropZone = ({ isOver, canDrop, ...props }) => (
  <div
    {...props}
    style={{
      border: `2px dashed ${isOver ? 'gold' : 'white'}`,
      height: '20px',
      backgroundColor: isOver ? (canDrop ? 'white' : 'grey') : 'transparent'
    }}
  />
);

export default DropZone;
