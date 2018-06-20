// @flow

import { type Path } from './Path';

type InsertData = {
  type: string,
  id: string
};

type MoveData = {
  path: Path[],
  index: number
};

export type { InsertData, MoveData };
