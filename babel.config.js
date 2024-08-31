const babelModules = {
  esm: false,
  cjs: 'commonjs',
}[process.env.BABEL_FORMAT];

if (babelModules === undefined) {
  throw new Error('no babel format');
}

module.exports = {
  presets: [
    // env
    ['@babel/preset-env', { modules: babelModules }],
    '@babel/preset-typescript',
  ],
  ignore: ['**/__tests__', '**/*.test.ts', '**/*.test.tsx'],
};
