'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, LayoutGrid } from 'lucide-react';

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Development',
    courses: 45,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Design',
    courses: 32,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Marketing',
    courses: 18,
    status: 'Draft',
  },
];

const CategoryManager = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Manage course and site categories.</CardDescription>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group border-border bg-card hover:border-primary/50 relative flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground text-xs">{category.courses} Courses</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    category.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}
                >
                  {category.status}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
