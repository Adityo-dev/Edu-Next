/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/context/ModalContext';
import {
  TCategory,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/redux/features/categories/categoriesApi';
import { FolderTree, LayoutGrid, X } from 'lucide-react';
import { toast } from 'sonner';

const CategoryManager = () => {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery({ nested: true });
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const { openModal } = useModal();

  const categories = data?.data || [];

  const handleDeleteClick = (category: TCategory) => {
    openModal({
      view: 'DELETE_CONFIRM',
      data: {
        deleteItem: 'category',
        title: 'Delete Category',
        description: (
          <>
            Permanently delete{' '}
            <span className="text-danger font-semibold">&quot;{category?.name}&quot;</span>? This
            action cannot be undone.
          </>
        ),
        actionLabel: 'Delete Now',
        requireReason: false,
        onConfirm: async () => {
          try {
            const res = await deleteCategory(category?._id).unwrap();
            toast.success(res?.message || 'Category deleted successfully');
          } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete category');
          }
        },
      },
    });
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
      description: 'Add a subcategory under the selected main category?.',
      data: { type: 'SUB', action: 'CREATE', parentId },
    });
  };

  const handleOpenUpdate = (category: TCategory, type: 'MAIN' | 'SUB') => {
    openModal({
      view: 'CATEGORY_FORM',
      title: `Update ${type === 'MAIN' ? 'Main Category' : 'Subcategory'}`,
      description: 'Modify the details of this category?.',
      data: {
        type,
        action: 'UPDATE',
        categoryId: category?._id,
        parentId: category?.parentId,
        initialData: {
          name: category?.name,
          description: category?.description || '',
          image: category?.image || '',
        },
      },
    });
  };

  return (
    <div className="dashboard-card-container">
      <div className="border-border/40 mb-5 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Category Management</h2>
          <p className="text-text-secondary text-sm">Manage course and site categories.</p>
        </div>

        <DynamicActionButton label="Add Main Category" onClick={handleOpenMainCreate} showIcon />
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
              <DynamicActionButton label="Add Main Category" onClick={handleOpenMainCreate} />
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category: TCategory) => (
              <div
                key={category?._id}
                className="dashboard-card-container group flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-0.5 text-base leading-tight font-semibold">
                        {category?.name}
                      </h3>
                      <p className="text-text-secondary text-xs">
                        {category?.subCategories?.length || 0} Subcategories
                      </p>
                    </div>
                  </div>
                </div>

                {/* Render subcategories if they exist */}
                {category?.subCategories && category?.subCategories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category?.subCategories.map((sub: TCategory) => (
                      <div
                        key={sub?._id}
                        className="bg-primary/5 border-primary/20 text-primary/80 flex cursor-pointer items-center gap-1.5 rounded-xs border px-2.5 py-1 text-xs font-medium"
                        onClick={() => handleOpenUpdate(sub, 'SUB')}
                      >
                        <FolderTree className="h-3 w-3" />
                        {sub?.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(sub);
                          }}
                          className="text-danger/80 hover:text-danger ml-1 cursor-pointer transition-colors duration-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-border/40 mt-auto flex items-center justify-between border-t pt-2">
                  <DynamicBadge text={category?.isActive ? 'Active' : 'Inactive'} />

                  <DynamicTableActions
                    actions={[
                      {
                        type: 'add',
                        label: 'Add Sub',
                        onClick: () => handleOpenSubCreate(category?._id),
                      },
                      {
                        type: 'edit',
                        onClick: () => handleOpenUpdate(category, 'MAIN'),
                      },
                      {
                        type: 'delete',
                        onClick: () => handleDeleteClick(category),
                        isLoading: isDeleting,
                      },
                    ]}
                  />
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
