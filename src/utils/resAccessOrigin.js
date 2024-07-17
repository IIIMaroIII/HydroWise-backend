import { DEPLOY_FRONTEND } from '../constants/constants.js';

export const resAccessOriginHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', `${DEPLOY_FRONTEND}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
