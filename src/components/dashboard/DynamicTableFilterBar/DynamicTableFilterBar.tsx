'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ITableFilter } from '@/types/table-filter.types';
import { CalendarIcon, Download, Search } from 'lucide-react'; // Added Download icon matching esv.png

interface DynamicTableFilterBarProps {
  fields: ITableFilter[];
  // Dynamic configurations for the Export button
  showExport?: boolean;
  exportText?: string;
  onExport?: () => void;
}

export default function DynamicTableFilterBar({
  fields,
  showExport = false,
  exportText = 'Export CSV',
  onExport,
}: DynamicTableFilterBarProps) {
  const searchField = fields.find((f) => f.type === 'search');
  const otherFields = fields.filter((f) => f.type !== 'search');

  return (
    <div className="flex flex-wrap items-center gap-3 overflow-hidden">
      {searchField && (
        <div className="group relative w-full sm:w-70">
          <Search className="group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder={searchField.placeholder}
            onChange={(e) => searchField.onChange(e.target.value)}
            value={searchField?.value || ''}
            className="focus:border-primary/50! h-11 w-full rounded-md border border-[#334155]! bg-[#0B1120] pr-4 pl-9 text-xs text-[#9CA3AF] transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      )}

      {otherFields.length > 0 && (
        <div className="flex items-center gap-2">
          {otherFields.map((field, index) => {
            if (field.type === 'select') {
              return (
                <div key={index} className="w-full min-w-40">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-11! w-full cursor-pointer border border-[#334155]! bg-[#0B1120] px-3 py-1 text-xs text-[#9CA3AF] focus:ring-0! focus:ring-offset-0!">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="border-[#334155]! bg-[#0B1222] text-[#9CA3AF]">
                      {field.options?.map((opt) => (
                        <SelectItem
                          key={opt?.value}
                          value={opt?.value}
                          className="cursor-pointer text-sm focus:bg-[#334155]! focus:text-white"
                        >
                          {opt?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            if (field.type === 'date') {
              return (
                <div key={index} className="relative w-full min-w-40">
                  <Input
                    type="text"
                    placeholder={field.placeholder || 'mm/dd/yyyy'}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="h-11 w-full rounded-md border border-[#334155]! bg-[#0B1222] pr-8 text-xs text-[#9CA3AF] focus:ring-0"
                  />
                  <CalendarIcon className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-[#9CA3AF]" />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* --- Dynamic Export Button  --- */}
      {showExport && (
        <button
          onClick={onExport}
          className="flex h-11 cursor-pointer items-center gap-2 rounded-sm border border-[#334155] bg-[#0B1120] px-4 text-xs font-medium text-[#9CA3AF] transition-all duration-300 hover:bg-[#0B1120]/10 hover:text-white active:scale-[0.98]"
        >
          <Download size={15} className="text-[#9CA3AF]" />
          <span>{exportText}</span>
        </button>
      )}
    </div>
  );
}
