import { createContext } from 'react';

const PathContext = createContext([]);
const RootContext = createContext({
  rootKey: null,
  handleDragOver: () => {
    throw new Error('Cannot handle dragover outside of Guration.Root');
  },
  handleDrop: () => {
    throw new Error('Cannot handle drop outside of Guration.Root');
  }
});
const DedupeContext = createContext({});

export { PathContext, RootContext, DedupeContext };
