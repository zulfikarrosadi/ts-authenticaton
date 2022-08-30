import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export default function validateInput(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({ body: req.body });
      return next();
    } catch (error) {
      return res.status(400).send(error.errors);
    }
  };
}
