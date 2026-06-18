/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
// import { setAuth } from '../features/auth/authSlice';
import { useAppStore } from '../hooks';

interface ReduxInitializerProps {
  token?: string | null;
  user: any | null;
}


export default function ReduxInitializer({ user }: ReduxInitializerProps) {
  const store = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // store.dispatch(setAuth({ user }));
      initialized.current = true;
    }
  }, [user, store]);

  return null;
}
