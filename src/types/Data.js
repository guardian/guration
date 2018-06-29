// @flow

import { type Path } from './Path';

type InsertData = {
  type: string,
  id: string
};

type MoveData = {
  rootKey: string,
  path: Path[],
  type: string
};

export type { InsertData, MoveData };
