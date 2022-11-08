import { NextFunction, Request, Response } from 'express';
import createSession from '../utils/sessionUtil';
import { verifyJwt } from '../utils/jwtUtil';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.cookies.accessToken) return next();

  const { accessToken } = req.cookies;
  if (!accessToken) return next();

  const { decoded: accessTokenPayload } = verifyJwt(accessToken);
  if (accessTokenPayload) {
    res.locals.user = accessTokenPayload;
    return next();
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return next();

  const { decoded: refreshTokenPayload } = verifyJwt(refreshToken);
  if (!refreshTokenPayload) return next();

  createSession({
    email: refreshTokenPayload.email,
    userId: refreshTokenPayload.userId,
  });

  return next();
}
