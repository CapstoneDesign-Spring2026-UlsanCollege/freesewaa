import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const COLORS = ['#ec4899', '#f43f5e', '#d53f8c', '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#14b8a6', '#22c55e', '#84cc16', '#eab308', '#f97316'];

export default function AddTaskModal({ isOpen, onClose, onSave, editTask }) {
  const [content, setContent] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (editTask) { setContent(editTask.content); setColor(editTask.color || COLORS[0]); }
    else { setContent(''); setColor(COLORS[0]); }
  }, [editTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave({ content: content.trim(), color });
    setContent('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-10 w-full max-w-md mx-4 bg-gradient-to-br from-dark-100 to-dark-200 rounded-2xl border border-dark-50 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-dark-50/50">
            <h3 className="text-lg font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">
              {editTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-dark-50 text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Task Description</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What needs to be done?" className="w-full h-28 px-4 py-3 bg-dark-200 border border-dark-50 rounded-xl text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all" autoFocus />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Color</label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <motion.button key={c} type="button" onClick={() => setColor(c)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`w-9 h-9 rounded-xl transition-all ${color === c ? 'ring-2 ring-offset-2 ring-offset-dark-100 scale-110' : ''}`} style={{ backgroundColor: c, ringColor: color === c ? c : undefined }} />
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-dark-50 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">Cancel</button>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold hover:shadow-glow-pink transition-all disabled:opacity-50">
                {editTask ? <><Check className="w-5 h-5 inline mr-2" />Save</> : 'Add Task'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}