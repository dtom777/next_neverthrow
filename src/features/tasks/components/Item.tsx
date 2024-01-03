import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { List } from '@mantine/core';
import { Task } from '@prisma/client';
import { FC } from 'react';

import { useDeleteTask } from '../api/deleteTask';
import useStore from '../stores';

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask);

  const { trigger: deleteTask } = useDeleteTask();

  return (
    <List.Item className='h-10 w-10'>
      <p>{title}</p>
      <div className='flex mr-10'>
        <PencilAltIcon
          className='mx-1 cursor-pointer text-blue-500'
          onClick={() => {
            update({
              id,
              title,
              description,
            });
          }}
        />
        <TrashIcon
          className='cursor-pointer text-blue-500'
          onClick={() => {
            deleteTask(id);
          }}
        />
      </div>
    </List.Item>
  );
};
