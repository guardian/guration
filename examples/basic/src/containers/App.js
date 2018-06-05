import React from 'react';
import * as Guration from '../../../../src';
import DragZone from '../components/DragZone';
import Front from './Front';
import Collection from './Collection';
import Group from './Group';
import ArticleFragment from './ArticleFragment';
import Supporting from './Supporting';

const json = (fn = a => a) => str => fn(JSON.parse(str));

const App = ({ front }) => (
  <div>
    <DragZone type="json" json data={{ type: 'articleFragment', id: 1 }}>
      Article 1 (is a dupe)
    </DragZone>
    <DragZone type="json" json data={{ type: 'articleFragment', id: 9 }}>
      Article 9 (is not a dupe)
    </DragZone>
    <Guration.Root
      onChange={change => console.log(change)}
      dropMappers={{
        json: json()
      }}
    >
      <Front {...front}>
        {(collection, i) => (
          <Collection {...collection} index={i}>
            {(group, j) => (
              <Group {...group} index={j}>
                {(articleFragment, k) => (
                  <ArticleFragment {...articleFragment} index={k}>
                    {(supporting, l) => (
                      <Supporting {...supporting} index={l} />
                    )}
                  </ArticleFragment>
                )}
              </Group>
            )}
          </Collection>
        )}
      </Front>
    </Guration.Root>
  </div>
);

export default App;
