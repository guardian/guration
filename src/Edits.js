// @flow

import { type $Return } from './types/Utils';
import { type Path } from './types/Path';

const move = (
  type: string,
  id: string,
  dragPath: Path[],
  path: Path[],
  newIndex: number
) => ({
  type: 'MOVE',
  payload: {
    type,
    id,
    from: {
      parent: dragPath[dragPath.length - 2]
    },
    to: {
      parent: path[path.length - 2],
      index: newIndex
    }
  }
});

const insert = (
  type: string,
  id: string,
  dragPath: Path[],
  newIndex: number
) => ({
  type: 'INSERT',
  payload: {
    type,
    id,
    path: {
      parent: dragPath[dragPath.length - 2],
      index: newIndex
    }
  }
});

const update = (type: string, id: string, fields: Object) => ({
  type: 'UPDATE',
  payload: {
    type,
    id,
    fields
  }
});

type Move = $Return<typeof move>;
type Insert = $Return<typeof insert>;
type Update = $Return<typeof update>;
type Edit = Move | Insert | Update;

export { move, insert, update };
export type { Edit };
