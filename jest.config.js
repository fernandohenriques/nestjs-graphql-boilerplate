module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  rootDir: "src",
  testRegex: ".spec.ts$",
  coverageDirectory: "../coverage",
  testEnvironment: "node"
};
