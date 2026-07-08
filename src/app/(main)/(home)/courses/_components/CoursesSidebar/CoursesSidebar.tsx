/* eslint-disable no-unused-vars */
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
import { Filter, Star } from 'lucide-react';
import { useState } from 'react';

interface CoursesSidebarProps {
  categories: string[];
  levels: string[];
  languages: string[];
  ratings: number[];
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedLevels: string[];
  setSelectedLevels: (v: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (v: string[]) => void;
  selectedRating: number;
  setSelectedRating: (v: number) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  certificateOnly: boolean;
  setCertificateOnly: (v: boolean) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  toggleItem: (arr: string[], setArr: (v: string[]) => void, val: string) => void;
  minPriceData: number;
  maxPriceData: number;
}

export default function CoursesSidebar({
  categories,
  levels,
  languages,
  ratings,
  selectedCategories,
  setSelectedCategories,
  selectedLevels,
  setSelectedLevels,
  selectedLanguages,
  setSelectedLanguages,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
  certificateOnly,
  setCertificateOnly,
  clearFilters,
  hasActiveFilters,
  toggleItem,
  minPriceData,
  maxPriceData,
}: CoursesSidebarProps) {
  const [localPrice, setLocalPrice] = useState(priceRange);
  const [prevPriceRange, setPrevPriceRange] = useState(priceRange);

  if (priceRange !== prevPriceRange) {
    setPrevPriceRange(priceRange);
    setLocalPrice(priceRange);
  }
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Filter size={16} className="text-primary" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="hover:text-danger text-danger/80 cursor-pointer text-xs font-semibold"
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
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
            Category
            {selectedCategories.length > 0 && (
              <Badge className="bg-primary mr-0 ml-auto rounded-full px-2 text-white">
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
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pb-2">
              <Slider
                min={minPriceData}
                max={maxPriceData}
                step={100}
                value={localPrice}
                onValueChange={setLocalPrice}
                onValueCommit={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="rounded-sm bg-slate-100 px-3 py-1.5 text-sm font-semibold">
                  ৳{localPrice[0].toLocaleString()}
                </span>
                <span className="text-slate-400">—</span>
                <span className="bg-primary rounded-sm px-3 py-1.5 text-sm font-semibold text-white">
                  ৳{localPrice[1].toLocaleString()}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Rating */}
        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
            Minimum Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[0, ...ratings].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRating(r)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm transition-all ${
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
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
            Level
            {selectedLevels.length > 0 && (
              <Badge className="bg-primary mr-0 ml-auto rounded-full px-2 text-white">
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
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
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
          <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
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
}
