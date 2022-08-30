import express from 'express';
import logger from './utils/logger';
import routes from './routes';
import c from 'config';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = c.get<number>('port');

app.listen(port, () => {
  routes(app);
  logger.info(`Server running at ${c.get<string>('endpoint')}`);
});
