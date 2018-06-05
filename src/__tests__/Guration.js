import React from 'react';
import TestRenderer from 'react-test-renderer';
import Root from '../Root';
import Node from '../Node';
import Dedupe from '../Dedupe';
import Field from '../Field';
import Children from '../Children';

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

describe('Children', () => {
  it('creates MOVE events from dragged nodes', () => {
    let dragProps;
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root onChange={e => (edit = e)}>
        <Node type="a" id="1" index={0}>
          {getDragProps => {
            dragProps = getDragProps();
          }}
        </Node>
        <Node type="a" id="2" index={1}>
          <Children childrenKey="children" type="a">
            {getDropProps => {
              dropProps = getDropProps(1);
            }}
          </Children>
        </Node>
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
        onChange={e => (edit = e)}
        dropMappers={{
          text: str => JSON.parse(str)
        }}
      >
        <Node type="a" id={2} index={0}>
          <Children childrenKey="children" type="a">
            {getDropProps => {
              dropProps = getDropProps(1);
            }}
          </Children>
        </Node>
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
            childrenKey: 'children'
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
        onChange={e => (edit = e)}
        dropMappers={{
          text: str => JSON.parse(str)
        }}
      >
        <Dedupe type="a">
          <Children childrenKey="children1" type="a">
            <Node type="a" id={3} index={0}>
              <Children childrenKey="children2" type="a">
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
            childrenKey: 'children1',
            id: '@@ROOT',
            index: 0,
            type: '@@ROOT'
          }
        },
        id: 2,
        to: {
          parent: { id: 3, index: 0, type: 'a', childrenKey: 'children2' },
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
      <Root onError={e => (error = e)}>
        <Children childrenKey="children" type="a">
          <Node type="a" id={2} index={0}>
            {getDragProps => {
              dragProps = getDragProps();
              return (
                <Children childrenKey="children" type="a">
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
      <Root onError={e => (error = e)}>
        <Children childrenKey="children" type="a">
          <Node type="a" id={2} index={0}>
            {getDragProps => {
              dragProps = getDragProps();
            }}
          </Node>
        </Children>
        <Children childrenKey="other" type="b">
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
      <Root onChange={e => (edit = e)}>
        <Node type="b" id={1} index={0}>
          <Children childrenKey="children" type="a">
            {getDropProps => {
              dropProps = getDropProps(1);
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

    expect(edit[0].payload.to.index).toBe(0);
  });

  it('creates UPDATE events for changed fields', () => {
    let dragProps;
    let dropProps;
    let edit;

    TestRenderer.create(
      <Root onChange={e => (edit = e)}>
        <Field type="b" value={1}>
          <Children childrenKey="children1" type="a">
            <Node type="a" id={2} index={0}>
              {getDragProps => {
                dragProps = getDragProps();
              }}
            </Node>
          </Children>
        </Field>
        <Field type="b" value={2}>
          <Children childrenKey="children2" type="a">
            {getDropProps => {
              dropProps = getDropProps(0);
            }}
          </Children>
        </Field>
      </Root>
    );

    runDrag(dragProps)(dropProps);

    expect(edit[1]).toEqual({
      type: 'UPDATE',
      payload: {
        id: 2,
        type: 'a',
        fields: {
          b: 2
        }
      }
    });
  });
});
