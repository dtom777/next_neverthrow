import { Task, User } from '@prisma/client';
import { ResultAsync, errAsync, okAsync } from 'neverthrow';

import { CreatingTask, EditingTask } from '@/features/tasks/types';

import { NotFoundError, Err, BadRequestError } from '@/lib/error';

import { handlePrismaError, prisma } from '@/api';

export function getTasks(userId: User['id']): ResultAsync<Task[], Err> {
  return ResultAsync.fromPromise(
    prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((tasks) => (tasks.length ? okAsync(tasks) : errAsync(new NotFoundError())));
}

export function getTaskById(userId: User['id'], taskId: Task['id']): ResultAsync<Task, Err> {
  return ResultAsync.fromPromise(
    prisma.task.findUniqueOrThrow({
      where: {
        userId,
        id: taskId,
      },
    }),
    (e) => handlePrismaError(e),
  );
}

export function createTask(userId: User['id'], dto: CreatingTask): ResultAsync<Task, Err> {
  return ResultAsync.fromPromise(
    prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    }),
    (e) => handlePrismaError(e),
  );
}

export function updateTask(
  userId: User['id'],
  taskId: Task['id'],
  dto: Omit<EditingTask, 'id'>,
): ResultAsync<Task, Err> {
  return ResultAsync.fromPromise(
    prisma.task.findUnique({
      where: {
        id: taskId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((task) =>
    !task || task.userId !== userId
      ? errAsync(new BadRequestError())
      : ResultAsync.fromPromise(
          prisma.task.update({
            where: {
              id: taskId,
            },
            data: {
              ...dto,
            },
          }),
          (e) => handlePrismaError(e),
        ),
  );
}

export function deleteTask(userId: User['id'], taskId: Task['id']): ResultAsync<Task, Err> {
  return ResultAsync.fromPromise(
    prisma.task.findUnique({
      where: {
        id: taskId,
      },
    }),
    (e) => handlePrismaError(e),
  ).andThen((task) =>
    !task || task.userId !== userId
      ? errAsync(new BadRequestError())
      : ResultAsync.fromPromise(
          prisma.task.delete({
            where: {
              id: taskId,
            },
          }),
          (e) => handlePrismaError(e),
        ),
  );
}
