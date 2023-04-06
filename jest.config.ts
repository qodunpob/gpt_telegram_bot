/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "mts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.mjs$": "$1",
  },
  preset: "ts-jest/presets/default-esm",
  resolver: "<rootDir>/mjs-resolver.ts",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).mts"],
  transform: {
    "^.+\\.mts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
