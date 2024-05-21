const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If needed, extend the config to support aliases
config.resolver = {
  sourceExts: ["ts", "tsx", "js", "jsx", "json"],
  extraNodeModules: {
    "@": __dirname + "/src",
  },
};

module.exports = config;
