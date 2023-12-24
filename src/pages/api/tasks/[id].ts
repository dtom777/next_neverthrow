import { Task } from '@prisma/client';
import { ResultAsync, ok } from 'neverthrow';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { EditingTask } from '@/features/tasks/types';

import { Err } from '@/lib/error';
import { handleApiRouteError, handleNotAllowed } from '@/lib/next';
import { validateEditingTask } from '@/lib/validation';

import { deleteTask, updateTask } from '@/api/tasks';
import { userId } from '@/config';

type WorkFlow = (task: EditingTask) => (userId: number) => ResultAsync<Task, Err | ZodError>;
const updateTaskWorkFlow: WorkFlow = (task) => (userId) =>
  ok(task)
    .andThen(validateEditingTask)
    .asyncAndThen((validatedTask) => {
      const { id: taskId, ...dto } = validatedTask;

      return updateTask(userId, taskId, dto);
    });

function handlePatch(req: NextApiRequest, res: NextApiResponse<{ message: string } | Err>) {
  const updateTaskDto = req.body;
  const workflow = updateTaskWorkFlow(updateTaskDto);
  const result = workflow(userId);

  return result.match(
    () => res.status(200).json({ message: 'OK' }),
    (e) => handleApiRouteError({ res, e }),
  );
}

function handleDelete(req: NextApiRequest, res: NextApiResponse<{ message: string } | Err>) {
  const taskId = Number(req.query.id as string);
  const result = deleteTask(userId, taskId);

  return result.match(
    () => res.status(204).json({ message: 'No Content' }),
    (e) => res.status(e.status).json({ status: e.status, message: e.message }),
  );
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return handleNotAllowed(res);
  }
}
