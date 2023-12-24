import { Prisma, User } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { NotFoundError, Err } from '@/lib/error';

import { handlePrismaError, prisma } from '@/api';

export function getUsers(): ResultAsync<User[], Err> {
  return ResultAsync.fromPromise(prisma.user.findMany(), (e) => handlePrismaError(e)).andThen(
    (users) => (users.length ? okAsync(users) : errAsync(new NotFoundError())),
  );
}

export function getUserById(id: User['id']): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    }),
    (e) => handlePrismaError(e),
  );
}

export function createUser(user: Prisma.UserCreateInput): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.create({
      data: {
        ...user,
      },
    }),
    (e) => handlePrismaError(e),
  );
}
export function updateUser(
  id: User['id'],
  dto: Pick<User, 'nickName'>,
): ResultAsync<Omit<User, 'hashedPassword'>, Err> {
  return ResultAsync.fromPromise(
    prisma.user
      .update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      })
      .then((updatedUser) => {
        const { hashedPassword, ...rest } = updatedUser;

        return rest;
      }),
    (e) => handlePrismaError(e),
  );
}

export function deleteUser(id: User['id']): ResultAsync<User, Err> {
  return ResultAsync.fromPromise(
    prisma.user.delete({
      where: {
        id,
      },
    }),
    (e) => handlePrismaError(e),
  );
}
