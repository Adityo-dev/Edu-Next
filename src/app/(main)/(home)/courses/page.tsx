/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { useGetPublishedCoursesQuery } from '@/redux/features/courseManagement/publicCourse.api';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import CoursesGrid from './_components/CoursesGrid/CoursesGrid';
import CoursesHeader from './_components/CoursesHeader/CoursesHeader';
import CoursesSidebar from './_components/CoursesSidebar/CoursesSidebar';
import MobileFilterDrawer from './_components/MobileFilterDrawer/MobileFilterDrawer';

// ─── Data
const categories = [
  'Web Development',
  'UI/UX Design',
  'Digital Marketing',
  'Freelancing',
  'Graphic Design',
  'Data Analytics',
  'Mobile App Development',
  'Cybersecurity',
  'Machine Learning & AI',
  'Video Editing',
  'Spoken English',
  'Accounting & Finance',
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['Bangla', 'English', 'Hindi'];
const ratings = [4.5, 4.0, 3.5, 3.0];
const sortOptions = [
  'Most Popular',
  'Highest Rated',
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
];

const badgeColors: Record<string, string> = {
  'Best Seller': '#eab308',
  'Top Rated': '#34796f',
  New: '#34d399',
};

const levelColors: Record<string, string> = {
  Beginner: '#34796f',
  Intermediate: '#ca8a04',
  Advanced: '#ef4444',
};

const CoursesPageContent = () => {
  const { setMultipleQueries, searchParams } = useSetSearchQueryInURL();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? searchParams.get('category')!.split(',') : [],
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    searchParams.get('level') ? searchParams.get('level')!.split(',') : [],
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    searchParams.get('language') ? searchParams.get('language')!.split(',') : [],
  );
  const [selectedRating, setSelectedRating] = useState(Number(searchParams.get('rating')) || 0);
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 0,
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [certificateOnly, setCertificateOnly] = useState(
    searchParams.get('certificate') === 'true',
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMultipleQueries({
        search: search || null,
        category: selectedCategories.length > 0 ? selectedCategories.join(',') : null,
        level: selectedLevels.length > 0 ? selectedLevels.join(',') : null,
        language: selectedLanguages.length > 0 ? selectedLanguages.join(',') : null,
        minPrice: priceRange[0] > 0 ? priceRange[0] : null,
        maxPrice: priceRange[1] > 0 && priceRange[1] < 20000 ? priceRange[1] : null,
        rating: selectedRating > 0 ? selectedRating : null,
        certificate: certificateOnly ? 'true' : null,
        sort: sortBy !== 'Most Popular' ? sortBy : null,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [
    search,
    selectedCategories,
    selectedLevels,
    selectedLanguages,
    priceRange,
    selectedRating,
    certificateOnly,
    sortBy,
    setMultipleQueries,
  ]);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedLevels.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] > 0 ||
    certificateOnly;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setSelectedRating(0);
    setPriceRange([0, 0]);
    setCertificateOnly(false);
    setSearch('');
  };

  const queryParams: any = {
    search: search || undefined,
    category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
    level: selectedLevels.length > 0 ? selectedLevels.join(',') : undefined,
    language: selectedLanguages.length > 0 ? selectedLanguages.join(',') : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] > 0 && priceRange[1] < 20000 ? priceRange[1] : undefined,
    rating: selectedRating > 0 ? selectedRating : undefined,
    certificate: certificateOnly ? true : undefined,
    sort: sortBy,
    page: 1,
    limit: 12,
  };

  const { data, isLoading } = useGetPublishedCoursesQuery(queryParams);

  const apiCourses = data?.data?.courses || [];

  const filtered = apiCourses.map((c: any) => ({
    id: c.slug || c._id,
    title: c.title,
    image: c.thumbnail,
    badge: c.badge,
    category: c.category,
    level: c.level,
    language: c.language,
    instructor: c.instructor ? c.instructor.fullName : 'Unknown',
    instructorImage: c.instructor?.avatar,
    rating: c.rating || 0,
    enrolled: c.enrolledCount || 0,
    duration: c.totalDuration || '1h 0m',
    price: c.price,
    certificate: c.hasCertificate,
  }));

  const maxPriceData =
    apiCourses.length > 0 ? Math.max(...apiCourses.map((c: any) => c.price), 20000) : 20000;
  const minPriceData = 0;

  const effectivePriceRange = [priceRange[0], priceRange[1] || maxPriceData];

  return (
    <div className="min-h-screen pt-20">
      {/* Banner */}
      <CoursesHeader search={search} setSearch={setSearch} />

      {/* Main */}
      <div className="mx-auto max-w-400 px-4 py-8">
        <div className="flex gap-6">
          {/* ── Sticky Sidebar  */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="dashboard-card-container sticky top-24">
              {isLoading ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                  <Skeleton className="mb-2 h-px w-full rounded-none" />

                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="py-0">
                      <div className="flex items-center justify-between py-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                      <div className="space-y-3 pt-1 pb-4">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-3.5 w-24" />
                          </div>
                        ))}
                      </div>
                      {i < 3 && <Skeleton className="h-px w-full rounded-none" />}
                    </div>
                  ))}
                </div>
              ) : (
                <CoursesSidebar
                  categories={categories}
                  levels={levels}
                  languages={languages}
                  ratings={ratings}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedLevels={selectedLevels}
                  setSelectedLevels={setSelectedLevels}
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  priceRange={effectivePriceRange}
                  setPriceRange={setPriceRange}
                  certificateOnly={certificateOnly}
                  setCertificateOnly={setCertificateOnly}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  toggleItem={toggleItem}
                  minPriceData={minPriceData}
                  maxPriceData={maxPriceData}
                />
              )}
            </div>
          </aside>

          {/* ── Right Content  */}
          <div className="min-w-0 flex-1">
            {/* Top Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <p className="text-text-secondary text-sm">
                  <span className="text-primary font-bold">
                    {data?.data?.pagination?.total || filtered.length}
                  </span>{' '}
                  courses found
                </p>
              )}
              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                {isLoading ? (
                  <Skeleton className="h-10.5 w-24 rounded-sm lg:hidden" />
                ) : (
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs lg:hidden"
                  >
                    <SlidersHorizontal size={15} />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                        {selectedCategories.length +
                          selectedLevels.length +
                          selectedLanguages.length}
                      </span>
                    )}
                  </button>
                )}

                {/* Sort */}
                {isLoading ? (
                  <Skeleton className="h-10.5 w-40 rounded-sm sm:w-48" />
                ) : (
                  <div className="w-40 sm:w-48">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-11! cursor-pointer rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs outline-none">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {sortOptions.map((o) => (
                          <SelectItem key={o} value={o} className="cursor-pointer">
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* View Toggle */}
                {isLoading ? (
                  <Skeleton className="hidden h-10.5 w-20.5 rounded-sm md:block" />
                ) : (
                  <div className="hidden overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs md:flex">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <CoursesGrid
              filtered={filtered}
              isLoading={isLoading}
              viewMode={viewMode}
              clearFilters={clearFilters}
              badgeColors={badgeColors}
              levelColors={levelColors}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        mobileFilterOpen={mobileFilterOpen}
        setMobileFilterOpen={setMobileFilterOpen}
      >
        <CoursesSidebar
          categories={categories}
          levels={levels}
          languages={languages}
          ratings={ratings}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          priceRange={effectivePriceRange}
          setPriceRange={setPriceRange}
          certificateOnly={certificateOnly}
          setCertificateOnly={setCertificateOnly}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          toggleItem={toggleItem}
          minPriceData={minPriceData}
          maxPriceData={maxPriceData}
        />
      </MobileFilterDrawer>
    </div>
  );
};

const CoursesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      }
    >
      <CoursesPageContent />
    </Suspense>
  );
};

export default CoursesPage;
