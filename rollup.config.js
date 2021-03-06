import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import flowDefs from 'rollup-plugin-flow-defs';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      babel(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Fragment',
            'Children',
            'createElement',
            'createContext',
            'forwardRef'
          ]
        }
      }),
      flowDefs()
    ],
    external: ['react', 'lodash/fp/get', 'lodash/fp/set']
  }
];
