import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default [
  {
    input: 'src/app.js',
    output: {
      file: 'rollup/app.js',
      format: 'es'
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  }
]
