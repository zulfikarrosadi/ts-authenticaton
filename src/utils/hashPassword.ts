import { genSalt, hash } from 'bcrypt';
import c from 'config';

export default async function hashPassword(password: string) {
  const salt = await genSalt(c.get<number>('salt'));
  return await hash(password, salt);
}
