import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  getUserHandler,
} from './controllers/user.controller';
import {
  logOutUserHandler,
  loginUserHandler,
} from './controllers/auth.controller';
import deserializeUser from './middlewares/deserializeUser';
import requireUser from './middlewares/requireUser';
import { createUserInputSchema } from './schemas/user.schema';
import { loginInputSchema } from './schemas/auth.schema';
import validateInput from './utils/validateInput';

export default function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    '/api/register',
    validateInput(createUserInputSchema),
    createUserHandler,
  );
  app.post('/api/login', validateInput(loginInputSchema), loginUserHandler);

  app.use(deserializeUser);
  app.use(requireUser);

  app.delete('/api/logout', logOutUserHandler);
  app.get('/api/user', getUserHandler);
}
