import ENVIRONMENT from "../../server/utils/constants/environments";

export const BASE_URL = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION ? process.env.PROD_API : process.env.DEV_API;