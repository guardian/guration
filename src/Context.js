// @flow

import React from 'react';
import { type Path } from './types/Path';
import { type MoveData } from './types/Data';
import { type ChildCountSpec } from './types/Children';
import { type GetDuplicate } from './Dedupe';

const RootContext = React.createContext({
  handleDragStart: (path: Path[], fields: Object, type: string) => (
    e: DragEvent
  ) => {},
  handleDrop: (
    path: Path[],
    fields: Object,
    getDuplicate: GetDuplicate,
    childInfo: ?ChildCountSpec
  ) => (e: DragEvent) => {}
});
const PathContext = React.createContext({
  path: [],
  fields: {},
  type: '@@ROOT'
});
const DedupeContext = React.createContext({
  register: (
    type: string,
    id: string,
    path: Path[],
    fields: Object,
    index: number
  ) => {},
  deregister: (type: string, id: string) => {},
  getDuplicate: (type: string, id: string): ?MoveData => null
});

export { RootContext, PathContext, DedupeContext };
