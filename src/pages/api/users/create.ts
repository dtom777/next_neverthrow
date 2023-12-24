import { Prisma, User } from '@prisma/client';
import { ResultAsync, ok } from 'neverthrow';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { Err } from '@/lib/error';
import { handleApiRouteError } from '@/lib/next';
import { validateUser } from '@/lib/validation';

import { createUser } from '@/api/users';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Err>,
) {
  const result = createUserWorkFlow(req.body);

  return result.match(
    () => res.status(201).json({ message: 'Created' }),
    (e) => handleApiRouteError({ res, e }),
  );
}

// workflowはカリー化して、必要ないものだけだけそのまま
type WorkFlow = (user: Prisma.UserCreateInput) => ResultAsync<User, Err | ZodError>;
const createUserWorkFlow: WorkFlow = (user) =>
  ok(user).andThen(validateUser).asyncAndThen(createUser);
