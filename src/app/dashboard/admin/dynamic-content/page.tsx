'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryManager from './_components/CategoryManager';
import FaqManager from './_components/FaqManager';
import { Layers, HelpCircle, MessageSquareQuote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContentManagementPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-foreground text-3xl font-black">Content Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage dynamic aspects of your website including categories, FAQs, and testimonials.
        </p>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-6 grid h-12 w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="categories" className="flex h-10 items-center gap-2">
            <Layers className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex h-10 items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex h-10 items-center gap-2">
            <MessageSquareQuote className="h-4 w-4" />
            Testimonials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="focus-visible:ring-0 focus-visible:outline-none">
          <CategoryManager />
        </TabsContent>

        <TabsContent value="faqs" className="focus-visible:ring-0 focus-visible:outline-none">
          <FaqManager />
        </TabsContent>

        <TabsContent
          value="testimonials"
          className="focus-visible:ring-0 focus-visible:outline-none"
        >
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Testimonial Management</CardTitle>
                <CardDescription>
                  Manage user reviews and testimonials showcased on the site.
                </CardDescription>
              </div>
              <Button>Add Testimonial</Button>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground border-border rounded-lg border border-dashed p-8 text-center">
                This section is under construction. Add dynamic testimonials here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementPage;
