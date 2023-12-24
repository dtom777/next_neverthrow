import { NextApiRequest, NextApiResponse } from 'next';

import { Err } from '@/lib/error';

import { deleteUser } from '@/api/users';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Err>,
) {
  const id = Number(req.query.id as string);
  const result = deleteUser(id);

  return result.match(
    (user) => res.status(204).json({ message: 'No Content' }),
    (e) => res.status(e.status).json({ status: e.status, message: e.message }),
  );
}
