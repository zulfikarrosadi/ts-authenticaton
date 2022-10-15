import c from 'config';
import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

type TJwtPayload = Pick<JwtPayload, 'email' | 'userId' | 'isValid'>;

export function createJwt(
  payload: { email: string; userId: number; isValid: boolean },
  options?: Omit<SignOptions, 'algorithm'>,
) {
  const token = sign({ ...payload }, c.get('privateKay'), {
    ...(options && options),
    algorithm: 'RS256',
  });
  return token;
}

export function verifyJwt(token: string): {
  decoded: TJwtPayload | null;
} {
  try {
    const decoded = verify(token, c.get('publicKey')) as TJwtPayload;
    return { decoded };
  } catch (error) {
    return { decoded: null };
  }
}
