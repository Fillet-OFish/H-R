module.exports = {
  collectCoverage: true,
<<<<<<< HEAD
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
=======
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
>>>>>>> 4fb6e64fc4184e9bfd0639f5500ae4b29969d180
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ["node_modules/(?!axios)"]
};
