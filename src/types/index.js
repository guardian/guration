// @flow

import type { Path } from '../utils/path';

type ExternalDrag = {|
  dropType: 'EXTERNAL',
  id: string,
  type: string
|};

type InternalDrag = {|
  dropType: 'INTERNAL',
  rootKey: string,
  path: Path[],
  type: string
|};

type Drag = ExternalDrag | InternalDrag;

type EventType = SyntheticDragEvent<HTMLElement>;

type DuplicateGetter = <T>(
  id: string
) => ?{
  index: number,
  path: Path[]
};

type IndexOffsetGetter = ((e: EventType) => number) | number;

export type {
  Drag,
  InternalDrag,
  ExternalDrag,
  EventType,
  DuplicateGetter,
  IndexOffsetGetter
};
