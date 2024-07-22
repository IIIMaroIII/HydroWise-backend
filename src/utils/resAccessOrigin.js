import {
  ALLOWED_ORIGINS,
  DEPLOY_FRONTEND,
  LOCALHOST,
} from '../constants/constants.js';

export const resAccessOriginHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', `${DEPLOY_FRONTEND}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
// export const resAccessOriginHeaders = (req, res) => {
//   const allowedOrigins = [
//     'https://water-wise-frontend.vercel.app',
//     'http://localhost:5173',
//   ];

//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   res.header('Access-Control-Allow-Credentials', 'true');
// };
