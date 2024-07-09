import { COOKIE, TIME_DURATION } from '../constants/constants.js';

export const GenerateCookie = (session, res) => {
  res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  });

  res.cookie(COOKIE.SESSION_ID, session.id, {
    httpOnly: true,
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  });
};
