/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/context/ModalContext';
import {
  TCategory,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/redux/features/categories/categoriesApi';
import { Edit2, FolderTree, LayoutGrid, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

const CategoryManager = () => {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery({ nested: true });
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const { openModal } = useModal();

  const categories = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res?.message || 'Category deleted successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete category');
    }
  };

  const handleOpenMainCreate = () => {
    openModal({
      view: 'CATEGORY_FORM',
      title: 'Create Main Category',
      description: 'Add a new main category to organize your courses and content.',
      data: { type: 'MAIN', action: 'CREATE' },
    });
  };

  const handleOpenSubCreate = (parentId: string) => {
    openModal({
      view: 'CATEGORY_FORM',
      title: 'Create Subcategory',
      description: 'Add a subcategory under the selected main category.',
      data: { type: 'SUB', action: 'CREATE', parentId },
    });
  };

  const handleOpenUpdate = (category: TCategory, type: 'MAIN' | 'SUB') => {
    openModal({
      view: 'CATEGORY_FORM',
      title: `Update ${type === 'MAIN' ? 'Main Category' : 'Subcategory'}`,
      description: 'Modify the details of this category.',
      data: {
        type,
        action: 'UPDATE',
        categoryId: category._id,
        parentId: category.parentId,
        initialData: {
          name: category.name,
          description: category.description || '',
          image: category.image || '',
        },
      },
    });
  };

  return (
    <div className="dashboard-card-container w-full">
      <div className="border-border/40 mb-5 flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Category Management</h2>
          <p className="text-text-secondary mt-1 text-sm">Manage course and site categories.</p>
        </div>

        <DynamicActionButton
          label="Add Main Category"
          onClick={handleOpenMainCreate}
          showIcon
          className="h-11!"
        />
      </div>

      <div>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load categories"
            message="We couldn't load the categories from the server right now. Please check your network connection and retry."
            onRetry={refetch}
          />
        ) : categories.length === 0 ? (
          <EmptyState
            title="No Categories Found"
            description="You haven't created any categories yet. Add a category to organize your courses."
            icon={LayoutGrid}
            actionButton={
              <DynamicActionButton
                label="Add Main Category"
                onClick={handleOpenMainCreate}
                className="h-11!"
              />
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category: TCategory) => (
              <div
                key={category._id}
                className="group bg-card hover:bg-muted/30 border-border hover:border-primary/40 relative flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-0.5 text-base leading-tight font-semibold">
                        {category.name}
                      </h3>
                      <p className="text-text-secondary text-xs">
                        {category.subCategories?.length || 0} Subcategories
                      </p>
                    </div>
                  </div>
                </div>

                {/* Render subcategories if they exist */}
                {category.subCategories && category.subCategories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.subCategories.map((sub: TCategory) => (
                      <div
                        key={sub._id}
                        className="bg-primary/5 border-primary/20 text-primary/80 flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                        onClick={() => handleOpenUpdate(sub, 'SUB')}
                      >
                        <FolderTree className="h-3 w-3" />
                        {sub.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(sub._id);
                          }}
                          className="hover:text-destructive text-muted-foreground ml-1 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-border/40 mt-auto flex items-center justify-between border-t pt-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      category.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                    }`}
                  >
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs font-medium"
                      onClick={() => handleOpenSubCreate(category._id)}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add Sub
                    </Button>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenUpdate(category, 'MAIN')}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(category._id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
