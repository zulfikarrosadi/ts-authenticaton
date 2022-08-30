import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { TLoginInput } from '../schemas/auth.schema';
import { findUserByEmail } from '../services/auth.service';
import createSession, { deleteSession } from '../utils/sessionUtil';

export async function loginUserHandler(
  req: Request<{}, {}, TLoginInput['body']>,
  res: Response,
) {
  const { email, password } = req.body;
  try {
    email.toLowerCase();
    const user = await findUserByEmail({ email });
    const isPasswordVerified = await compare(password, user.password);

    if (!isPasswordVerified) throw Error('Email or Password is wrong');
    createSession(user.email, user.id, res);

    return res.status(200).json({ email: user.email, userId: user.id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function logOutUserHandler(req: Request, res: Response) {
  try {
    return res.writeHead(204, 'logout success');
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'logout failed' });
  }
}