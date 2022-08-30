import { PrismaClient } from '@prisma/client';
import { TLoginInput } from '../schemas/auth.schema';

const prisma = new PrismaClient();

export async function findUserByEmail({ email }: TLoginInput['body']) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  return user;
}
