'use client';

import { Check, Star } from 'lucide-react';
import Image from 'next/image';

const skills = [
  'Learn basic to advanced Figma application requirements for workflows.',
  'Master advanced visual design, hierarchy, color theory, and system logic.',
  'Understand user behavioral research and create high-fidelity user flows.',
  'Build professional interactions, complex component architecture, and layouts.',
  'UX framework methodologies step-by-step from layout blueprints to wireframe.',
];

const SkillsAndTeacher = () => {
  return (
    <div className="mx-auto max-w-400 px-6 py-24">
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Left Side: Skills */}
        <div className="w-full lg:w-7/12">
          <h2 className="mb-8 text-4xl font-semibold">
            Master These Skills <span className="text-secondary">with Us</span>
          </h2>
          <ul className="space-y-5">
            {skills.map((skill, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="bg-teal-accent text-primary-brand flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <p className="text-text-secondary text-base leading-relaxed">{skill}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Course Teacher Card */}
        <div className="w-full lg:w-5/12">
          <div className="border-subtle bg-pure-white rounded-md border p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Course Teacher</h3>
            <div className="text-secondary mb-4 flex items-center gap-1 text-sm font-semibold">
              <Star size={18} /> <span>4.8 Instructor Rating</span>
            </div>

            <p className="text-text-secondary mb-4 text-sm leading-relaxed">
              Senior Product Designer with over 8 years of industry experience working with global
              brands. Specialized in building design systems and scalable user-centric structures.
            </p>

            <div className="border-subtle flex items-center gap-4 border-t pt-4">
              <div className="border-primary-brand h-12 w-12 overflow-hidden rounded-full border-2">
                <Image
                  src="https://i.pravatar.cc/150?u=teacher"
                  width={50}
                  height={50}
                  alt="Instructor"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-semibold">Alex Johnson</h4>
                <p className="text-text-secondary text-xs">Lead UX Architect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAndTeacher;
