export default {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/setup.jest.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use babel-jest to transform ES module syntax
  },
};
