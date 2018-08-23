import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

const front = {
  id: '1',
  title: 'Front',
  collections: [
    {
      id: '1',
      title: 'Coll 1',
      groups: [
        {
          id: 'big',
          articleFragments: [
            {
              id: '1',
              title: 'Af 1',
              meta: { supporting: [{ id: '2', title: 'Af 2' }] }
            },
            {
              id: '5',
              title: 'Af 5',
              meta: { supporting: [{ id: '6', title: 'Af 6' }] }
            }
          ]
        },{
          id: 'medium',
          articleFragments: [
            {
              id: '3',
              title: 'Af 3',
              meta: { supporting: [{ id: '4', title: 'Af 4' }] }
            }
          ]
        }
      ]
    }
  ]
};

const root = document.getElementById('root');

if (root) {  
  ReactDOM.render(<App front={front} />, root);
}
