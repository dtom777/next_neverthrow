import { Task } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { KEYS, swrConfig } from '@/lib/swr';

const getTasks = (url: string) => axios.get<Task[]>(url).then((res) => res.data);

export const useTasks = () => {
  const router = useRouter();

  return useSWR<Task[], Error>(KEYS.TASK, getTasks, {
    ...swrConfig,
    onError: (err: any) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/');
      }
    },
  });
};
