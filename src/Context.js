// @flow

import React from 'react';
import { type Path } from './types/Path';
import { type MoveData } from './types/Data';
import { type ChildCountSpec } from './types/Children';
import { type GetDuplicate } from './Dedupe';

const RootContext = React.createContext({
  handleDragStart: (path: Path[], type: string) => (e: DragEvent) => {},
  handleDragOver: (path: Path[], getIndexOffset: ?(e: DragEvent) => number) => (
    e: DragEvent
  ) => {},
  handleDrop: (
    path: Path[],
    getDuplicate: GetDuplicate,
    childInfo: ?ChildCountSpec,
    getIndexOffset: ?(e: DragEvent) => number
  ) => (e: DragEvent) => {},
  dropPath: (null: ?(Path[]))
});
const PathContext = React.createContext({
  path: [],
  type: '@@ROOT'
});
const DedupeContext = React.createContext({
  register: (type: string, id: string, path: Path[], index: number) => {},
  deregister: (type: string, id: string) => {},
  getDuplicate: (type: string, id: string): ?MoveData => null
});

export { RootContext, PathContext, DedupeContext };
