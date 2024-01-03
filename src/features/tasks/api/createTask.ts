import axios from 'axios';
import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';

import useNotificationStore from '@/stores/notifications';

import { KEYS, swrConfig } from '@/lib/swr/index';

import useStore from '../stores';
import { CreatingTask } from '../types';

// NOTE: dataを返さないと、cache keyの破棄がうまくいかない
const createTask = (url: string, { arg }: { arg: CreatingTask }) => axios.post(url, arg);

export const useCreateTask = () => {
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);
  const showNotification = useNotificationStore((state) => state.showNotification);

  return useSWRMutation(KEYS.TASK, createTask, {
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
