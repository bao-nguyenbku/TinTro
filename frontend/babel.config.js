module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src'
        }
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens'
          },
        },
      ],
    ],
  };
};
