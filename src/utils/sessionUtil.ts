import c from 'config';
import { Request } from 'express';
import { createJwt, verifyJwt } from './jwtUtil';

export default function createSession({
  email,
  userId,
  newRefreshToken = true,
}: {
  email: string;
  userId: number;
  newRefreshToken?: boolean;
}): Map<'accessToken' | 'refreshToken', string> {
  const token = new Map<'accessToken' | 'refreshToken', string>();
  token.set(
    'accessToken',
    createJwt(
      { email, userId, isValid: true },
      { expiresIn: c.get<string>('accessTokenTtl') },
    ),
  );

  if (newRefreshToken) {
    token.set(
      'refreshToken',
      createJwt(
        { email, userId, isValid: true },
        { expiresIn: c.get('refreshTokenTtl') },
      ),
    );
  }

  return token;
}

export function deleteSession(req: Request) {
  const token = req.headers.authorization.split(' ')[1];
  const { decoded: accessTokenPayload } = verifyJwt(token);

  accessTokenPayload.isValid = false;
  accessTokenPayload.email = null;
  accessTokenPayload.userId = null;

  const newToken = createJwt({ ...accessTokenPayload }, { expiresIn: 0 });
  return newToken;
}
