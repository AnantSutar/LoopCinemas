module.exports = {
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
    "^axios$": require.resolve("axios"),
  },
  testEnvironment: "jsdom",
};
