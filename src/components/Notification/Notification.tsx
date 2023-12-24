import { Notification as MantineNotification } from '@mantine/core';

import useStore from '@/stores/notifications';

export const Notification = () => {
  const { isVisible, isErr } = useStore();
  const onClose = useStore((state) => state.hideNotification);

  return isVisible ? (
    <>
      {isErr ? (
        <MantineNotification color='red' title='Bummer!' onClose={onClose}>
          Something went wrong
        </MantineNotification>
      ) : (
        <MantineNotification color='teal' title='All good!' mt='md' onClose={onClose}>
          Everything is fine
        </MantineNotification>
      )}
    </>
  ) : null;
};
