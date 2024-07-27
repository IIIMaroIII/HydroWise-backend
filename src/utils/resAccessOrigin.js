import {
  ALLOWED_ORIGINS,
  DEPLOY_FRONTEND,
  LOCALHOST,
} from '../constants/constants.js';
import { HttpError } from './HttpError.js';

// export const resAccessOriginHeaders = (res) => {
//   res.header('Access-Control-Allow-Origin', `${DEPLOY_FRONTEND}`);
//   res.header('Access-Control-Allow-Credentials', 'true');
// };
export const resAccessOriginHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    return HttpError(500, 'CORS error');
  }
};
