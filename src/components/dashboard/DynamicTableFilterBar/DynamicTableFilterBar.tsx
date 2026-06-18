/* eslint-disable no-unused-vars */
'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ITableFilter } from '@/types/table-filter.types';
import { Download, Search, X } from 'lucide-react';

interface DynamicTableFilterBarProps {
  fields: ITableFilter[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
  showExport?: boolean;
  exportText?: string;
  onExport?: () => void;
}

const DynamicTableFilterBar = ({
  fields,
  filter,
  setFilter,
  search,
  setSearch,
  showExport = false,
  exportText = 'Export CSV',
  onExport,
}: DynamicTableFilterBarProps) => {
  const selectField = fields.find((f) => f.type === 'select');
  const searchField = fields.find((f) => f.type === 'search');

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* [LEFT SIDE]  */}
      <div className="flex justify-start">
        {selectField?.options && (
          <Tabs
            value={filter || 'all'}
            onValueChange={(val) => {
              setFilter(val);
              if (selectField.onChange) selectField.onChange(val);
            }}
            className="w-auto"
          >
            <TabsList className="h-10! rounded-sm border border-slate-200 bg-white p-0 shadow-xs">
              {selectField.options.map((option) => (
                <TabsTrigger
                  key={option.value}
                  value={option.value}
                  className="data-[state=active]:bg-primary cursor-pointer rounded-xs px-4 py-2 text-sm font-semibold text-slate-500 capitalize transition-all hover:bg-slate-50 data-[state=active]:text-white"
                >
                  {option.value === 'all' ? 'all' : option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* [RIGHT SIDE]  */}
      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        {/* [SEARCH INPUT] */}
        {searchField && (
          <div className="relative">
            <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (searchField.onChange) searchField.onChange(e.target.value);
              }}
              placeholder={searchField.placeholder || 'Search...'}
              className="focus:border-primary w-64 rounded-sm border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  if (searchField.onChange) searchField.onChange('');
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* [EXPORT BUTTON] */}
        {showExport && (
          <button
            onClick={onExport}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            <Download size={15} className="text-slate-400" />
            <span>{exportText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicTableFilterBar;
