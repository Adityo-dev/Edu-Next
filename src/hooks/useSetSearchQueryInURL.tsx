'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useSetSearchQueryInURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setMultipleQueries = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '' || value === 'all') {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      const queryString = params.toString();
      const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

      // router.push এর বদলে replace ব্যবহার করলে পেজ লোড স্মুথ হয়
      router.replace(updatedPath, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const setQuery = useCallback(
    (key: string, value: string | number) => {
      setMultipleQueries({ [key]: value });
    },
    [setMultipleQueries],
  );

  const deleteQuery = useCallback(
    (key: string) => {
      setMultipleQueries({ [key]: null });
    },
    [setMultipleQueries],
  );

  const getQueryObject = () => {
    return Object.fromEntries(searchParams.entries());
  };

  return {
    setQuery,
    setMultipleQueries,
    deleteQuery,
    getQueryObject,
    searchParams,
  };
};

export default useSetSearchQueryInURL;
