import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Pencil, Trash2, GripVertical } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative bg-dark-100/80 backdrop-blur-md rounded-xl p-4 cursor-grab active:cursor-grabbing
        border border-dark-50/50 hover:border-accent-blue/50 transition-all duration-300
        hover:shadow-lg hover:shadow-black/30 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-4 h-4 text-dark-50/30 flex-shrink-0 mt-0.5" />
        <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 shadow-lg" style={{ backgroundColor: task.color, boxShadow: `0 0 10px ${task.color}` }} />
        <p className="flex-1 text-sm text-gray-200 font-medium leading-relaxed">{task.content}</p>
      </div>
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="p-1.5 rounded-lg hover:bg-dark-50 text-gray-500 hover:text-accent-blue transition-all" title="Edit">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="p-1.5 rounded-lg hover:bg-dark-50 text-gray-500 hover:text-accent-rose transition-all" title="Delete">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}