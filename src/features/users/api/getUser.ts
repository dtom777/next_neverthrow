import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { swrConfig } from '@/lib/swr/';

import { userId } from '@/config';

const fetcher = (url: string) =>
  axios.get<Omit<User, 'hashedPassword'>>(url).then((res) => res.data);

export const useUser = () => {
  const router = useRouter();

  return useSWR<Omit<User, 'hashedPassword'>>(`/api/users/${userId}`, fetcher, {
    ...swrConfig,
    onError: (err: any) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/');
      }
    },
  });
};
