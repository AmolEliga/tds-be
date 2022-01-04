/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/test/**',
    '!**/static/**',
    '!**/dist/**',
    '!*.js'
  ],
  clearMocks: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 15000,
  reporters: ['default', 'jest-sonar']
};
