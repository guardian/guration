// @flow

import { type ChildCountSpec } from './Children';

type GetDragProps = () => DragProps;

type DragProps = {
  draggable: true,
  onDragStart: (e: DragEvent) => void
};

type GetDropProps = (i: number, childInfo: ChildCountSpec) => DropProps;

type DropProps = {
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent) => void
};

export type { GetDragProps, DragProps, GetDropProps, DropProps };
