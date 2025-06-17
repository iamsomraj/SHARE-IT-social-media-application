export const ENVIRONMENT = Object.freeze({
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const);

export const IS_PRODUCTION = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION;
export const IS_TEST = process.env.NODE_ENV === ENVIRONMENT.TEST;
export const IS_DEVELOPMENT = process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT;
