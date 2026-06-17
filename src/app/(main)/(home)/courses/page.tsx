/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Filter, LayoutGrid, List, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { useState } from 'react';
import CourseGridCard from './_components/CourseGridCard/CourseGridCard';
import CourseListCard from './_components/CourseListCard/CourseListCard';
import { coursesData } from './data/coursesData.data';

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
const languages = ['বাংলা', 'English'];
const ratings = [4.5, 4.0, 3.5, 3.0];
const sortOptions = [
  'Most Popular',
  'Highest Rated',
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
];

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-secondary text-white',
  'Top Rated': 'bg-primary text-white',
  New: 'bg-emerald-400 text-white',
};

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-primary',
  Intermediate: 'bg-yellow-50 text-yellow-600',
  Advanced: 'bg-red-50 text-red-500',
};

// ─── Component
const CoursesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [certificateOnly, setCertificateOnly] = useState(false);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedLevels.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 3000 ||
    certificateOnly;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setSelectedRating(0);
    setPriceRange([0, 3000]);
    setCertificateOnly(false);
    setSearch('');
  };

  const filtered = coursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(c.category);
    const matchLevel = selectedLevels.length === 0 || selectedLevels.includes(c.level);
    const matchLang = selectedLanguages.length === 0 || selectedLanguages.includes(c.language);
    const matchRating = c.rating >= selectedRating;
    const matchPrice = c.price >= priceRange[0] && c.price <= priceRange[1];
    const matchCert = !certificateOnly || c.certificate;
    return (
      matchSearch && matchCat && matchLevel && matchLang && matchRating && matchPrice && matchCert
    );
  });

  // ─── Sidebar Content

  const SidebarContent = () => (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-4">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <Filter size={16} className="text-primary" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-red-400 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      <Separator className="mb-2" />

      <Accordion
        type="multiple"
        defaultValue={['category', 'price', 'level', 'rating']}
        className="w-full"
      >
        {/* Category */}
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Category
            {selectedCategories.length > 0 && (
              <Badge className="bg-primary mr-2 ml-auto rounded-full px-2 text-white">
                {selectedCategories.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-52 pr-2">
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-3">
                    <Checkbox
                      id={cat}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() =>
                        toggleItem(selectedCategories, setSelectedCategories, cat)
                      }
                      className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-slate-300"
                    />
                    <label
                      htmlFor={cat}
                      className="hover:text-primary cursor-pointer text-sm text-slate-600"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pb-2">
              <Slider
                min={0}
                max={3000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="rounded-sm bg-slate-100 px-3 py-1.5 text-sm font-semibold">
                  ৳{priceRange[0].toLocaleString()}
                </span>
                <span className="text-slate-400">—</span>
                <span className="bg-primary rounded-sm px-3 py-1.5 text-sm font-semibold text-white">
                  ৳{priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Rating */}
        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Minimum Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[0, ...ratings].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRating(r)}
                  className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-all ${
                    selectedRating === r
                      ? 'bg-primary font-semibold text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r === 0 ? (
                    'Any Rating'
                  ) : (
                    <span className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < Math.floor(r) ? 'currentColor' : 'none'}
                          className={selectedRating === r ? 'text-yellow-300' : 'text-yellow-400'}
                        />
                      ))}
                      <span className="ml-1">{r}+ Stars</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Level */}
        <AccordionItem value="level" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Level
            {selectedLevels.length > 0 && (
              <Badge className="bg-primary mr-2 ml-auto rounded-full px-2 text-white">
                {selectedLevels.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {levels.map((l) => (
                <div key={l} className="flex items-center gap-3">
                  <Checkbox
                    id={l}
                    checked={selectedLevels.includes(l)}
                    onCheckedChange={() => toggleItem(selectedLevels, setSelectedLevels, l)}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-slate-300"
                  />
                  <label
                    htmlFor={l}
                    className="hover:text-primary cursor-pointer text-sm text-slate-600"
                  >
                    {l}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Language */}
        <AccordionItem value="language" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Language
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {languages.map((lang) => (
                <div key={lang} className="flex items-center gap-3">
                  <Checkbox
                    id={lang}
                    checked={selectedLanguages.includes(lang)}
                    onCheckedChange={() =>
                      toggleItem(selectedLanguages, setSelectedLanguages, lang)
                    }
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-slate-300"
                  />
                  <label
                    htmlFor={lang}
                    className="hover:text-primary cursor-pointer text-sm text-slate-600"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Certificate */}
        <AccordionItem value="certificate" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-bold hover:no-underline">
            Certificate
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-3 px-1">
              <Checkbox
                id="cert"
                checked={certificateOnly}
                onCheckedChange={(v) => setCertificateOnly(!!v)}
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary border-slate-300"
              />
              <label htmlFor="cert" className="cursor-pointer text-sm text-slate-600">
                🎓 Certificate Available
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Banner */}
      <div className="bg-primary px-6 py-16 text-center">
        <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
          Explore All <span className="text-yellow-400">Courses</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/75">
          Learn from verified instructors, earn certificates, and build real skills — all in one
          place.
        </p>
        <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-sm bg-white p-2 shadow-sm">
          <Search size={17} className="ml-2 shrink-0 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or instructors..."
            className="w-full bg-transparent text-sm outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="shrink-0 text-slate-400 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          )}
          <button className="bg-secondary shrink-0 rounded-sm px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#d98c0a]">
            Search
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-400 px-6 py-10">
        <div className="flex gap-8">
          {/* ── Sticky Sidebar ─────────────────────────────────────────────── */}
          <aside className="hidden w-68 shrink-0 lg:block">
            <div className="dashboard-card-container sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* ── Right Content ───────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Top Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-text-secondary text-sm">
                <span className="text-primary font-bold">{filtered.length}</span> courses found
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs lg:hidden"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {hasActiveFilters && (
                    <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                      {selectedCategories.length + selectedLevels.length + selectedLanguages.length}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="cursor-pointer rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-xs outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>

                {/* View Toggle */}
                <div className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
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
              </div>
            </div>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="mb-5 flex flex-wrap gap-2">
                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="bg-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
                  >
                    {c}{' '}
                    <button
                      onClick={() => toggleItem(selectedCategories, setSelectedCategories, c)}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {selectedLevels.map((l) => (
                  <span
                    key={l}
                    className="bg-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
                  >
                    {l}{' '}
                    <button onClick={() => toggleItem(selectedLevels, setSelectedLevels, l)}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {selectedLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
                  >
                    {lang}{' '}
                    <button
                      onClick={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {selectedRating > 0 && (
                  <span className="bg-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white">
                    ★ {selectedRating}+{' '}
                    <button onClick={() => setSelectedRating(0)}>
                      <X size={11} />
                    </button>
                  </span>
                )}
                {certificateOnly && (
                  <span className="bg-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white">
                    Certificate{' '}
                    <button onClick={() => setCertificateOnly(false)}>
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-24 text-center shadow-xs">
                <Filter size={40} className="mb-4 text-slate-300" />
                <h3 className="mb-2 text-lg font-bold text-slate-500">No courses found</h3>
                <p className="text-text-secondary mb-6 text-sm">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary rounded-sm px-6 py-2.5 text-sm font-bold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* ── Grid View  */
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseGridCard
                    key={course.id}
                    course={course}
                    badgeColors={badgeColors}
                    levelColors={levelColors}
                  />
                ))}
              </div>
            ) : (
              /* ── List View  */
              <div className="space-y-4">
                {filtered.map((course) => (
                  <CourseListCard
                    key={course.id}
                    course={course}
                    badgeColors={badgeColors}
                    levelColors={levelColors}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
