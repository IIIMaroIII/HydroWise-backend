import express from 'express';
import { JoiSchemas } from '../../validation/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { Controllers } from '../../controllers/index.js';

export const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(JoiSchemas.auth.registerUserSchema),
  ctrlWrapper(Controllers.auth.authRegisterController),
);

authRouter.post(
  '/login',
  validateBody(JoiSchemas.auth.loginUserSchema),
  ctrlWrapper(Controllers.auth.authLoginController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(Controllers.auth.authRefreshController),
);

authRouter.post('/logout', ctrlWrapper(Controllers.auth.authLogoutController));

authRouter.post(
  '/request-reset-password',
  validateBody(JoiSchemas.auth.requestResetPasswordSchema),
  ctrlWrapper(Controllers.auth.authRequestResetPasswordController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(JoiSchemas.auth.resetPwdSchema),
  ctrlWrapper(Controllers.auth.authResetPwdController),
);

authRouter.get(
  '/get-oauth-url',
  ctrlWrapper(Controllers.auth.getGoogleAuthUrlController),
);

authRouter.post(
  '/confirm-oauth',
  validateBody(JoiSchemas.auth.loginWithGoogleAuthSchema),
  ctrlWrapper(Controllers.auth.loginWithGoogleController),
);
