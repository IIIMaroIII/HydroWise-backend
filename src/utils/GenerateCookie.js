import {
  ALLOWED_ORIGINS,
  COOKIE,
  DEPLOY_FRONTEND,
  LOCALHOST,
  TIME_DURATION,
} from '../constants/constants.js';

export const GenerateCookie = (req, session, res) => {
  // res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
  //   httpOnly: true,
  //   sameSite: 'None',
  //   expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  //   secure: true,
  // });

  // res.cookie(COOKIE.SESSION_ID, session.id, {
  //   httpOnly: true,
  //   sameSite: 'None',
  //   expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
  //   secure: true,
  // });

  // Determine the domain for cookies based on the origin
  const origin = req.headers.origin;

  // Set cookies for specific domains
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
      secure: true,
      domain: origin.includes(`${LOCALHOST}}`)
        ? `${LOCALHOST}`
        : `"${DEPLOY_FRONTEND}`,
    });

    res.cookie(COOKIE.SESSION_ID, session.id, {
      httpOnly: true,
      sameSite: 'None',
      expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
      secure: true,
      domain: origin.includes(`${LOCALHOST}`)
        ? `${LOCALHOST}`
        : `${DEPLOY_FRONTEND}`,
    });
  }
};
