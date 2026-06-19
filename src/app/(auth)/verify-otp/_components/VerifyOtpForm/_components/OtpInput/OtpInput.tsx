/* eslint-disable no-unused-vars */
'use client';

import { cn } from '@/lib/utils';
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef, useState } from 'react';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OtpInput = ({ length = 6, onComplete, disabled, error }: OtpInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;

    const newValues = [...values];
    newValues[index] = val[val.length - 1];
    setValues(newValues);

    if (index < length - 1) {
      focusInput(index + 1);
    }

    const otp = newValues.join('');
    if (otp.length === length) {
      onComplete(otp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];

      if (newValues[index]) {
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = '';
        setValues(newValues);
        focusInput(index - 1);
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/[^0-9]/g, '')
      .slice(0, length);

    if (!pasted) return;

    const newValues = Array(length).fill('');
    pasted.split('').forEach((digit, i) => {
      newValues[i] = digit;
    });
    setValues(newValues);

    const nextEmptyIndex = newValues.findIndex((v) => !v);
    focusInput(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex);

    if (pasted.length === length) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {values.map((val, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            'text-text-primary h-12 w-10 rounded-md border text-center text-lg font-black transition-all outline-none disabled:opacity-50 sm:h-14 sm:w-12 sm:text-xl',
            'focus:border-primary focus:bg-white focus:ring-2 focus:ring-emerald-100',
            {
              'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-100': error,
              'border-primary ring-primary/20 bg-white ring-1': !error && val,
              'border-slate-200 bg-[#F9FAFB]': !error && !val,
            },
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
