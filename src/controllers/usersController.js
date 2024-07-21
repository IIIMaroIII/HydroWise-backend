import { CLOUDINARY, COOKIE, USER } from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { googleOauth } from '../utils/googleOauth.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

const RegisterController = async (req, res, next) => {
  const user = await Services.users.registerUser(req.body);
  if (!user) return next(HttpError(500, 'Internal Server Error'));

  res.json(ResponseMaker(201, 'Successfully registered a user!', user));
};

const LoginController = async (req, res, next) => {
  const session = await Services.users.loginUser(req.body);
  if (!session) return next(HttpError(500, 'Internal Server Error'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'You`ve been successfully logged in!', {
      email: req.body.email,
      accessToken: session.accessToken,
    }),
  );
};

const RefreshController = async (req, res, next) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    return res.status(401).json({ message: 'Missing session cookies' });
  }

  const session = await Services.users.refreshUsersSession({
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

const UpdateController = async (req, res, next) => {
  const { body } = req;
  const { userId } = req.params;
  const photoUrl = req.file;

  let avatar;

  if (photoUrl) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      avatar = await saveFileToCloudinary(photoUrl);
    } else {
      avatar = await saveFileToUploadDir(photoUrl);
    }
  }

  const result = await Services.users.updateUser(
    { userId },
    { ...body, photoUrl: avatar },
  );

  if (!result) {
    return next(HttpError(404, `The contact with ${userId} was not found!`));
  }

  res.json(
    ResponseMaker(
      200,
      `Successfully updated a contact by id ${userId}}!`,
      result,
    ),
  );
};

const LogoutController = async (req, res, next) => {
  if (!req.cookies.sessionId || !req.cookies.refreshToken)
    throw next(
      HttpError(
        401,
        'The session was not found, probably you`ve been logged out previously.',
      ),
    );
  await Services.users.logoutUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  res.clearCookie(COOKIE.SESSION_ID);
  res.clearCookie(COOKIE.REFRESH_TOKEN);
  res.status(204).send();
};

const RequestResetPasswordController = async (req, res) => {
  await Services.users.requestResetPassword(req.body.email);
  res.json(
    ResponseMaker(
      200,
      'The reset password email has been successfully sent!',
      {},
    ),
  );
};

const ResetPwdController = async (req, res) => {
  await Services.users.resetPwd(req.body);
  res.json(ResponseMaker(200, 'The password has been successfully reset!', {}));
};

const getGoogleAuthUrlController = async (req, res) => {
  const url = googleOauth.generateAuthUrl();

  if (!url)
    throw HttpError(500, 'Something went wrong in getGoogleAuthUrlController');

  res.json(ResponseMaker(200, 'Successfully got Google OAuth url!', url));
};

const loginWithGoogleController = async (req, res) => {
  const session = await Services.users.loginOrSignupWithGoogle(req.body.code);

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'Successfully logged in via Google OAuth!', {
      accessToken: session.accessToken,
    }),
  );
};

export const users = {
  RegisterController,
  LoginController,
  RefreshController,
  LogoutController,
  RequestResetPasswordController,
  ResetPwdController,
  getGoogleAuthUrlController,
  loginWithGoogleController,
  UpdateController,
};
