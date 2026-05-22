'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      error,
      required = false,
      readOnly = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full space-y-2">
        <Label className="text-gray text-sm">
          {label} {required && <span className="text-error">*</span>}
        </Label>

        <div className="relative">
          <Input
            type={inputType}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={ref}
            {...props}
            className={cn(
              'h-auto w-full rounded-md p-3 transition-all duration-300',
              'placeholder:text-gray/70 focus-visible:border-primary! border border-[#334155]! focus-visible:ring-0 focus-visible:ring-offset-0',
              {
                'bg-secondary cursor-default opacity-60': readOnly,
                'bg-[#131D30]': !readOnly,
                'border-error focus-visible:border-error': error,
                'border-gray/10 focus-visible:border-primary': !error,
              },
              className,
            )}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray hover:text-gray/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          )}
        </div>

        {error && <p className="text-error text-xs font-medium">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
export default InputField;
