import { TextInput, Button, Center } from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { FormEvent } from 'react';

import { useCreateTask } from '../api/createTask';
import { useUpdateTask } from '../api/updateTask';
import useStore from '../stores';

export const TaskForm = () => {
  const { editedTask } = useStore();
  const update = useStore((state) => state.updateEditedTask);

  const { trigger: createTask } = useCreateTask();
  const { trigger: updateTask } = useUpdateTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: validation
    if (editedTask.id === 0) {
      createTask({ title: editedTask.title, description: editedTask.description });
    } else {
      updateTask({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt='md'
          placeholder='title'
          value={editedTask.title || ''}
          onChange={(e) => update({ ...editedTask, title: e.target.value })}
        />
        <TextInput
          mt='md'
          placeholder='description'
          value={editedTask.description || ''}
          onChange={(e) => update({ ...editedTask, description: e.target.value })}
        />
        <Center mt='lg'>
          <Button
            disabled={editedTask.title === ''}
            leftIcon={<IconDatabase size={14} />}
            color='cyan'
            type='submit'
          >
            {editedTask.id === 0 ? 'Create' : 'Update'}
          </Button>
        </Center>
      </form>
    </>
  );
};
