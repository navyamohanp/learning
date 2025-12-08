const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    assetExts: [...assetExts, 'riv'],
    sourceExts: sourceExts.filter(ext => ext !== 'riv'),
  },
};

module.exports = mergeConfig(defaultConfig, config);
