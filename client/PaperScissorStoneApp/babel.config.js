module.exports = function(api) {
  api.cache(true);
  // api.cache(false);
  return {
    presets: [
      // 'babel-preset-expo',
      "module:metro-react-native-babel-preset",
      // 'module:react-native-dotenv'
    ],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};
