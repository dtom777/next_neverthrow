import { NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { Err, errors, HttpError } from '@/lib/error';

export function handleApiRouteError({ res, e }: { res: NextApiResponse<Err>; e: unknown }) {
  if (e instanceof ZodError) {
    const status = 400;
    const { message } = errors[status];

    res.status(status).json({ status, message });

    return;
  }
  if (e instanceof HttpError) {
    const { status, message } = e.serialize();

    res.status(status).json({ status, message });

    return;
  }
  const status = 500;
  const { message } = errors[status];

  res.status(status).json({ status, message });

  return;
}

export function handleNotAllowed(res: NextApiResponse<Err>) {
  const status = 405;
  const { message } = errors[status];

  res.status(status).json({ status, message });

  return;
}
