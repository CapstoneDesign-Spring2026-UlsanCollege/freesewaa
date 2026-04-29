import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { COLUMNS } from '../data/defaultTasks';

export default function Sidebar({ tasks, onReset }) {
  const getTasksByColumn = (id) => tasks.filter(t => t.columnId === id);

  const columnStyles = {
    todo: { color: '#3b82f6', glow: 'shadow-glow-blue' },
    doing: { color: '#3b82f6', glow: 'shadow-glow-blue' },
    done: { color: '#22c55e', glow: 'shadow-glow-green' },
    blocked: { color: '#f43f5e', glow: 'shadow-glow-rose' },
    nice: { color: '#a855f7', glow: 'shadow-glow-purple' },
  };

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full lg:w-72 flex-shrink-0 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-dark-50/30 bg-dark-200/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue" 
        />
        <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue bg-clip-text text-transparent">
          Board Reset
        </h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">Development Board</p>

      <div className="space-y-1">
        {COLUMNS.map((col, idx) => {
          const style = columnStyles[col.id];
          return (
            <motion.div 
              key={col.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-dark-50/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: style.color, boxShadow: `0 0 12px ${style.color}` }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{col.title}</span>
              </div>
              <motion.span 
                className="text-sm font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${style.color}20`, color: style.color }}
              >
                {getTasksByColumn(col.id).length}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      <motion.button 
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold hover:shadow-glow-purple transition-all duration-300"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Reset Board</span>
      </motion.button>
    </motion.aside>
  );
}