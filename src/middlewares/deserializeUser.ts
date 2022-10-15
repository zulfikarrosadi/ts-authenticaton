import { NextFunction, Request, Response } from 'express';
import createSession from '../utils/sessionUtil';
import { verifyJwt } from '../utils/jwtUtil';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) return next();

  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) return next();

  const { decoded: accessTokenPayload } = verifyJwt(accessToken);
  if (accessTokenPayload) {
    res.locals.user = accessTokenPayload;
    return next();
  }

  const refreshToken = req.cookies['X-Refresh-Token'];
  if (!refreshToken) return next();

  const { decoded: refreshTokenPayload } = verifyJwt(refreshToken);
  if (!refreshTokenPayload) return next();

  createSession({
    email: refreshTokenPayload.email,
    userId: refreshTokenPayload.userId,
  });

  return next();
}
