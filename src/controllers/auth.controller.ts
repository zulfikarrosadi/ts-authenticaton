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
    const token = createSession({
      email: user.email,
      userId: user.id,
    });

    res.cookie('refreshToken', token.get('refreshToken'), {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.status(200).json({
      email: user.email,
      userId: user.id,
      accessToken: token.get('accessToken'),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function logOutUserHandler(req: Request, res: Response) {
  try {
    const invalidToken = deleteSession(req);

    return res
      .status(200)
      .cookie('refreshToken', '', {
        maxAge: 0,
        sameSite: 'lax',
        httpOnly: true,
      })
      .json({ email: null, userId: null, accessToken: invalidToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'logout failed' });
  }
}
