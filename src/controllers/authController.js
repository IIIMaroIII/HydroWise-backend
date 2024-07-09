import { COOKIE } from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { googleOauth } from '../utils/googleOauth.js';
import { ResponseMaker } from '../utils/responseMaker.js';

const authRegisterController = async (req, res, next) => {
  const user = await Services.auth.registerUser(req.body);
  if (!user) return next(HttpError(500, 'Internal Server Error'));
  res.json(ResponseMaker(201, 'Successfully registered a user!', user));
};

const authLoginController = async (req, res, next) => {
  const session = await Services.auth.loginUser(req.body);
  if (!session) return next(HttpError(500, 'Internal Server Error'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'You`ve been successfully logged in!', {
      accessToken: session.accessToken,
    }),
  );
};

const authRefreshController = async (req, res, next) => {
  console.log('req.cookies', req.cookies);
  const session = await Services.auth.refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  if (!session) return next(HttpError(500, 'Internal Server Error'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'The session has been successfully refreshed!', {
      accessToken: session.accessToken,
    }),
  );
};

const authLogoutController = async (req, res, next) => {
  if (!req.cookies.sessionId || !req.cookies.refreshToken)
    throw next(
      HttpError(
        401,
        'The session was not found, probably you`ve been logged out previously.',
      ),
    );
  await Services.auth.logoutUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  res.clearCookie(COOKIE.SESSION_ID);
  res.clearCookie(COOKIE.REFRESH_TOKEN);
  res.status(204).send();
};

const authRequestResetPasswordController = async (req, res) => {
  await Services.auth.requestResetPassword(req.body.email);
  res.json(
    ResponseMaker(
      200,
      'The reset password email has been successfully sent!',
      {},
    ),
  );
};

const authResetPwdController = async (req, res) => {
  await Services.auth.resetPwd(req.body);
  res.json(ResponseMaker(200, 'The password has been successfully reset!', {}));
};

const getGoogleAuthUrlController = async (req, res) => {
  const url = googleOauth.generateAuthUrl();

  if (!url)
    throw HttpError(500, 'Something went wrong in getGoogleAuthUrlController');

  res.json(ResponseMaker(200, 'Successfully got Google OAuth url!', url));
};

const loginWithGoogleController = async (req, res) => {
  const session = await Services.auth.loginOrSignupWithGoogle(req.body.code);

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'Successfully logged in via Google OAuth!', {
      accessToken: session.accessToken,
    }),
  );
};

export const auth = {
  authRegisterController,
  authLoginController,
  authRefreshController,
  authLogoutController,
  authRequestResetPasswordController,
  authResetPwdController,
  getGoogleAuthUrlController,
  loginWithGoogleController,
};
