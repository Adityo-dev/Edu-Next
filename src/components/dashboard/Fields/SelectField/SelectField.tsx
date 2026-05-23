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
  className?: string;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  options,
  error,
  control,
  required,
  placeholder = 'Select an option',
  className,
}: SelectFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className={cn('w-full space-y-2', className)}>
      <Label className="text-gray text-sm font-semibold">
        {label} {required && <span className="text-error">*</span>}
      </Label>

      <Select onValueChange={onChange} value={value || ''}>
        <SelectTrigger
          className={cn(
            'h-12! w-full cursor-pointer p-3 py-3.5 transition-all duration-300 focus:ring-0 focus:ring-offset-0',
            'border-[#334155]! bg-[#131D30]! text-white',
            {
              'border-error': error,
            },
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="border-[#334155]! bg-[#131D30]! text-white">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="cursor-pointer hover:bg-white/10! hover:text-white!"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-error mt-1 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default SelectField;
