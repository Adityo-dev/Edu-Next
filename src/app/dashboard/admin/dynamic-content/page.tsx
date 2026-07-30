'use client';

import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { Button } from '@/components/ui/button';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { ITableFilter } from '@/types/table-filter.types';
import { MessageSquareQuote } from 'lucide-react';
import CategoryManager from './_components/CategoryManager/CategoryManager';
import FaqManager from './_components/FaqManager/FaqManager';

const ContentManagementPage = () => {
  const { getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();
  const currentTab = queryParams.tab || 'categories';

  const tabFilters: ITableFilter[] = [
    {
      type: 'tabs',
      name: 'tab',
      value: 'categories',
      options: [
        { label: 'Categories', value: 'categories' },
        { label: 'FAQs', value: 'faqs' },
        { label: 'Testimonials', value: 'testimonials' },
      ],
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Premium Header Section */}
      <SectionHeader
        title="Content Management"
        description="Manage dynamic aspects of your website including categories, FAQs, and testimonials."
      />

      <div className="mb-6">
        <DynamicTableFilterBar fields={tabFilters} />
      </div>

      <div>
        {currentTab === 'categories' && (
          <div className="animate-in fade-in-50 duration-500">
            <CategoryManager />
          </div>
        )}

        {currentTab === 'faqs' && (
          <div className="animate-in fade-in-50 duration-500">
            <FaqManager />
          </div>
        )}

        {currentTab === 'testimonials' && (
          <div className="animate-in fade-in-50 duration-500">
            <div className="dashboard-card-container w-full">
              <div className="border-border/40 mb-5 flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold">Testimonial Management</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Manage user reviews and testimonials showcased on the site.
                  </p>
                </div>
                <Button>Add Testimonial</Button>
              </div>

              <EmptyState
                title="No Testimonials Yet"
                description="This section is under construction. Soon you'll be able to add dynamic testimonials here."
                icon={MessageSquareQuote}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagementPage;
