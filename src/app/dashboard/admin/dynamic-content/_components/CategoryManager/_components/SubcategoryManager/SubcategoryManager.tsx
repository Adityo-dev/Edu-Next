/* eslint-disable no-unused-vars */
'use client';

import { useModal } from '@/context/ModalContext';
import { TCategory } from '@/redux/features/categories/categoriesApi';
import { FolderTree, X, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubcategoryPayload {
  category: TCategory;
  handleOpenUpdate: (category: TCategory, type: 'MAIN' | 'SUB') => void;
  handleDeleteClick: (category: TCategory) => void;
  handleOpenSubCreate: (parentId: string) => void;
}

const SubcategoryManager = () => {
  const { data } = useModal();
  const payload = data as SubcategoryPayload;

  if (!payload || !payload.category) return null;

  const { category, handleOpenUpdate, handleDeleteClick, handleOpenSubCreate } = payload;

  return (
    <div className="mt-2 flex flex-col gap-4">
      {category.subCategories && category.subCategories.length > 0 ? (
        <div className="flex flex-col gap-2">
          {category.subCategories.map((sub: TCategory) => (
            <div
              key={sub?._id}
              className="hover:border-primary/30 hover:bg-primary/5 group flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FolderTree className="group-hover:text-primary/70 h-4 w-4 shrink-0 text-slate-400 transition-colors" />
                <span className="truncate">{sub?.name}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary h-8 w-8 p-0 text-slate-500"
                  onClick={() => handleOpenUpdate(sub, 'SUB')}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-danger/10 hover:text-danger h-8 w-8 p-0 text-slate-500"
                  onClick={() => handleDeleteClick(sub)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
          <FolderTree className="mb-2 h-8 w-8 opacity-20" />
          <p className="text-sm">No subcategories found.</p>
        </div>
      )}

      <Button
        className="bg-primary hover:bg-primary/90 mt-4 w-full text-white"
        onClick={() => handleOpenSubCreate(category._id)}
      >
        + Add Subcategory
      </Button>
    </div>
  );
};

export default SubcategoryManager;
