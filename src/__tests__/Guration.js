import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Root, Node, Children, Level, Dedupe } from '../index';

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
        <Children type="a">
          <Node type="a" id="1" index={0}>
            {getDragProps => {
              dragProps = getDragProps();
            }}
          </Node>
          <Node type="a" id="2" index={1}>
            <Children field="children" type="a">
              {getDropProps => {
                dropProps = getDropProps(1);
              }}
            </Children>
          </Node>
        </Children>
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
        <Children type="a">
          <Node type="a" id={2} index={0}>
            <Children field="children" type="a">
              {getDropProps => {
                dropProps = getDropProps(1);
              }}
            </Children>
          </Node>
        </Children>
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
        <Dedupe type="a">
          <Children field="children1" type="a">
            <Node type="a" id={3} index={0}>
              <Children field="children2" type="a">
                {getDropProps => {
                  dropProps = getDropProps(0);
                }}
              </Children>
            </Node>
            <Node type="a" id={2} index={1} />
          </Children>
        </Dedupe>
      </Root>
    );

    runDrag('text', {
      type: 'a',
      id: 2
    })(dropProps);

    expect(edit[0]).toEqual({
      payload: {
        from: {
          parent: {
            childrenField: 'children1',
            id: '@@ROOT',
            index: 0,
            type: '@@ROOT'
          }
        },
        id: 2,
        to: {
          parent: { id: 3, index: 0, type: 'a', childrenField: 'children2' },
          index: 0
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
        <Children field="children" type="a">
          <Node type="a" id={2} index={0}>
            {getDragProps => {
              dragProps = getDragProps();
              return (
                <Children field="children" type="a">
                  {getDropProps => {
                    dropProps = getDropProps(1);
                  }}
                </Children>
              );
            }}
          </Node>
        </Children>
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
        <Children field="children" type="a">
          <Node type="a" id={2} index={0}>
            {getDragProps => {
              dragProps = getDragProps();
            }}
          </Node>
        </Children>
        <Children field="other" type="b">
          {getDropProps => {
            dropProps = getDropProps(1);
          }}
        </Children>
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
        <Node type="b" id={1} index={0}>
          <Children field="children" type="a">
            {getDropProps => {
              dropProps = getDropProps(3);
              return (
                <Node type="a" id={2} index={0}>
                  {getDragProps => {
                    dragProps = getDragProps();
                  }}
                </Node>
              );
            }}
          </Children>
        </Node>
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
        <Children field="children" type="a">
          {getDropProps => {
            dropProps = getDropProps(1);

            return (
              <Node type="a" id="1" index={0}>
                {getDragProps => {
                  dragProps = getDragProps();
                }}
              </Node>
            );
          }}
        </Children>
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
