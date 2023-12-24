import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import useStore from '../stores';
import { CreatingTask } from '../types';

export const useCreateTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const { mutate } = useSWRConfig();

  const createTask = (task: CreatingTask): ResultAsync<void, Error> => {
    return ResultAsync.fromPromise(
      axios.post('/api/tasks', task).then(() => {
        mutate('/api/tasks');
        reset();
      }),
      (err: any) => {
        reset();
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          router.push('/');
        }

        return new Error('Failed to create task');
      },
    );
  };

  return { createTask };
};
