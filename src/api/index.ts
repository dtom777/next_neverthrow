import { PrismaClient, Prisma } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { BadRequestError, InternalServerError, NotFoundError, Err } from '@/lib/error';

export const prisma = new PrismaClient();
if (process.env.NODE_ENV === 'development') {
  (global as any).prisma = prisma;
}

export function handlePrismaError(err: unknown): Err {
  if (err instanceof Prisma.NotFoundError) {
    return new NotFoundError();
  }
  if (err instanceof PrismaClientValidationError) {
    return new BadRequestError();
  }
  if (err instanceof PrismaClientKnownRequestError) {
    return new BadRequestError();
  }
  if (err instanceof PrismaClientUnknownRequestError) {
    return new BadRequestError();
  }
  if (err instanceof PrismaClientInitializationError) {
    return new InternalServerError();
  }

  return err as any;
}
