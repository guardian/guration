import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import fs from 'fs';
import path from 'path';

const dirs = p =>
  fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

const examples = dirs(__dirname);

export default examples.map(example => ({
  input: `examples/${example}/src/index.js`,
  output: {
    file: `examples/${example}/index.js`,
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    babel({
      babelrc: false,
      presets: ['@babel/react'],
      plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true
    }),
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
    })
  ]
}));
