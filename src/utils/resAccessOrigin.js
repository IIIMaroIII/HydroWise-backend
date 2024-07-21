import {
  ALLOWED_ORIGINS,
  DEPLOY_FRONTEND,
  LOCALHOST,
} from '../constants/constants.js';

// export const resAccessOriginHeaders = (res) => {
//   res.header('Access-Control-Allow-Origin', `${DEPLOY_FRONTEND}`);
//   res.header('Access-Control-Allow-Credentials', 'true');
// };
export const resAccessOriginHeaders = (res, origin) => {
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', ''); // Deny access
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
};
