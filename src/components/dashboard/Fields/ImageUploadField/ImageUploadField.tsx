/* eslint-disable no-unused-vars */
'use client';
import { Label } from '@/components/ui/label';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface ImageUploadFieldProps {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  isUploading?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  subLabel = 'PNG, JPG up to 10MB',
  icon,
  value,
  onChange,
  error,
  required = false,
  isUploading = false,
}) => {
  const previewUrl = useMemo(() => {
    if (!value) return null;

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    return value;
  }, [value]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value instanceof File && previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <div className="relative">
        {!previewUrl ? (
          <div
            className={`flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed p-10 transition-all duration-300 outline-none focus-within:ring-2 focus-within:ring-emerald-100 ${
              error
                ? 'border-danger/50 hover:border-danger bg-red-50/10'
                : 'hover:border-primary/60 border-slate-200 bg-[#F9FAFB] hover:bg-white'
            } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
            onClick={() => {
              if (!isUploading) document.getElementById('fileInput')?.click();
            }}
          >
            {isUploading ? (
              <>
                <div className="rounded-full bg-emerald-50 p-3 shadow-none">
                  <div className="border-t-primary h-6 w-6 animate-spin rounded-full border-2 border-emerald-200"></div>
                </div>
                <p className="text-primary mt-4 text-sm font-medium">Uploading image...</p>
                <p className="mt-1 text-xs text-slate-400">Please wait a moment</p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-emerald-50 p-3 shadow-none">
                  {icon || <ImageIcon className="text-primary h-5 w-5" />}
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-slate-400">{subLabel}</p>
              </>
            )}

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                onChange(file);
                e.target.value = '';
              }}
              accept="image/*"
            />
          </div>
        ) : (
          <div
            className={`group relative h-52 w-full overflow-hidden rounded-sm border bg-[#F9FAFB] ${
              error ? 'border-danger/50' : 'border-slate-200'
            }`}
          >
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className={`object-contain p-2 transition-transform duration-500 group-hover:scale-105 ${
                isUploading ? 'blur-sm grayscale' : ''
              }`}
            />

            {isUploading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
                <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-emerald-200"></div>
                <span className="text-primary mt-2 text-sm font-semibold">Uploading...</span>
              </div>
            )}

            {!isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="bg-danger absolute top-3 right-3 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all hover:bg-red-600 active:scale-90"
                title="Remove image"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}

            <div className="bg-primary/80 absolute right-0 bottom-0 left-0 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {value instanceof File ? value.name : 'Current Image'}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-danger text-xs font-medium">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
