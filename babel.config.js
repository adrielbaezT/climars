module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          features: './src/features',
          components: './src/components',
          graphql: './src/graphql',
          screens: './src/screens',
          config: './src/config',
          navigations: './src/navigation',
          utils: './src/utils',
          actions: './src/state/actions',
          constants: './src/constants',
          assets: './src/assets/',
          hooks: './src/hooks',
          data: './src/data',
        },
      },
    ],
  ],
};
