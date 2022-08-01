import ENVIRONMENT from '../../server/utils/constants/environments';

/* BASE URL FOR SERVER */
export const BASE_URL =
  process.env.NODE_ENV === ENVIRONMENT.PRODUCTION
    ? process.env.PROD_API
    : process.env.DEV_API;

export const LOGIN_URL = `${BASE_URL}/persons/auth`;
export const REGISTER_URL = `${BASE_URL}/persons/register`;
