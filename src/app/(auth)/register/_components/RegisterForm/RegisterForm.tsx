/* eslint-disable no-unused-vars */
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, GraduationCap, Lock, Mail, Phone, User, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CollapsibleField from '../CollapsibleField/CollapsibleField';
import { expertiseOptions, RegisterFormValues, registerSchema } from '../registerSchema';

interface RegisterFormProps {
  onSubmitForm: (data: RegisterFormValues) => Promise<void>;
  onRoleChange: (_role: 'student' | 'instructor') => void;
  isLoading: boolean;
  apiError: string | null;
}

const RegisterForm = ({ onSubmitForm, onRoleChange, isLoading, apiError }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      role: 'student',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirm: '',
      agree: false as true,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const role = watch('role');

  const handleRoleSelect = (selectedRole: 'student' | 'instructor') => {
    setValue('role', selectedRole);
    onRoleChange(selectedRole);
  };

  const expertiseError = (errors as Record<string, { message?: string }>).expertise;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Role Toggle */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleRoleSelect('student')}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2.5 rounded-sm border-2 py-4 text-sm font-bold transition-all duration-300 ${
            role === 'student'
              ? 'border-primary text-primary bg-emerald-50'
              : 'border-slate-200 text-slate-400 hover:border-slate-300'
          }`}
        >
          <GraduationCap size={18} />I am a Student
        </button>
        <button
          type="button"
          onClick={() => handleRoleSelect('instructor')}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2.5 rounded-sm border-2 py-4 text-sm font-bold transition-all duration-300 ${
            role === 'instructor'
              ? 'border-secondary text-secondary bg-orange-50'
              : 'border-slate-200 text-slate-400 hover:border-slate-300'
          }`}
        >
          <Video size={18} />I am an Instructor
        </button>
      </div>

      {/* Global Error */}
      {apiError && (
        <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
          ⚠️ {apiError}
        </div>
      )}

      {/* First Name + Last Name — পাশাপাশি */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            First Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              disabled={isLoading}
              {...register('firstName')}
              placeholder="First name"
              className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
                errors.firstName ? 'border-red-300' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Last Name <span className="text-slate-300">(optional)</span>
          </label>
          <div className="relative">
            <User size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              disabled={isLoading}
              {...register('lastName')}
              placeholder="Last name"
              className="focus:border-primary w-full rounded-sm border border-slate-200 bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
          Email
        </label>
        <div className="relative">
          <Mail size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            disabled={isLoading}
            {...register('email')}
            placeholder="Enter your email"
            className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
              errors.email ? 'border-red-300' : 'border-slate-200'
            }`}
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        <p className="mt-1 text-xs text-slate-400">
          ⓘ A verification email will be sent after registration to confirm this address.
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
          Phone
        </label>
        <div className="relative">
          <Phone size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            disabled={isLoading}
            {...register('phone')}
            placeholder="017XXXXXXXX"
            className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-4 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
              errors.phone ? 'border-red-300' : 'border-slate-200'
            }`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Instructor Expertise — shadcn Select, smooth show/hide */}
      <CollapsibleField show={role === 'instructor'}>
        <div className="pt-0.5">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Area of Expertise
          </label>
          <Controller
            name="expertise"
            control={control}
            render={({ field }) => (
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value as string}
              >
                <SelectTrigger
                  className={`w-full rounded-sm! border bg-[#F9FAFB] py-3.5! text-sm ${
                    expertiseError ? 'border-red-300' : 'border-slate-200'
                  }`}
                >
                  <SelectValue placeholder="Select your expertise" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseOptions.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {expertiseError && <p className="mt-1 text-xs text-red-500">{expertiseError.message}</p>}
        </div>
      </CollapsibleField>

      {/* Password */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Password
          </label>
          <div className="relative">
            <Lock size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              disabled={isLoading}
              {...register('password')}
              placeholder="Min. 8 chars"
              className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-10 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
                errors.password ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
            Confirm
          </label>
          <div className="relative">
            <Lock size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showConfirm ? 'text' : 'password'}
              disabled={isLoading}
              {...register('confirm')}
              placeholder="Re-enter password"
              className={`focus:border-primary w-full rounded-sm border bg-[#F9FAFB] py-3.5 pr-10 pl-11 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60 ${
                errors.confirm ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
            >
              {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm.message}</p>}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="agree"
          disabled={isLoading}
          {...register('agree')}
          className="accent-primary mt-0.5 h-4 w-4 cursor-pointer"
        />
        <label htmlFor="agree" className="cursor-pointer text-xs leading-relaxed text-slate-500">
          I agree to EduNext&lsquo;s{' '}
          <Link href="/terms" className="text-primary font-semibold hover:underline">
            Terms
          </Link>{' '}
          &{' '}
          <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>
          {role === 'instructor' &&
            '. I understand my profile needs admin verification before going live.'}
        </label>
      </div>
      {errors.agree && <p className="text-xs text-red-500">{errors.agree.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full cursor-pointer rounded-sm py-4 text-sm font-bold text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
          role === 'student' ? 'bg-primary hover:bg-[#2a6159]' : 'bg-secondary hover:bg-[#d98c0a]'
        }`}
      >
        {isLoading
          ? 'Processing...'
          : role === 'student'
            ? 'Create Student Account →'
            : 'Apply as Instructor →'}
      </button>

      {/* Instructor Note */}
      <CollapsibleField show={role === 'instructor'}>
        <div className="rounded-sm border border-orange-100 bg-orange-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
          📋 <span className="font-semibold">Note:</span> Instructor accounts require admin
          verification. You will receive an email notification once approved.
        </div>
      </CollapsibleField>
    </form>
  );
};

export default RegisterForm;
