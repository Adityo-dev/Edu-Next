/* eslint-disable no-unused-vars */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { useModal } from '@/context/ModalContext';
import { TCategory } from '@/redux/features/categories/categoriesApi';
import { FolderTree } from 'lucide-react';

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
              className="hover:border-primary/30 hover:bg-primary/5 group border-border text-text-primary flex items-center justify-between rounded-sm border bg-slate-50 px-3 py-2 text-sm transition-colors"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FolderTree className="group-hover:text-primary/70 text-text-secondary h-4 w-4 shrink-0 transition-colors" />
                <span className="truncate">{sub?.name}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <DynamicTableActions
                  actions={[
                    { type: 'edit', onClick: () => handleOpenUpdate(sub, 'SUB') },
                    { type: 'delete', onClick: () => handleDeleteClick(sub) },
                  ]}
                />
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

      <DynamicActionButton
        label="Add Subcategory"
        showIcon
        onClick={() => handleOpenSubCreate(category._id)}
        className="w-full"
      />
    </div>
  );
};

export default SubcategoryManager;
