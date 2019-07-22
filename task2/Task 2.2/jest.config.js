module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/tests/**/*.test.ts"],
    moduleNameMapper: {
        "@libs/(.*)": "<rootDir>/src/libs/$1",
    },
    verbose: true,
};