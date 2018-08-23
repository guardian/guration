import { isSubPath, pathForMove, hasMoved } from './path';
import { move, insert } from '../edits';

const getEdits = (inputData, inputPath, getDuplicate) =>
  inputData.dropType === 'INTERNAL'
    ? handleMove(inputData.path, inputPath)
    : handleInsert(inputData, inputPath, getDuplicate);

const handleMove = (prevPath, nextPath) => {
  const { type: dragType, id } = prevPath[prevPath.length - 1];
  const { type } = nextPath[nextPath.length - 1];

  if (dragType !== type) {
    throw new Error(`can't drop ${dragType} where ${type} should go`);
  }

  if (isSubPath(prevPath, nextPath)) {
    throw new Error(`can't drop into itself`);
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

const handleInsert = ({ type: dragType, id }, path, getDuplicate) => {
  const { type, index } = path[path.length - 1];

  if (dragType !== type) {
    throw new Error(`can't drop ${dragType} where ${type} should go`);
  }

  const duplicate = getDuplicate(id);

  return duplicate
    ? handleMove(duplicate.path, path)
    : [insert(type, id, path, index)].filter(Boolean);
};

export { getEdits };
