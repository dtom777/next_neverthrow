import { Prisma } from '@prisma/client';
import { Result, err, ok } from 'neverthrow';
import * as z from 'zod';
import { ZodSchema } from 'zod';

import { CreatingTask, EditingTask } from '@/features/tasks/types';

export function validate<T extends ZodSchema>(
  target: unknown,
  schema: T,
): Result<z.infer<T>, z.ZodError> {
  const result = schema.safeParse(target);
  if (result.success) {
    return ok(result.data);
  } else {
    return err(result.error);
  }
}

// TODO: type unValidateUser - password → type validateUser - hashedPassword
// FIXME
export function validateUser(
  user: Prisma.UserCreateInput,
): Result<Prisma.UserCreateInput, z.ZodError<any>> {
  return validate(
    user,
    z.object({
      email: z.string(),
      name: z.string(),
    }),
  );
}

export function validateCreatingTask(task: CreatingTask): Result<CreatingTask, z.ZodError<any>> {
  return validate(
    task,
    z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  );
}

export function validateEditingTask(task: EditingTask): Result<EditingTask, z.ZodError<any>> {
  return validate(
    task,
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string().optional(),
    }),
  );
}
