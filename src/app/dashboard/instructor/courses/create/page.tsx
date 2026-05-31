'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { ChevronRight, GripVertical, Plus, Trash2, Upload, Video } from 'lucide-react';
import { useState } from 'react';

const steps = ['Basic Info', 'Curriculum', 'Pricing', 'Publish'];

const CreateCoursePage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    category: '',
    level: '',
    language: '',
    description: '',
    price: '',
    thumbnail: null as File | null,
  });
  const [sections, setSections] = useState([
    { id: 1, title: 'Getting Started', lessons: [{ id: 1, title: '', duration: '', free: false }] },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: '',
        lessons: [{ id: Date.now(), title: '', duration: '', free: false }],
      },
    ]);
  };

  const addLesson = (sectionId: number) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [...s.lessons, { id: Date.now(), title: '', duration: '', free: false }],
            }
          : s,
      ),
    );
  };

  const removeLesson = (sectionId: number, lessonId: number) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) } : s,
      ),
    );
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <SectionHeader
        title="Create New Course"
        description="Fill in the details to publish your course on EduNext."
      />

      {/* Step Progress */}
      <div className="rounded-md border border-slate-100 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-1 items-center">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                  i === step ? 'text-primary' : i < step ? 'text-slate-400' : 'text-slate-300'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                    i === step
                      ? 'bg-primary text-white'
                      : i < step
                        ? 'text-primary bg-emerald-100'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight size={16} className="mx-2 flex-1 text-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-md border border-slate-100 bg-white p-6 shadow-xs">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold">Basic Information</h2>

            {/* Thumbnail */}
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Course Thumbnail
              </label>
              <div className="hover:border-primary flex h-40 w-full cursor-pointer items-center justify-center rounded-sm border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-emerald-50/30">
                <div className="text-center">
                  <Upload size={24} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium text-slate-400">Click to upload thumbnail</p>
                  <p className="text-text-secondary text-xs">PNG, JPG max 2MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Course Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Complete Web Development Bootcamp"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Brief description of your course"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Select category</option>
                  {[
                    'Web Development',
                    'UI/UX Design',
                    'Digital Marketing',
                    'Freelancing',
                    'Graphic Design',
                    'Data Analytics',
                    'Mobile App Development',
                    'Cybersecurity',
                    'Machine Learning & AI',
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Level
                </label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Select level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Language
                </label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="focus:border-primary w-full cursor-pointer rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Select language</option>
                  <option>বাংলা</option>
                  <option>English</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={5}
                  placeholder="Describe what students will learn in this course..."
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Curriculum */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold">Course Curriculum</h2>
            <p className="text-text-secondary text-sm">
              Build your course content section by section.
            </p>

            {sections.map((section, si) => (
              <div key={section.id} className="overflow-hidden rounded-sm border border-slate-200">
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3">
                  <GripVertical size={16} className="cursor-grab text-slate-300" />
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      setSections(
                        sections.map((s) =>
                          s.id === section.id ? { ...s, title: e.target.value } : s,
                        ),
                      )
                    }
                    placeholder={`Section ${si + 1}: Title`}
                    className="flex-1 bg-transparent text-sm font-bold outline-none"
                  />
                  <span className="text-text-secondary text-xs">
                    {section.lessons.length} lessons
                  </span>
                </div>

                <div className="space-y-2 divide-y divide-slate-50 p-3">
                  {section.lessons.map((lesson, li) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 rounded-sm bg-white px-3 py-2.5"
                    >
                      <Video size={14} className="shrink-0 text-slate-300" />
                      <input
                        type="text"
                        placeholder={`Lesson ${li + 1}: Title`}
                        className="flex-1 text-sm outline-none"
                      />
                      <input
                        type="text"
                        placeholder="10:00"
                        className="w-16 rounded-sm border border-slate-200 py-1 text-center text-xs text-slate-400 outline-none"
                      />
                      <label className="flex cursor-pointer items-center gap-1 text-xs text-slate-400">
                        <input type="checkbox" className="accent-primary" />
                        Free
                      </label>
                      <button
                        onClick={() => removeLesson(section.id, lesson.id)}
                        className="text-slate-300 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLesson(section.id)}
                    className="hover:border-primary hover:text-primary flex w-full items-center gap-2 rounded-sm border border-dashed border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 transition-all"
                  >
                    <Plus size={13} /> Add Lesson
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addSection}
              className="hover:border-primary hover:text-primary flex w-full items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 py-3.5 text-sm font-semibold text-slate-500 transition-all"
            >
              <Plus size={16} /> Add New Section
            </button>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold">Pricing</h2>
            <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-4 text-sm text-slate-600">
              💡 EduNext deducts a{' '}
              <span className="text-primary font-bold">20% platform commission</span> from each
              sale. You keep the remaining 80%.
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Course Price (BDT)
              </label>
              <div className="relative">
                <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-slate-400">
                  ৳
                </span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="1500"
                  className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 py-3 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
            {form.price && (
              <div className="rounded-sm border border-slate-100 bg-white p-5">
                <h3 className="mb-3 text-sm font-bold">Revenue Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Course Price</span>
                    <span className="font-semibold">৳{parseInt(form.price).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Platform Commission (20%)</span>
                    <span>- ৳{(parseInt(form.price) * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex justify-between font-bold">
                    <span>You Earn Per Sale</span>
                    <span className="text-primary">
                      ৳{(parseInt(form.price) * 0.8).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Publish */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold">Ready to Publish</h2>
            <div className="space-y-3">
              {[
                { label: 'Course Title', value: form.title || 'Not set', done: !!form.title },
                { label: 'Category', value: form.category || 'Not set', done: !!form.category },
                { label: 'Level', value: form.level || 'Not set', done: !!form.level },
                {
                  label: 'Curriculum',
                  value: `${sections.length} sections`,
                  done: sections.length > 0,
                },
                {
                  label: 'Price',
                  value: form.price ? `৳${form.price}` : 'Not set',
                  done: !!form.price,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-sm border p-4 ${item.done ? 'border-emerald-100 bg-emerald-50/50' : 'border-red-100 bg-red-50/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${item.done ? 'bg-primary text-white' : 'bg-red-100 text-red-500'}`}
                    >
                      {item.done ? '✓' : '!'}
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <span className="text-text-secondary text-xs">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-sm border border-yellow-100 bg-yellow-50 p-4 text-xs text-slate-600">
              📋 After submission, your course will be reviewed by our admin team. You will be
              notified once it is approved.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="rounded-sm border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            ← Previous
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
            >
              Next →
            </button>
          ) : (
            <button className="bg-secondary rounded-sm px-8 py-2.5 text-sm font-bold text-white hover:bg-[#d98c0a]">
              Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
