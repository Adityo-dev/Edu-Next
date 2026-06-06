/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextAreaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  error?: any;
  control: Control<T>;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
}

const TextAreaField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  control,
  required = false,
  readOnly = false,
  rows,
}: TextAreaFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder={placeholder}
            readOnly={readOnly}
            rows={rows}
            className={cn(
              'text-primary custom-scrollbar max-h-75 min-h-30 w-full resize-none overflow-y-auto rounded-sm p-3 text-sm leading-relaxed shadow-none transition-all outline-none',
              'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-emerald-100 focus-visible:ring-offset-0 focus-visible:focus:bg-white',
              {
                'cursor-default bg-[#F9FAFB] opacity-60': readOnly,
                'bg-[#F9FAFB] focus:bg-white': !readOnly,
                'border-danger/50 focus-visible:border-danger focus-visible:ring-danger/10': error,
                'border-slate-200': !error,
              },
            )}
          />
        )}
      />

      {error && <p className="text-danger text-xs font-medium">{error}</p>}
    </div>
  );
};

export default TextAreaField;
