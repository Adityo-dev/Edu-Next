'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: { value: string; label: string }[];
  error?: string;
  control: Control<T>;
  required?: boolean;
  placeholder?: string;
  maxHeight?: string;
  readOnly?: boolean;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  options,
  error,
  control,
  required,
  maxHeight,
  placeholder = 'Select an option',
  readOnly = false,
}: SelectFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <Select onValueChange={onChange} value={value || ''} disabled={readOnly}>
        <SelectTrigger
          className={cn(
            'text-primary w-full rounded-sm border p-3 py-6 text-sm shadow-none transition-all outline-none',
            'focus:border-primary focus:ring-emerald-100 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-emerald-100 focus-visible:ring-offset-0',
            {
              'cursor-default bg-[#F9FAFB] opacity-60': readOnly,
              'bg-[#F9FAFB] focus:bg-white': !readOnly,
              'border-danger/50 focus:border-danger focus-visible:border-danger focus-visible:ring-danger/10':
                error,
              'border-slate-200': !error,
            },
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="text-primary border border-slate-200 bg-white">
          <div style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="focus:text-primary cursor-pointer transition-colors focus:bg-emerald-50"
              >
                {opt.label}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && <p className="text-danger mt-1 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default SelectField;
