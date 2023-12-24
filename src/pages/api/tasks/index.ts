import { Task } from '@prisma/client';
import { ok, ResultAsync } from 'neverthrow';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { CreatingTask } from '@/features/tasks/types';

import { Err } from '@/lib/error';
import { handleApiRouteError, handleNotAllowed } from '@/lib/next';
import { validateCreatingTask } from '@/lib/validation';

import { createTask, getTasks } from '@/api/tasks';
import { userId } from '@/config';

function handleGET(req: NextApiRequest, res: NextApiResponse<Task[] | Err>) {
  const result = getTasks(userId);

  return result.match(
    (tasks) => res.status(200).json(tasks),
    (e) => res.status(e.status).json({ status: e.status, message: e.message }),
  );
}

type WorkFlow = (task: CreatingTask) => (userId: number) => ResultAsync<Task, Err | ZodError>;
const createTaskWorkFlow: WorkFlow = (task) => (userId) =>
  ok(task)
    .andThen(validateCreatingTask)
    .asyncAndThen((validatedTask) => createTask(userId, validatedTask));

function handlePost(req: NextApiRequest, res: NextApiResponse<{ message: string } | Err>) {
  const createTaskDto = req.body;
  const workflow = createTaskWorkFlow(createTaskDto);
  const result = workflow(userId);

  return result.match(
    () => res.status(201).json({ message: 'Created' }),
    (e) => handleApiRouteError({ res, e }),
  );
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
}
