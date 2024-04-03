// const { getDefaultConfig } = require("@expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push("cjs");

// module.exports = defaultConfig;
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts = [
  ...defaultConfig.resolver.assetExts,
  'riv',
  'obj',
  'mtl',
  'mp3',
  'JPG',
  'vrx',
  'png',
  'hdr',
  'gltf',
  'glb',
  'bin',
  'arobject',
  'gif',
];

module.exports = defaultConfig;