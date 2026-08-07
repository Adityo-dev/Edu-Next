/* eslint-disable no-unused-vars */
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import { TCategory } from '@/redux/features/categories/categoriesApi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FolderTree, GripVertical, LayoutGrid, X } from 'lucide-react';

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
  );
};

export default SortableCategoryCard;
