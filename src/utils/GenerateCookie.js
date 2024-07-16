import {
  CLIENT_DOMAIN,
  COOKIE,
  TIME_DURATION,
} from '../constants/constants.js';

// export const GenerateCookie = (session, res) => {
//   res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
//   });

//   res.cookie(COOKIE.SESSION_ID, session.id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
//   });
// };
export const GenerateCookie = (session, res) => {
  res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
    httpOnly: true,
    secure: true, // Если вы тестируете на локальном хосте, установите false
    sameSite: 'Lax',
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  });

  res.cookie(COOKIE.SESSION_ID, session.id, {
    httpOnly: true,
    secure: true, // Если вы тестируете на локальном хосте, установите false
    sameSite: 'Lax',
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  });

  res.header('Access-Control-Allow-Origin', `${CLIENT_DOMAIN}`);
  res.header('Access-Control-Allow-Credentials', 'true');
};
