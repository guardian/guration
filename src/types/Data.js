// @flow

import { type Path } from './Path';

type InsertData = {
  type: string,
  id: string
};

type MoveData = InsertData & {
  path: Path[],
  fields: Object,
  index: number
};

export type { InsertData, MoveData };
