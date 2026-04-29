import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Settings, CheckCircle, AlertTriangle, Bookmark, Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const ICONS = { clipboard: ClipboardList, gear: Settings, check: CheckCircle, warning: AlertTriangle, parking: Bookmark };

export default function Column({ column, tasks, onAddTask, onEditTask, onDeleteTask }) {
  const { setNodeRef } = useDroppable({ id: column.id });
  
  const colorStyles = {
    todo: { bg: '#3b82f6', glow: 'shadow-glow-blue', text: 'text-blue-400' },
    doing: { bg: '#3b82f6', glow: 'shadow-glow-blue', text: 'text-blue-400' },
    done: { bg: '#22c55e', glow: 'shadow-glow-green', text: 'text-green-400' },
    blocked: { bg: '#f43f5e', glow: 'shadow-glow-rose', text: 'text-rose-400' },
    nice: { bg: '#a855f7', glow: 'shadow-glow-purple', text: 'text-purple-400' },
  };
  
  const style = colorStyles[column.id] || colorStyles.todo;
  const IconComponent = ICONS[column.icon] || ClipboardList;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="group"
    >
      <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 transition-all duration-300 ${style.glow}`} style={{ borderColor: style.bg }}>
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2.5 rounded-xl"
            style={{ background: `linear-gradient(135deg, ${style.bg}40, ${style.bg}15)` }}
            whileHover={{ rotate: column.icon === 'gear' ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="w-5 h-5" style={{ color: style.bg }} />
          </motion.div>
          <h2 className="text-base font-bold text-white tracking-wide">{column.title}</h2>
        </div>
        <motion.span 
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${style.bg}30`, color: style.bg }}
        >
          {tasks.length}
        </motion.span>
      </div>

      <motion.div 
        ref={setNodeRef}
        className="space-y-3 min-h-[180px] p-3 rounded-2xl bg-dark-100/30 border border-dark-50/30 backdrop-blur-sm"
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-20 text-gray-500 text-sm"
          >
            Drop here
          </motion.div>
        )}
      </motion.div>

      <motion.button
        onClick={() => onAddTask(column.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-dark-50/50 text-gray-500 hover:text-gray-300 hover:border-gray-500 hover:bg-dark-50/20 transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Task</span>
      </motion.button>
    </motion.div>
  );
}