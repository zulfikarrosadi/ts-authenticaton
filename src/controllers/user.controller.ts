import { Request, Response } from 'express';
import { TCreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import createSession from '../utils/sessionUtil';
import hashPassword from '../utils/hashPassword';

export async function createUserHandler(
  req: Request<{}, {}, Required<TCreateUserInput['body']>> & {
    user?: { email: string };
  },
  res: Response<
    Omit<
      Required<TCreateUserInput['body']>,
      'password' | 'passwordConfirmation'
    > & { accessToken: string; userId: number }
  >,
) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, password: hashedPassword });
    const token = createSession({ email: user.email, userId: user.id });

    res.cookie('refreshToken', token.get('refreshToken'), {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.status(201).json({
      email: user.email,
      userId: user.id,
      accessToken: token.get('accessToken'),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    return res.status(200).json({ user: res.locals.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error when getting the user' });
  }
}
