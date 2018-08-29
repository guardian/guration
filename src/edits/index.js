const remove = (type, id, path) => ({
  type: 'REMOVE',
  payload: {
    type,
    id,
    path: {
      parent: path[path.length - 2]
    }
  }
});

const insert = (type, id, path, index) => ({
  type: 'INSERT',
  payload: {
    type,
    id,
    path: {
      parent: path[path.length - 2],
      index
    }
  }
});

export { remove, insert };
