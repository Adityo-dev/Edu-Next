'use client';

import { useState } from 'react';
import CertificatesHeader from './_components/CertificatesHeader/CertificatesHeader';
import CertificatesStats from './_components/CertificatesStats/CertificatesStats';
import EarnedCertificates from './_components/EarnedCertificates/EarnedCertificates';
import InProgressCertificates from './_components/InProgressCertificates/InProgressCertificates';

const certificatesData = [
  {
    id: 1,
    course: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    completedDate: 'April 10, 2025',
    category: 'Freelancing',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    certificateId: 'EDN-2025-001',
  },
  {
    id: 2,
    course: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    completedDate: 'March 5, 2025',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    certificateId: 'EDN-2025-002',
  },
  {
    id: 3,
    course: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    completedDate: 'February 20, 2025',
    category: 'Data Analytics',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    certificateId: 'EDN-2025-003',
  },
];

const inProgressCourses = [
  { title: 'Complete Web Development Bootcamp', progress: 72 },
  { title: 'UI/UX Design Masterclass', progress: 45 },
  { title: 'Digital Marketing from Zero to Hero', progress: 20 },
];

const CertificatesPage = () => {
  const [search, setSearch] = useState('');

  const filtered = certificatesData.filter((c) =>
    c.course.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <CertificatesHeader search={search} setSearch={setSearch} />

        {/* Stats */}
        <CertificatesStats
          earnedCount={certificatesData.length}
          inProgressCount={inProgressCourses.length}
        />

        {/* Earned Certificates */}
        <EarnedCertificates certificates={filtered} />

        {/* In Progress */}
        <InProgressCertificates courses={inProgressCourses} />
      </div>
    </div>
  );
};

export default CertificatesPage;
