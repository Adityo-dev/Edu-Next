'use client';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadFieldProps {
  label?: string;
  value?: File | string | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
}

const ImageUploadField = ({ label, value, onChange, error, required }: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : value instanceof File ? URL.createObjectURL(value) : null,
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div className="w-full">
      {label && (
        <label className="text-gray text-sm font-medium">
          {label} {required && <span className="text-error"> *</span>}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`relative mt-2 h-52 w-full cursor-pointer overflow-hidden rounded-md border-2 border-dashed transition-all duration-300 ${error ? 'border-error bg-error/5' : 'hover:border-primary border-white/10 bg-[#131D30]'}`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <Image src={preview} alt="Cover" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <div className="flex flex-col items-center gap-2 rounded-md bg-black/60 px-4 py-2 text-white backdrop-blur-md">
                <UploadCloud size={20} />
                <span className="text-xs font-semibold">Replace Cover</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray flex h-full flex-col items-center justify-center space-y-2">
            <UploadCloud size={32} />
            <p className="text-sm">Click or drag to upload cover</p>
          </div>
        )}
      </div>
      {error && <p className="text-error text-xs font-medium">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
