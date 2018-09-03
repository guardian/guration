// @flow

import React from 'react';
import { Root, Level } from '../../../../src';
import DragZone from '../components/DragZone';
import DropZone from '../components/DropZone';
import Indent from '../components/Indent';

const json = (fn = a => a) => str => fn(JSON.parse(str));

const renderDrop = (getDropProps, { isTarget, canDrop }) => (
  <DropZone {...getDropProps()} isOver={isTarget} canDrop={canDrop} />
);

type Supporting = {
  id: string,
  title: string
};

type ArticleFragment = {
  id: string,
  title: string,
  meta: {
    supporting: Supporting[]
  }
};

type Group = {
  id: string,
  articleFragments: ArticleFragment[]
};

type Collection = {
  id: string,
  title: string,
  groups: Group[]
};

type Front = {
  id: string,
  title: string,
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
      onChange={console.log}
      onError={console.log}
      mapIn={{
        json: json()
      }}
    >
      <Level
        arr={front.collections}
        type="collection"
        renderDrop={renderDrop}
        dedupeType="articleFragment"
      >
        {({ title, groups }, getNodeProps) => (
          <div {...getNodeProps()}>
            <h1>{title}</h1>
            <Indent>
              <Level arr={groups} type="group" renderDrop={renderDrop}>
                {({ id, articleFragments }) => (
                  <div>
                    <h1>{id}</h1>
                    <Indent>
                      <Level
                        arr={articleFragments}
                        type="articleFragment"
                        renderDrop={renderDrop}
                      >
                        {(
                          { title, meta: { supporting } },
                          afNodeProps
                        ) => (
                          <div {...afNodeProps()} style={{ padding: 10 }}>
                            <h1>{title}</h1>
                            <Indent>
                              <Level
                                arr={supporting}
                                type="articleFragment"
                                renderDrop={renderDrop}
                              >
                                {({ title }, sNodeProps, sDropProps) => (
                                  <div {...sNodeProps()} style={{ padding: 10 }}>
                                    <h1>{title}</h1>
                                  </div>
                                )}
                              </Level>
                            </Indent>
                          </div>
                        )}
                      </Level>
                    </Indent>
                  </div>
                )}
              </Level>
            </Indent>
          </div>
        )}
      </Level>
    </Root>
  </div>
);

export default App;
