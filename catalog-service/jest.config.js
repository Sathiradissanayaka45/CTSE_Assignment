module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.js",
      "!src/server.js",
      "!**/node_modules/**",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    testMatch: [
      "**/tests/**/*.js",
      "**/?(*.)+(spec|test).js"
    ],
    coverageReporters: ["lcov", "text", "clover"],
    verbose: true,
  };
  