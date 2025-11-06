import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileText, GripVertical, Trash2 } from 'lucide-react';
import React from 'react';
import { pdfAPI } from '../services/api';

const SortableItem = ({ page, index, onRemove, sessionId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id || `${page.fileId}-${page.pageNumber}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 bg-white rounded-lg border-2
        transition-all duration-200
        ${isDragging ? 'border-primary-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
      `}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 flex-shrink-0"
      >
        <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Order number */}
      <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-primary-100 text-primary-700 rounded-full font-semibold text-xs sm:text-sm flex-shrink-0">
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div className="w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 flex-shrink-0">
        <img
          src={pdfAPI.getThumbnailUrl(sessionId, page.fileId, page.pageNumber)}
          alt={`Page ${page.pageNumber}`}
          className="w-full h-full object-cover rounded border border-gray-200"
        />
      </div>

      {/* Page info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm sm:text-base text-gray-900 truncate">
          {page.filename}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Page {page.pageNumber}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        <button
          onClick={() => onRemove(index)}
          className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove page"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

const PageReorderer = ({ pages, onReorder, onRemove, sessionId }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Ensure each page has a unique ID
  const pagesWithIds = pages.map((page, index) => ({
    ...page,
    id: page.id || `${page.fileId}-${page.pageNumber}-${index}`,
  }));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pagesWithIds.findIndex((page) => page.id === active.id);
      const newIndex = pagesWithIds.findIndex((page) => page.id === over.id);

      const newOrder = arrayMove(pagesWithIds, oldIndex, newIndex);
      // Remove the id property before passing to parent
      const cleanedOrder = newOrder.map(({ id, ...page }) => page);
      onReorder(cleanedOrder);
    }
  };

  if (pages.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium text-gray-600">No pages selected</p>
        <p className="text-sm text-gray-500 mt-1">
          Select pages from your PDFs to reorder them
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Selected Pages ({pages.length})
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Drag to reorder
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={pagesWithIds.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {pagesWithIds.map((page, index) => (
              <SortableItem
                key={page.id}
                page={page}
                index={index}
                onRemove={onRemove}
                sessionId={sessionId}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default PageReorderer;
