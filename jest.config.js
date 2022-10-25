module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "client/src/**/*.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    "global": {
      "lines": 90,
      "statements": 90
    }
  },
  coverageDirectory: '<rootDir>/test/reports',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ["node_modules/(?!axios)"]
};
