const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...require('node-libs-react-native'),
  buffer: require.resolve('buffer'),
};

module.exports = config;
