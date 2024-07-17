import { CLIENT_DOMAIN } from '../constants/constants.js';

export const resAccessOriginHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', `${CLIENT_DOMAIN}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
