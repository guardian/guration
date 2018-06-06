// @flow

import { type $Return } from './types/Utils';
import { type Path } from './types/Path';

type Move = {|
  type: 'MOVE',
  payload: {|
    type: string,
    id: string,
    from: {|
      parent: Path
    |},
    to: {|
      parent: Path,
      index: number
    |}
  |}
|};

type Insert = {|
  type: 'INSERT',
  payload: {|
    type: string,
    id: string,
    path: {|
      parent: Path,
      index: number
    |}
  |}
|};

type Update = {|
  type: 'UPDATE',
  payload: {|
    type: string,
    id: string,
    fields: Object
  |}
|};

const move = (
  type: string,
  id: string,
  dragPath: Path[],
  path: Path[],
  newIndex: number
): Move => ({
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
): Insert => ({
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

const update = (type: string, id: string, fields: Object): Update => ({
  type: 'UPDATE',
  payload: {
    type,
    id,
    fields
  }
});

type Edit = Move | Insert | Update;

export { move, insert, update };
export type { Edit, Move, Insert, Update };
