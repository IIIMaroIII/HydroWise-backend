import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger } from './utils/pino.js';
import { env } from './utils/env.js';
import {
  ALLOWED_ORIGINS,
  DEPLOY_FRONTEND,
  DIR,
  ENV_VARS,
  LOCALHOST,
} from './constants/constants.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { router } from './routes/api/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { resAccessOriginHeaders } from './utils/resAccessOrigin.js';
import helmet from 'helmet';

export const setupServer = () => {
  const app = express();

  app.use(logger());
  // const allowedOrigins = [
  //   'https://water-wise-frontend.vercel.app',
  //   'http://localhost:5173',
  // ];

  app.use(logger());
  // app.use(
  //   cors({
  //     origin: '*',
  //     credentials: true,
  //   }),
  // );
  // app.use(
  //   cors({
  //     origin: function (origin, callback) {
  //       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error('Not allowed by CORS'));
  //       }
  //     },
  //     credentials: true,
  //   }),
  // );

  app.use(
    cors({
      origin: `${LOCALHOST}`,
      credentials: true,
    }),
  );
  app.use((req, res, next) => {
    resAccessOriginHeaders(res);
    next();
  });
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://img.icons8.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: [
          "'self'",
          'https://img.icons8.com',
          'https://water-wise-frontend.vercel.app',
        ],
        objectSrc: ["'self'"],
      },
    }),
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use('/v1/users/uploads', express.static(DIR.UPLOAD));
  app.use('/v1/api-docs', swaggerDocs());
  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(
    env(ENV_VARS.PORT, 3000),
    console.log(`Server is running on ${env(ENV_VARS.PORT)}`),
  );
};
