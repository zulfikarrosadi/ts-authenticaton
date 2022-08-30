import { PrismaClient, Prisma } from '@prisma/client';
import { create } from 'domain';
import { TCreateUserInput } from '../schemas/user.schema';

const prisma = new PrismaClient();

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ email: string; id: number }> {
  const user = await prisma.user.create({
    data: { email, password },
    select: { email: true, id: true },
  });
  return user;
}
