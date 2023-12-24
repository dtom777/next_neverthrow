import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { Err } from '@/lib/error';

import { getUserById } from '@/api/users';

export default function handler(req: NextApiRequest, res: NextApiResponse<User | Err>) {
  const id = Number(req.query.id as string);
  const result = getUserById(id);

  return result.match(
    (user) => res.status(200).json(user),
    (e) => res.status(e.status).json({ status: e.status, message: e.message }),
  );
}
