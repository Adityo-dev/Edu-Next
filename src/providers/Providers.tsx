import ReduxInitializer from '@/redux/apiClient/ReduxInitializer';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import StoreProvider from './StoreProvider';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }
  return (
    <StoreProvider>
      <ReduxInitializer user={user} />
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} richColors />
    </StoreProvider>
  );
};

export default Providers;
