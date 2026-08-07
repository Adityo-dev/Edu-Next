/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import EmptyState from '@/components/dashboard/EmptyState/EmptyState';
import ErrorState from '@/components/dashboard/ErrorState/ErrorState';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/context/ModalContext';
import {
  TCategory,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useReorderCategoriesMutation,
} from '@/redux/features/categories/categoriesApi';
import { LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import SortableCategoryCard from './_components/SortableCategoryCard/SortableCategoryCard';

const CategoryManager = () => {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery({ nested: true });
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [reorderCategories] = useReorderCategoriesMutation();
  const { openModal } = useModal();

  const [localCategories, setLocalCategories] = useState<TCategory[]>([]);
  const [isClient, setIsClient] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const t = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (data?.data) {
      const t = setTimeout(() => {
        setLocalCategories([...data.data].sort((a, b) => (a.order || 0) - (b.order || 0)));
      }, 0);
      return () => clearTimeout(t);
    }
  }, [data]);

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localCategories.findIndex((item) => item._id === active.id);
      const newIndex = localCategories.findIndex((item) => item._id === over.id);

      const newCategories = arrayMove(localCategories, oldIndex, newIndex);
      setLocalCategories(newCategories);

      const payload = newCategories.map((cat, index) => ({
        id: cat._id,
        order: index,
      }));

      try {
        await reorderCategories({ categories: payload }).unwrap();
        toast.success('Categories reordered successfully');
      } catch (error: any) {
        toast.error('Failed to reorder categories');
        if (data?.data) {
          setLocalCategories([...data.data].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      }
    }
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
        {isLoading || !isClient ? (
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
        ) : localCategories.length === 0 ? (
          <EmptyState
            title="No Categories Found"
            description="You haven't created any categories yet. Add a category to organize your courses."
            icon={LayoutGrid}
            actionButton={
              <DynamicActionButton label="Add Main Category" onClick={handleOpenMainCreate} />
            }
          />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localCategories.map((c) => c._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {localCategories.map((category) => (
                  <SortableCategoryCard
                    key={category._id}
                    category={category}
                    handleOpenUpdate={handleOpenUpdate}
                    handleDeleteClick={handleDeleteClick}
                    handleOpenSubCreate={handleOpenSubCreate}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
