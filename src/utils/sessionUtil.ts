import c from 'config';
import { Response } from 'express';
import { createJwt } from './jwtUtil';

export default function createSession(
  email: string,
  userId: number,
  res: Response,
  newRefreshToken: boolean = true,
) {
  const accessToken = createJwt(
    { email, userId },
    { expiresIn: c.get<string>('accessTokenTtl') },
  );

  res.locals.user = { email, userId };
  res.setHeader('Authorization', `Bearer ${accessToken}`);

  if (newRefreshToken) {
    const refreshToken = createJwt(
      { email, userId },
      { expiresIn: c.get('refreshTokenTtl') },
    );
    res.cookie('X-Refresh-Token', refreshToken, { sameSite: 'lax' });
  }

  return true;
}

export function deleteSession(res: Response) {
  return true;
}
