import { Request, Response } from 'express';
import { TCreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import createSession from '../utils/sessionUtil';
import hashPassword from '../utils/hashPassword';

export async function createUserHandler(
  req: Request<{}, {}, Required<TCreateUserInput['body']>>,
  res: Response<
    Omit<
      Required<TCreateUserInput['body']>,
      'password' | 'passwordConfirmation'
    >
  >,
) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, password: hashedPassword });
    createSession(user.email, user.id, res);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  return res.status(200).json({ user: res.locals.user });
}
