import React from 'react';

const DragZone = ({ children, type, data, json }) => (
  <div
    draggable
    onDragStart={e =>
      e.dataTransfer.setData(type, json ? JSON.stringify(data) : data)
    }
  >
    {children}
  </div>
);

export default DragZone;
