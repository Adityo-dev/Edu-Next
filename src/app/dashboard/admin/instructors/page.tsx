'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useState } from 'react';
import InstructorDetail from './_components/InstructorDetail/InstructorDetail';
import InstructorsFilter from './_components/InstructorsFilter/InstructorsFilter';
import InstructorsList from './_components/InstructorsList/InstructorsList';
import InstructorsStats from './_components/InstructorsStats/InstructorsStats';

const instructorsData = [
  {
    id: 1,
    name: 'Tanvir Ahmed',
    email: 'tanvir@example.com',
    expertise: 'Mobile App Development',
    experience: '5 years',
    courses: 3,
    status: 'pending',
    submittedDate: 'Apr 20, 2025',
    image: 'https://i.pravatar.cc/150?u=tanvir',
    bio: 'Experienced mobile developer with expertise in Flutter and React Native.',
    youtube: 'https://youtube.com/@tanvir',
  },
  {
    id: 2,
    name: 'Mithila Rahman',
    email: 'mithila@example.com',
    expertise: 'Graphic Design',
    experience: '4 years',
    courses: 2,
    status: 'pending',
    submittedDate: 'Apr 18, 2025',
    image: 'https://i.pravatar.cc/150?u=mithila',
    bio: 'Professional graphic designer with portfolio spanning 100+ projects.',
    youtube: '',
  },
  {
    id: 3,
    name: 'Md. Rafiqul Islam',
    email: 'rafiq@example.com',
    expertise: 'Web Development',
    experience: '8 years',
    courses: 8,
    status: 'approved',
    submittedDate: 'Oct 5, 2022',
    image: 'https://i.pravatar.cc/150?u=rafiq',
    bio: 'Senior web developer teaching since 2022.',
    youtube: 'https://youtube.com/@rafiq',
  },
  {
    id: 4,
    name: 'Farhan Hossain',
    email: 'farhan@example.com',
    expertise: 'UI/UX Design',
    experience: '6 years',
    courses: 4,
    status: 'approved',
    submittedDate: 'Jan 10, 2023',
    image: 'https://i.pravatar.cc/150?u=farhan',
    bio: 'UI/UX designer with expertise in Figma and design systems.',
    youtube: '',
  },
  {
    id: 5,
    name: 'Karim Molla',
    email: 'karim@example.com',
    expertise: 'Cybersecurity',
    experience: '7 years',
    courses: 0,
    status: 'rejected',
    submittedDate: 'Apr 10, 2025',
    image: 'https://i.pravatar.cc/150?u=karim',
    bio: 'Cybersecurity expert with CEH certification.',
    youtube: '',
  },
];

type Instructor = (typeof instructorsData)[0];

const InstructorVerificationPage = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Instructor | null>(null);

  const filtered = instructorsData.filter((i) => filter === 'all' || i.status === filter);

  return (
    <div className="mx-auto space-y-5">
      <SectionHeader
        title="Instructor Verification"
        description="Review and approve instructor applications."
      />
      <InstructorsStats instructors={instructorsData} />
      <InstructorsFilter filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <InstructorsList
          instructors={filtered}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
        <InstructorDetail instructor={selected} />
      </div>
    </div>
  );
};

export default InstructorVerificationPage;
