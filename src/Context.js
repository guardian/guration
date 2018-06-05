import React from 'react';

const RootContext = React.createContext({
  handleDragStart: () => {},
  handleDrop: () => {}
});
const PathContext = React.createContext({ path: [], fields: {} });
const DedupeContext = React.createContext({
  register: () => {},
  dergister: () => {},
  getDuplicate: () => null
});

export { RootContext, PathContext, DedupeContext };
