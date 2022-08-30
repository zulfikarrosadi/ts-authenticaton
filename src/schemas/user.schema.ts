import { object, string, TypeOf } from 'zod';

export const createUserInputSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' })
      .email('Your email format is invalid')
      .transform((val) => val.toLowerCase()),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'Password should have minimun 6 characters ',
    ),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((body) => body.password === body.passwordConfirmation, {
    path: ['body.password', 'body.passwordConfirmation'],
    message: 'Your password is not match',
  }),
});

export type TCreateUserInput = TypeOf<typeof createUserInputSchema>;
