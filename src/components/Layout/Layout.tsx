import Head from 'next/head';
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children, title = 'Sample App' }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Head>
        <title>{title}</title>
      </Head>
      <main className='flex w-screen flex-1 flex-col items-center justify-center'>{children}</main>
    </div>
  );
};
