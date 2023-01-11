module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  testMatch: ['**/test/**/*.spec.(ts|js)'],
  testEnvironment: 'node'
}
