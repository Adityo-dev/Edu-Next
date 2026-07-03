'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface KeywordInputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
}

const KeywordInputField = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder = 'Enter your keyword and press enter...',
  required = false,
}: KeywordInputFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [input, setInput] = useState('');
  const keywordsArray: string[] = Array.isArray(value) ? value : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmedValue = input.trim().replace(/,$/, '');
      if (trimmedValue && !keywordsArray.includes(trimmedValue)) {
        onChange([...keywordsArray, trimmedValue]);
        setInput('');
      }
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    onChange(keywordsArray.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <div
        className={cn(
          'flex min-h-11.5 flex-wrap gap-2 rounded-sm p-3 shadow-none transition-all',
          'placeholder:text-text-placeholder border',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-emerald-100',
          'text-primary',
          {
            'bg-[#F9FAFB]': true,
            'border-danger/50 focus-within:border-danger focus-within:ring-danger/10': error,
            'border-primary/10': !error,
          },
        )}
      >
        {keywordsArray.map((tag, index) => (
          <div
            key={tag}
            className="border-primary/40 text-primary flex items-center gap-1 rounded border bg-emerald-50 px-2.5 py-1 text-xs font-medium"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="text-danger hover:text-danger/80 cursor-pointer focus:outline-none"
            >
              <X size={13} />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={keywordsArray.length === 0 ? placeholder : 'Add more...'}
          className="text-primary placeholder:text-text-placeholder flex-1 border-none bg-transparent p-0.5 text-sm outline-none"
        />
      </div>

      {error && <p className="text-danger mt-1 text-xs font-medium">{error.message}</p>}
    </div>
  );
};

export default KeywordInputField;
