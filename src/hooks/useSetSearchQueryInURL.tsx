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

      const currentQueryString = searchParams.toString();
      const newQueryString = params.toString();

      if (currentQueryString === newQueryString) {
        return;
      }

      const updatedPath = newQueryString ? `${pathname}?${newQueryString}` : pathname;

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

  const getQueryObject = (): Record<string, string> => {
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
