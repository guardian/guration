import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Root, Level } from '../index';

class DataTransfer {
  data = {};

  setData = (key, val) => (this.data[key] = val);
  getData = key => this.data[key];
}

const createDragEvent = () => {
  const _data = {};

  return {
    dataTransfer: {
      setData: (key, val) => (_data[key] = val),
      getData: key => _data[key]
    }
  };
};

const runDrag = (type, data, json = true) => dropProps => {
  const e = createDragEvent();

  if (typeof type === 'string') {
    e.dataTransfer.setData(type, json ? JSON.stringify(data) : data);
  } else {
    // type is actually dragProps
    type.onDragStart(e);
  }

  dropProps.onDrop(e);
};

describe('Guration', () => {
  it('creates MOVE events from dragged nodes', () => {
    let dragProps;
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root type="@@ROOT" id="@@ROOT" onChange={e => (edit = e)}>
        <Level arr={[{ id: 1 }, { id: 2 }]} type="a">
          {(child, getDragProps, getDropProps, i) => {
            if (i === 0) {
              dragProps = getDragProps();
            }

            return (
              <Level
                arr={[{ id: 1 }, { id: 2 }]}
                field="children"
                type="a"
                renderDrop={(_dropProps, isTarget, i) => {
                  if (i === 1) {
                    dropProps = _dropProps;
                  }
                }}
              >
                {() => {}}
              </Level>
            );
          }}
        </Level>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(edit[0].type).toEqual('MOVE');
  });

  it('creates INSERT events from mapped drops', () => {
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root
        type="@@ROOT"
        id="@@ROOT"
        onChange={e => (edit = e)}
        dropMappers={{
          text: str => JSON.parse(str)
        }}
      >
        <Level arr={[{ id: 2 }]} type="a">
          {() => (
            <Level
              arr={[{ id: 1 }]}
              type="a"
              field="children"
              renderDrop={_dropProps => {
                dropProps = _dropProps;
              }}
            >
              {() => {}}
            </Level>
          )}
        </Level>
      </Root>
    );

    runDrag('text', {
      type: 'a',
      id: 2
    })(dropProps);

    expect(edit[0]).toEqual({
      type: 'INSERT',
      payload: {
        type: 'a',
        id: 2,
        path: {
          parent: {
            type: 'a',
            id: 2,
            index: 0,
            childrenField: 'children'
          },
          index: 1
        }
      }
    });
  });

  it('creates MOVE events from duplicate drops', () => {
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root
        type="@@ROOT"
        id="@@ROOT"
        onChange={e => (edit = e)}
        dropMappers={{
          text: str => JSON.parse(str)
        }}
      >
        <Level arr={[{ id: 3 }]} dedupeType="a" field="children1" type="a">
          {() => (
            <Level
              arr={[{ id: 2 }, { id: 3 }, { id: 4 }]}
              field="children2"
              type="a"
              renderDrop={(_dropProps, isTarget, i) => {
                if (i === 1) {
                  dropProps = _dropProps;
                }
              }}
            >
              {() => {}}
            </Level>
          )}
        </Level>
      </Root>
    );

    runDrag('text', {
      type: 'a',
      id: 4
    })(dropProps);

    expect(edit[0]).toEqual({
      payload: {
        from: {
          parent: {
            childrenField: 'children2',
            id: 3,
            index: 0,
            type: 'a'
          }
        },
        id: 4,
        to: {
          parent: { id: 3, index: 0, type: 'a', childrenField: 'children2' },
          index: 1
        },
        type: 'a'
      },
      type: 'MOVE'
    });
  });

  it('does not allow moves of a node to a subPath of that node', () => {
    let dragProps;
    let dropProps;
    let error;

    TestRenderer.create(
      <Root type="@@ROOT" id="@@ROOT" onError={e => (error = e)}>
        <Level arr={[{ id: 2 }]} type="a" field="children">
          {(child, getDragProps) => {
            dragProps = getDragProps();
            return (
              <Level
                arr={[]}
                field="children"
                type="a"
                renderDrop={_dropProps => {
                  dropProps = _dropProps;
                }}
              >
                {() => {}}
              </Level>
            );
          }}
        </Level>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(error).toBeTruthy();
  });

  it('does not allow move of a node to an invalid type position', () => {
    let dragProps;
    let dropProps;
    let error;

    TestRenderer.create(
      <Root type="@@ROOT" id="@@ROOT" onError={e => (error = e)}>
        <Level arr={[{ id: 2 }]} field="children" type="a">
          {(child, getDragProps) => {
            dragProps = getDragProps();
          }}
        </Level>
        <Level
          arr={[]}
          field="other"
          type="b"
          renderDrop={_dropProps => {
            dropProps = _dropProps;
          }}
        >
          {() => {}}
        </Level>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(error).toBeTruthy();
  });

  it('adjusts move indices when moving things that affect the drop index', () => {
    let dragProps;
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root type="@@ROOT" id="@@ROOT" onChange={e => (edit = e)}>
        <Level
          type="b"
          arr={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          renderDrop={_dropProps => {
            dropProps = _dropProps;
          }}
        >
          {(child, getDragProps, getDropProps, i) => {
            if (i === 0) {
              dragProps = getDragProps();
            }

            return false;
          }}
        </Level>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(edit[0].payload.to.index).toBe(2);
  });

  it('does not create MOVE events when moves will have no impact', () => {
    let dragProps;
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root type="@@ROOT" id="@@ROOT" onChange={e => (edit = e)}>
        <Level
          arr={[{ id: '1' }]}
          field="children"
          type="a"
          renderDrop={_dropProps => {
            dropProps = _dropProps;
          }}
        >
          {(child, getDragProps) => {
            dragProps = getDragProps();
          }}
        </Level>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(edit).toBe(undefined);
  });

  it('disallows adding more than maxChildren', () => {
    let dropProps;
    let error;

    TestRenderer.create(
      <Root
        type="@@ROOT"
        id="@@ROOT"
        onError={e => (error = e)}
        dropMappers={{
          text: str => JSON.parse(str)
        }}
      >
        <Level
          type="a"
          arr={[{ id: 1 }]}
          maxChildren={1}
          renderDrop={props => {
            // should be the 2nd drop after all reassignments
            dropProps = props;
          }}
        >
          {child => null}
        </Level>
      </Root>
    );

    runDrag('text', {
      type: 'a',
      id: 2
    })(dropProps);

    expect(error).toBeTruthy();
  });
});
