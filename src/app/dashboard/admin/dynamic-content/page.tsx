'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryManager from './_components/CategoryManager/CategoryManager';
import FaqManager from './_components/FaqManager/FaqManager';
import { Layers, HelpCircle, MessageSquareQuote, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';

const ContentManagementPage = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Premium Header Section */}
      <div className="bg-card border-border relative overflow-hidden rounded-3xl border p-8 shadow-sm sm:p-10">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-primary/10 text-primary flex items-center justify-center rounded-full p-2">
                <Sparkles className="h-5 w-5" />
              </span>
              <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
                Content Management
              </h1>
            </div>
            <p className="text-muted-foreground mt-2 max-w-2xl text-base sm:text-lg">
              Manage the dynamic core of your platform. Organize categories, update FAQs, and curate
              student testimonials effortlessly.
            </p>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="bg-primary/10 pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl"></div>
        <div className="bg-primary/5 pointer-events-none absolute right-32 -bottom-12 h-48 w-48 rounded-full blur-3xl"></div>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="bg-muted/50 border-border/50 mb-8 grid h-14 w-full max-w-2xl grid-cols-3 rounded-2xl border p-1">
          <TabsTrigger
            value="categories"
            className="data-[state=active]:bg-background data-[state=active]:text-primary flex h-12 items-center gap-2 rounded-xl font-semibold transition-all data-[state=active]:shadow-sm"
          >
            <Layers className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="faqs"
            className="data-[state=active]:bg-background data-[state=active]:text-primary flex h-12 items-center gap-2 rounded-xl font-semibold transition-all data-[state=active]:shadow-sm"
          >
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger
            value="testimonials"
            className="data-[state=active]:bg-background data-[state=active]:text-primary flex h-12 items-center gap-2 rounded-xl font-semibold transition-all data-[state=active]:shadow-sm"
          >
            <MessageSquareQuote className="h-4 w-4" />
            Testimonials
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent
            value="categories"
            className="animate-in fade-in-50 duration-500 focus-visible:ring-0 focus-visible:outline-none data-[state=inactive]:hidden"
          >
            <CategoryManager />
          </TabsContent>

          <TabsContent
            value="faqs"
            className="animate-in fade-in-50 duration-500 focus-visible:ring-0 focus-visible:outline-none data-[state=inactive]:hidden"
          >
            <FaqManager />
          </TabsContent>

          <TabsContent
            value="testimonials"
            className="animate-in fade-in-50 duration-500 focus-visible:ring-0 focus-visible:outline-none data-[state=inactive]:hidden"
          >
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
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ContentManagementPage;
