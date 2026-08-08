/* eslint-disable no-unused-vars */
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { useModal } from '@/context/ModalContext';
import { TCategory } from '@/redux/features/categories/categoriesApi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FolderEdit, GripVertical, LayoutGrid } from 'lucide-react';

const SortableCategoryCard = ({
  category,
  handleOpenUpdate,
  handleDeleteClick,
  handleOpenSubCreate,
  isDeleting,
}: {
  category: TCategory;
  handleOpenUpdate: (category: TCategory, type: 'MAIN' | 'SUB') => void;
  handleDeleteClick: (category: TCategory) => void;
  handleOpenSubCreate: (parentId: string) => void;
  isDeleting: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category._id,
  });
  const { openModal } = useModal();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`dashboard-card-container group flex flex-col gap-3 ${
        isDragging ? 'ring-primary relative opacity-90 shadow-2xl ring-2' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="text-text-secondary hover:text-primary cursor-grab touch-none transition-colors active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h3 className="mb-0.5 text-base leading-tight font-semibold">{category?.name}</h3>
            <p className="text-text-secondary text-xs">
              {category?.subCategories?.length || 0} Subcategories
            </p>
          </div>
        </div>
        {/* <DynamicBadge text={category?.isActive ? 'Active' : 'Inactive'} /> */}
      </div>

      {/* Subcategory Management Button */}
      <button
        className="hover:border-primary/30 hover:bg-primary/5 hover:text-primary border-border mt-1.5 flex w-full cursor-pointer items-center justify-between rounded-sm border bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          openModal({
            view: 'SUBCATEGORY_MANAGEMENT',
            layout: 'DRAWER',
            title: `Manage ${category?.name} Subcategories`,
            description: 'View, add, edit, or remove subcategories.',
            data: {
              category,
              handleOpenUpdate,
              handleDeleteClick,
              handleOpenSubCreate,
            },
          });
        }}
      >
        <div className="flex items-center gap-2">
          <FolderEdit className="h-4 w-4" />
          <span>Manage Subcategories</span>
        </div>
        <span className="flex h-6 items-center justify-center rounded-full bg-slate-200 px-2 text-xs font-semibold">
          {category?.subCategories?.length || 0}
        </span>
      </button>

      <div className="border-border/40 mt-auto flex items-center justify-end border-t pt-2">
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
  );
};

export default SortableCategoryCard;
