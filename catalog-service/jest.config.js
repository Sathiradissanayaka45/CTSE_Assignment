module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    
    // Indicates whether the coverage information should be collected
    collectCoverage: true,
    
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    
    // Indicates which files should be tested for coverage
    collectCoverageFrom: [
      "src/**/*.js",
      "!src/server.js",
      "!**/node_modules/**",
    ],
    
    // The test environment that will be used for testing
    testEnvironment: "node",
    
    // The glob patterns Jest uses to detect test files
    testMatch: [
      "**/tests/**/*.js",
      "**/?(*.)+(spec|test).js"
    ],
    
    // Coverage reporters to use
    coverageReporters: ["lcov", "text", "clover"],
    
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  };
  