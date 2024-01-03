import axios from 'axios';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

import useNotificationStore from '@/stores/notifications';

import { KEYS, swrConfig } from '@/lib/swr/index';

import useStore from '../stores';
import { EditingTask } from '../types';

// NOTE: dataを返さないと、cache keyの破棄がうまくいかない
const updateTask = (url: string, { arg }: { arg: EditingTask }) =>
  axios.patch(`${url}/${arg.id}`, arg);

export const useUpdateTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const showNotification = useNotificationStore((state) => state.showNotification);

  return useSWRMutation(KEYS.TASK, updateTask, {
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
