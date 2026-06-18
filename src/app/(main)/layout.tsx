import MainFooter from '@/components/main/MainFooter/MainFooter';
import MainNavigationBar from '@/components/main/MainNavigationBar/MainNavigationBar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <MainNavigationBar />
      {children}
      <MainFooter />
    </main>
  );
};

export default MainLayout;
