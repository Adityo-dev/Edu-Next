// 'use client';

// import {
//   ArrowRight,
//   Briefcase,
//   Eye,
//   EyeOff,
//   GraduationCap,
//   Lock,
//   Mail,
//   ShieldCheck,
//   User,
// } from 'lucide-react';
// import React, { useState } from 'react';

// const AuthSection = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState<'student' | 'teacher'>('student'); // রোল বেসড স্টেট
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     agreeTerms: false,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const finalPayload = {
//       ...formData,
//       role: role, // 'student' অথবা 'teacher' পাস হবে
//     };
//     console.log('Submitted Payload with Role:', finalPayload);
//     // এখানে আপনার NextAuth signIn বা Redux-এর API অ্যাকশন কল হবে
//   };

//   return (
//     <section className="bg-section-slate relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-6 py-12">
//       {/* Background Decorative Technical Grid Circles */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         <div className="bg-teal-accent/40 absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full blur-[130px]" />
//         <div className="bg-yellow-accent/40 absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full blur-[130px]" />
//       </div>

//       {/* Main Container Card */}
//       <div className="border-subtle bg-pure-white relative z-10 flex min-h-[650px] w-full max-w-[1100px] overflow-hidden rounded-[2.5rem] border shadow-2xl shadow-slate-100">
//         {/* ================= LEFT SIDE: Interactive Branding & Copy ================= */}
//         <div className="bg-primary-dark relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white lg:flex">
//           <div
//             className="pointer-events-none absolute inset-0 opacity-[0.03]"
//             style={{
//               backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
//               backgroundSize: '24px 24px',
//             }}
//           />

//           {/* Top Brand Info */}
//           <div className="relative z-10 flex items-center gap-2">
//             <div className="bg-primary-brand flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-white shadow-md">
//               E
//             </div>
//             <span className="text-pure-white text-2xl font-black tracking-tight">
//               Edu<span className="text-secondary">Next</span>
//             </span>
//           </div>

//           {/* Dynamic Core Text Based on State & Role */}
//           <div className="relative z-10 my-auto max-w-md space-y-4">
//             <div className="text-secondary inline-flex h-8 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-semibold tracking-widest uppercase">
//               <ShieldCheck size={14} /> 100% Verified Accounts
//             </div>
//             <h2 className="text-pure-white text-4xl leading-tight font-black tracking-tight">
//               {isLogin
//                 ? role === 'student'
//                   ? 'Access Your Personalized Learning Dashboard.'
//                   : 'Manage Your Classrooms & Track Earnings.'
//                 : role === 'student'
//                   ? 'Start Your Journey with Industry Experts.'
//                   : 'Create Premium Courses & Share Knowledge.'}
//             </h2>
//             <p className="text-text-placeholder text-sm leading-relaxed">
//               EduNext marketplace architecture provides separate specialized dashboard control rooms
//               for both global students and qualified teachers.
//             </p>
//           </div>

//           <div className="text-text-placeholder relative z-10 text-xs font-medium">
//             © 2026 EduNext Platform Inc. All rights reserved.
//           </div>
//         </div>

//         {/* ================= RIGHT SIDE: Auth Core Form ================= */}
//         <div className="flex w-full flex-col justify-center px-8 py-12 sm:px-16 lg:w-1/2">
//           {/* Header text switch toggler */}
//           <div className="mb-6">
//             <h3 className="text-text-primary mb-1 text-3xl font-black tracking-tight">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </h3>
//             <p className="text-text-secondary text-sm font-medium">
//               {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsLogin(!isLogin);
//                   setShowPassword(false);
//                 }}
//                 className="text-secondary ml-1 font-bold transition-all hover:underline"
//               >
//                 {isLogin ? 'Sign up free' : 'Sign in here'}
//               </button>
//             </p>
//           </div>

//           {/* ================= ROLE SELECTOR TABS (Next Level UI) ================= */}
//           <div className="mb-6 space-y-2">
//             <label className="text-text-secondary text-xs font-bold tracking-wider uppercase">
//               Select Your Account Type
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               {/* Student Role Button */}
//               <button
//                 type="button"
//                 onClick={() => setRole('student')}
//                 className={`flex items-center justify-center gap-3 rounded-xl border p-3.5 text-sm font-bold transition-all ${
//                   role === 'student'
//                     ? 'border-primary-brand bg-teal-accent/30 text-primary-brand shadow-sm shadow-emerald-50'
//                     : 'border-subtle bg-section-slate text-text-secondary hover:bg-slate-100'
//                 }`}
//               >
//                 <GraduationCap size={18} />
//                 <span>Student</span>
//               </button>

//               {/* Teacher/Instructor Role Button */}
//               <button
//                 type="button"
//                 onClick={() => setRole('teacher')}
//                 className={`flex items-center justify-center gap-3 rounded-xl border p-3.5 text-sm font-bold transition-all ${
//                   role === 'teacher'
//                     ? 'border-secondary bg-yellow-accent text-secondary shadow-sm shadow-orange-50'
//                     : 'border-subtle bg-section-slate text-text-secondary hover:bg-slate-100'
//                 }`}
//               >
//                 <Briefcase size={18} />
//                 <span>Teacher</span>
//               </button>
//             </div>
//           </div>

//           {/* Input Fields Forms */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* NAME FIELD (Only visible in Register Mode) */}
//             {!isLogin && (
//               <div className="space-y-1.5">
//                 <label className="text-text-secondary text-xs font-bold tracking-wider uppercase">
//                   Full Name
//                 </label>
//                 <div className="relative flex items-center">
//                   <User className="text-text-placeholder absolute left-4" size={18} />
//                   <input
//                     type="text"
//                     required
//                     placeholder="Aditto Dev Barmon"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="border-subtle bg-section-slate text-text-primary focus:border-primary-brand focus:bg-pure-white focus:ring-teal-accent w-full rounded-xl border py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:ring-2"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* EMAIL FIELD */}
//             <div className="space-y-1.5">
//               <label className="text-text-secondary text-xs font-bold tracking-wider uppercase">
//                 Email Address
//               </label>
//               <div className="relative flex items-center">
//                 <Mail className="text-text-placeholder absolute left-4" size={18} />
//                 <input
//                   type="email"
//                   required
//                   placeholder="example@gmail.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="border-subtle bg-section-slate text-text-primary focus:border-primary-brand focus:bg-pure-white focus:ring-teal-accent w-full rounded-xl border py-3 pr-4 pl-12 text-sm font-medium transition-all outline-none focus:ring-2"
//                 />
//               </div>
//             </div>

//             {/* PASSWORD FIELD */}
//             <div className="space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-text-secondary text-xs font-bold tracking-wider uppercase">
//                   Password
//                 </label>
//                 {isLogin && (
//                   <a
//                     href="#"
//                     className="text-text-secondary hover:text-primary-brand text-xs font-bold transition-colors"
//                   >
//                     Forgot Password?
//                   </a>
//                 )}
//               </div>
//               <div className="relative flex items-center">
//                 <Lock className="text-text-placeholder absolute left-4" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="border-subtle bg-section-slate text-text-primary focus:border-primary-brand focus:bg-pure-white focus:ring-teal-accent w-full rounded-xl border py-3 pr-12 pl-12 text-sm font-medium transition-all outline-none focus:ring-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="text-text-placeholder hover:text-text-secondary absolute right-4 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* TERMS CHECKBOX (Only visible in Register Mode) */}
//             {!isLogin && (
//               <div className="flex items-start gap-3 pt-1">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   required
//                   checked={formData.agreeTerms}
//                   onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
//                   className="accent-primary-brand border-subtle mt-1 h-4 w-4 cursor-pointer rounded"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-text-secondary cursor-pointer text-xs leading-normal font-medium select-none"
//                 >
//                   I agree to the{' '}
//                   <span className="text-primary-brand font-bold underline">Terms of Service</span>{' '}
//                   and <span className="text-primary-brand font-bold underline">Privacy Policy</span>
//                   .
//                 </label>
//               </div>
//             )}

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               className="group bg-primary-brand mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:opacity-95 hover:shadow-xl active:scale-[0.98]"
//             >
//               <span>
//                 {isLogin
//                   ? `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`
//                   : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
//               </span>
//               <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthSection;
