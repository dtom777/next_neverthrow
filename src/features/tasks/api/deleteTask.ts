import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import useStore from '../stores';

export const useDeleteTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const { mutate } = useSWRConfig();

  const deleteTask = (id: number): ResultAsync<void, Error> => {
    return ResultAsync.fromPromise(
      axios.delete(`/api/tasks/${id}`).then(() => {
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

  return { deleteTask };
};
