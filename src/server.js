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
  app.use(
    cors({
      origin: `${DEPLOY_FRONTEND}`,
      credentials: true,
    }),
  );
  // app.use(
  //   cors({
  //     origin: (origin, callback) => {
  //       if (ALLOWED_ORIGINS.includes(origin) || !origin) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error('Not allowed by CORS'));
  //       }
  //     },
  //     credentials: true,
  //   }),
  // );
  app.use((req, res, next) => {
    resAccessOriginHeaders(res);
    next();
  });
  app.use(helmet()); // добавлено для безопасности

  // Настройка Content Security Policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://img.icons8.com', // добавьте другие источники, если необходимо
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        // добавьте другие директивы по необходимости
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
