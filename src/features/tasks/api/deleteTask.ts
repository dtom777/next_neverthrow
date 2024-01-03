import axios from 'axios';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

import useNotificationStore from '@/stores/notifications';

import { KEYS, swrConfig } from '@/lib/swr/index';

import useStore from '../stores';

// NOTE: dataを返さないと、cache keyの破棄がうまくいかない
const deleteTask = (url: string, { arg }: { arg: number }) => axios.delete(`${url}/${arg}`);

export const useDeleteTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const showNotification = useNotificationStore((state) => state.showNotification);

  return useSWRMutation(KEYS.TASK, deleteTask, {
    ...swrConfig,
    onSuccess: () => {
      reset();
      showNotification({ isErr: false });
    },
    onError: (err: any) => {
      reset();
      showNotification({ isErr: true });
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        router.push('/');
      }
    },
  });
};
