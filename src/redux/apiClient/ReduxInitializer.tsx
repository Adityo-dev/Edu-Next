'use client';

import { TLoginUser } from '@/types/userRole.types';
import { useEffect, useRef } from 'react';
import { setAuth } from '../features/auth/authSlice';
import { useAppDispatch, useAppStore } from '../hooks';

interface ReduxInitializerProps {
  user: TLoginUser | null;
}

export default function ReduxInitializer({ user }: ReduxInitializerProps) {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(setAuth({ user }));
      initialized.current = true;
    }
  }, [user, store, dispatch]);

  return null;
}
