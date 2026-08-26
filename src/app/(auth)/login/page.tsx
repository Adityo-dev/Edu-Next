import { Suspense } from 'react';
import LoginForm from './_components/LoginForm/LoginForm';
import LoginLeftPanel from './_components/LoginLeftPanel/LoginLeftPanel';

const LoginPage = () => {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}
    >
      <div className="flex min-h-screen overflow-x-hidden bg-white">
        <LoginLeftPanel />
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
