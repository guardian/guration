// @flow

import React from 'react';
import { Root, Level, Field } from '../../../../src';
import DragZone from '../components/DragZone';
import DropZone from '../components/DropZone';
import Indent from '../components/Indent';

const json = (fn = a => a) => str => fn(JSON.parse(str));

const renderDrop = props => <DropZone {...props} />;

type Base = {
  id: string,
  title: string
};

type Supporting = Base;

type ArticleFragment = Base & {
  meta: {
    supporting: Supporting[]
  }
};

type Group = {
  id: string,
  articleFragments: ArticleFragment[]
};

type Collection = Base & {
  groups: Group[]
};

type Front = Base & {
  collections: Collection[]
};

type AppProps = {
  front: Front
};

const App = ({ front }: AppProps) => (
  <div>
    <DragZone type="json" json data={{ type: 'articleFragment', id: 1 }}>
      Article 1 (is a dupe)
    </DragZone>
    <DragZone type="json" json data={{ type: 'articleFragment', id: 9 }}>
      Article 9 (is not a dupe)
    </DragZone>
    <Root
      id={front.id}
      type="front"
      onChange={change => console.log(change)}
      onError={error => console.log(error)}
      dropMappers={{
        json: json()
      }}
    >
      <Level
        arr={front.collections}
        type="collection"
        renderDrop={renderDrop}
        dedupeType="articleFragment"
      >
        {({ id, groups }) => (
          <div>
            <h1>{id}</h1>
            <Indent>
              {groups.map(({ id, articleFragments }) => (
                <Field type="group" value={id}>
                  <div>
                    <h1>{id}</h1>
                    <Indent>
                      <Level
                        arr={articleFragments}
                        type="articleFragment"
                        renderDrop={renderDrop}
                        maxChildren={2}
                      >
                        {({ id, meta: { supporting } }, afDragProps) => (
                          <div>
                            <h1 {...afDragProps()}>{id}</h1>
                            <Indent>
                              <Level
                                arr={supporting}
                                type="articleFragment"
                                renderDrop={renderDrop}
                              >
                                {({ id }, sDragProps) => (
                                  <div>
                                    <h1 {...sDragProps()}>{id}</h1>
                                  </div>
                                )}
                              </Level>
                            </Indent>
                          </div>
                        )}
                      </Level>
                    </Indent>
                  </div>
                </Field>
              ))}
            </Indent>
          </div>
        )}
      </Level>
    </Root>
  </div>
);

export default App;
