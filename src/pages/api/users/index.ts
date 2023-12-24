import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { Err } from '@/lib/error';

import { getUsers } from '@/api/users';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | Err>,
) {
  const result = getUsers();

  return result.match(
    (users) => res.status(200).json(users),
    (e) => res.status(e.status).json({ status: e.status, message: e.message }),
  );
}
