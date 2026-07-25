import MainFooter from '@/components/main/MainFooter/MainFooter';
import MainNavigationBar from '@/components/main/MainNavigationBar/MainNavigationBar';
import { baseApi } from '@/services/root/baseApi';
import React from 'react';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  let config = null;
  try {
    const res = await baseApi('/platform-config', {
      revalidate: 3600,
      tags: ['platform-config'],
    });
    if (res?.success) config = res.data;
  } catch (error) {
    console.error('Failed to fetch platform config in MainLayout:', error);
  }

  return (
    <main>
      <MainNavigationBar initialConfig={config} />
      {children}
      <MainFooter />
    </main>
  );
};

export default MainLayout;
