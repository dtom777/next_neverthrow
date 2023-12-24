import { PlusCircleIcon } from '@heroicons/react/solid';

import { TaskForm } from '@/features/tasks/components/Form';
import { TaskList } from '@/features/tasks/components/List';
import { UserInfo } from '@/features/users';

import { Layout } from '@/components/Layout';

import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <>
      <Layout title='Task Board'>
        <div className='flex'>
          <PlusCircleIcon className='mb-6 h-6 w-6 text-blue-500' />
          <p>Create task</p>
        </div>
        <UserInfo />
        <TaskForm />
        <TaskList />
      </Layout>
    </>
  );
};

export default Dashboard;
