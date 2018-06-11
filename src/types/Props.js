// @flow

import { type ChildCountSpec } from './Children';

type GetDragProps = () => {
  draggable: true,
  onDragStart: (e: DragEvent) => void
};

type GetDropProps = (
  i: number,
  childInfo: ChildCountSpec
) => {
  onDragOver: (e: DragEvent) => void,
  onDrop: (e: DragEvent) => void
};

export type { GetDragProps, GetDropProps };
