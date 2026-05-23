'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      label,
      name,
      placeholder,
      error,
      required = false,
      readOnly = false,
      rows = 4,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-2">
        <Label className="text-mute text-sm">
          {label} {required && <span className="text-error">*</span>}
        </Label>

        <Textarea
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          ref={ref}
          {...props}
          className={cn(
            'min-h-24 w-full resize-none rounded-lg p-3 transition-all duration-300',
            'placeholder:text-secondary border focus-visible:ring-0 focus-visible:ring-offset-0',
            {
              'bg-secondary cursor-default opacity-60': readOnly,
              'bg-[#F3F3F5]': !readOnly,
              'border-red-500 focus-visible:border-red-500': error,
              'border-mute/10 focus-visible:border-primary-100': !error,
            },
            className,
          )}
        />

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);

TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;
