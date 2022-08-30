import { object, string, TypeOf } from 'zod';

export const loginInputSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' })
      .email('Your email format is invalid')
      .transform((val) => val.toLowerCase()),
    password: string({ required_error: 'Password is required' }),
  }),
});

export type TLoginInput = TypeOf<typeof loginInputSchema>;
