import { Loader } from '@mantine/core';

import { useUser } from '../api/getUser';

export const UserInfo = () => {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <Loader />;

  return <p>{user?.email}</p>;
};
