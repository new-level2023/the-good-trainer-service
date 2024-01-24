import type { Config } from 'jest';
import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

const config: Config = {    
  verbose: true,
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
};

module.exports = config;