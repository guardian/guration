import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

const front = {
  collections: [
    {
      id: 1,
      title: 'Coll 1',
      groups: [
        {
          id: 'big',
          articleFragments: [
            {
              id: 1,
              title: 'Af 1',
              meta: { supporting: [{ id: 2, title: 'Af 2' }] }
            }
          ]
        }
      ]
    }
  ]
};

ReactDOM.render(<App front={front} />, document.getElementById('root'));
