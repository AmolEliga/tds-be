/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */
import cors from 'cors';
import winston, { format } from 'winston';
import morgan from 'morgan';
import path from 'path';
import swaggerRoute from './api/swagger-ui';
import trasportDocumentRoute from './api/routes/index.route';
import healthCheckRoute from './api/routes/health.route';

const app = express();
const allowedCorsOrigin = process.env.ALLOWED_CORS_ORIGINS || '*';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'Transport Document Service' },
  transports: [new winston.transports.Console()]
});

//  Load .env file only when running the app in local development environment:
if (process.env.NODE_ENV === 'local') {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
  });
}

// Skip /health and / as ELB Healthcheck and Kubernetes livelinessProbe call those all the time
app.use(
  morgan('combined', {
    skip: (req) => req.url === '/health' || req.url === '/'
  })
);

app.use((req, res, next) => {
  logger.debug('Received a request with body: ', req.body);
  next();
});

app.use(cors({ origin: allowedCorsOrigin }));

app.use('/health', healthCheckRoute);

var apiRouter = express();

//user APIs
apiRouter.use("/user", require('./user/user.route'));


export { app, logger };
