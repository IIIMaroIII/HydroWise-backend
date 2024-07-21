import {
  ALLOWED_ORIGINS,
  DEPLOY_FRONTEND,
  LOCALHOST,
} from '../constants/constants.js';

export const resAccessOriginHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', `${LOCALHOST}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
// export const resAccessOriginHeaders = (res, origin) => {
//   const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;

//   if (
//     ALLOWED_ORIGINS.some((allowedOrigin) => normalizedOrigin === allowedOrigin)
//   ) {
//     res.header('Access-Control-Allow-Origin', origin);
//   } else {
//     res.header('Access-Control-Allow-Origin', ''); // Deny access
//   }

//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   );
//   res.header('Access-Control-Allow-Credentials', 'true');
// };
