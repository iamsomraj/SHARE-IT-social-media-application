const ENVIRONMENT = Object.freeze({
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
});

const IS_PRODUCTION = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION;
const IS_TEST = process.env.NODE_ENV === ENVIRONMENT.TEST;
const IS_DEVELOPMENT = process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT;

module.exports = { IS_DEVELOPMENT, IS_PRODUCTION, IS_TEST };
