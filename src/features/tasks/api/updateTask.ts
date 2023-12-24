import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import useStore from '../stores';
import { EditingTask } from '../types';

export const useUpdateTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const { mutate } = useSWRConfig();

  const updateTask = (task: EditingTask): ResultAsync<void, Error> => {
    return ResultAsync.fromPromise(
      axios.patch(`/api/tasks/${task.id}`, task).then(() => {
        mutate('/api/tasks');
        reset();
      }),
      (err: any) => {
        reset();
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          router.push('/');
        }

        return new Error('Failed to update task');
      },
    );
  };

  return { updateTask };
};
