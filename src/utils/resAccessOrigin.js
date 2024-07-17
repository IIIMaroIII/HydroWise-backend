import { DEPLOY_FRONTEND, LOCALHOST } from '../constants/constants.js';

export const resAccessOriginHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', `${LOCALHOST}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
