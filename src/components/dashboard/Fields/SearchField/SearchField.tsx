'use client';

import { Input } from '@/components/ui/input';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { Search } from 'lucide-react';

interface SearchFieldProps {
  placeholder?: string;
  queryKey?: string;
}

const SearchField = ({ placeholder = 'Search...', queryKey = 'search' }: SearchFieldProps) => {
  const { setQuery, searchParams, deleteQuery } = useSetSearchQueryInURL();

  // handle Search
  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      deleteQuery(queryKey);
    } else {
      setQuery(queryKey, value);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <Search className="text-muted absolute top-1/2 left-3 -translate-y-1/2" size={18} />
      <Input
        type="text"
        defaultValue={searchParams.get(queryKey) || ''}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="bg-muted/5 border-muted/10 focus:ring-primary w-full rounded-md border py-5 pr-4 pl-10 shadow-none transition-all focus:ring-1 focus:outline-none"
      />
    </div>
  );
};

export default SearchField;
