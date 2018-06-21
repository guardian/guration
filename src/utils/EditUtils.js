// @flow

import { isSubPath, isSibling, pathForMove, hasMoved } from './PathUtils';
import { move, insert } from '../Edits';

import { type Path } from '../types/Path';
import { type ChildCountSpec } from '../types/Children';
import { type Edit } from '../Edits';
import { type GetDuplicate } from '../Dedupe';
import { type ValidDrop } from '../Root';

const getEdits = (
  inputData: ValidDrop,
  inputPath: Path[],
  getDuplicate: GetDuplicate,
  childInfo: ?ChildCountSpec
): Edit[] =>
  inputData.dropType === 'MOVE'
    ? handleMove(inputData.path, inputPath, childInfo)
    : handleInsert(inputData, inputPath, getDuplicate, childInfo);

const handleMove = (prevPath, nextPath, childInfo) => {
  const { type: dragType, id } = prevPath[prevPath.length - 1];
  const { type } = nextPath[nextPath.length - 1];

  if (dragType !== type) {
    throw new Error(`can't drop ${dragType} where ${type} should go`);
  }

  if (isSubPath(prevPath, nextPath)) {
    throw new Error(`can't drop into itself`);
  }

  if (
    isSibling(prevPath, nextPath) &&
    childInfo &&
    childInfo.childrenCount >= childInfo.maxChildren
  ) {
    throw new Error(
      'Cannot drop, too many children and have not implemented replace logic'
    );
  }

  const movePath = pathForMove(prevPath, nextPath);

  const { index } = movePath[movePath.length - 1];

  const edits = [
    hasMoved(prevPath, nextPath)
      ? move(type, id, prevPath, movePath, index)
      : null
  ].filter(Boolean);

  return edits;
};

const handleInsert = (
  { type: dragType, id }: { type: string, id: string },
  path: Path[],
  getDuplicate: GetDuplicate,
  childInfo
) => {
  if (childInfo && childInfo.childrenCount >= childInfo.maxChildren) {
    throw new Error(
      'Cannot drop, too many children and have not implemented replace logic'
    );
  }

  const { type, index } = path[path.length - 1];

  if (dragType !== type) {
    throw new Error(`can't drop ${dragType} where ${type} should go`);
  }

  const duplicate = getDuplicate(dragType, id);

  return duplicate
    ? handleMove(duplicate.path, path)
    : [insert(type, id, path, index)].filter(Boolean);
};

export { getEdits };
