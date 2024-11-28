//import nextJest from 'next/jest.js'
const nextJest = require('next/jest');
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */

 // Add any custom Jest configuration below
 const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust if your alias is different
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jest-environment-jsdom',
  };
  
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
//export default createJestConfig(config)
// Create the final Jest config by combining Next.js's config with your custom config
module.exports = createJestConfig(customJestConfig);
