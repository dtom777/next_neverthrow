import { List, ThemeIcon, Loader } from '@mantine/core';
import { IconCircleDashed } from '@tabler/icons';

import { TaskItem } from './Item';
import { useTasks } from '../api/getTasks';

export const TaskList = () => {
  const { data: tasks, isLoading } = useTasks();
  if (isLoading) return <Loader my='lg' color='cyan' />;

  return (
    <List
      my='lg'
      spacing='sm'
      size='sm'
      icon={
        <ThemeIcon color='cyan' size={24} radius='xl'>
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {tasks?.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} />
      ))}
    </List>
  );
};
