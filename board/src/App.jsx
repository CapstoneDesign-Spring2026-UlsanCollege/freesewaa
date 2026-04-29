import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Column from './components/Column';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import { COLUMNS, DEFAULT_TASKS } from './data/defaultTasks';

const STORAGE_KEY = 'board-reset-tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [editTask, setEditTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setTasks(JSON.parse(saved)); } catch { setTasks(DEFAULT_TASKS); }
    } else { setTasks(DEFAULT_TASKS); }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getTasksByColumn = (id) => tasks.filter(t => t.columnId === id);

  const handleDragStart = (e) => setActiveId(e.active.id);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) { setActiveId(null); return; }

    const activeTask = tasks.find(t => t.id === active.id);
    const overId = over.id;
    const targetCol = COLUMNS.find(c => c.id === overId);
    const overTask = tasks.find(t => t.id === overId);

    let newColId = targetCol?.id || overTask?.columnId;
    if (!newColId) { setActiveId(null); return; }

    if (activeTask && activeTask.columnId !== newColId) {
      setTasks(tasks.map(t => t.id === active.id ? { ...t, columnId: newColId } : t));
    } else if (overTask && activeTask) {
      const colTasks = tasks.filter(t => t.columnId === newColId);
      const oldIdx = colTasks.findIndex(t => t.id === active.id);
      const newIdx = colTasks.findIndex(t => t.id === over.id);
      if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
        const reordered = arrayMove(colTasks, oldIdx, newIdx);
        setTasks([...tasks.filter(t => t.columnId !== newColId), ...reordered]);
      }
    }
    setActiveId(null);
  };

  const handleAddTask = (colId) => { setSelectedColumn(colId); setEditTask(null); setModalOpen(true); };
  const handleEditTask = (task) => { setEditTask(task); setModalOpen(true); };
  const handleDeleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const handleSaveTask = ({ content, color }) => {
    if (editTask) {
      setTasks(tasks.map(t => t.id === editTask.id ? { ...t, content, color } : t));
    } else {
      setTasks([...tasks, { id: `${selectedColumn}-${Date.now()}`, columnId: selectedColumn, content, color }]);
    }
    setModalOpen(false); setEditTask(null);
  };

  const handleReset = () => {
    if (confirm('Reset board to default tasks?')) {
      setTasks(DEFAULT_TASKS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
    }
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-400">
      <div className="flex flex-col lg:flex-row">
        <Sidebar tasks={tasks} onReset={handleReset} />

        <div className="flex-1 p-4 lg:p-6 overflow-x-auto">
          <div className="flex gap-4 lg:gap-5 min-w-max pb-4">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DragOverlay>
          <AnimatePresence>
            {activeTask && <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />}
          </AnimatePresence>
        </DragOverlay>
      </DndContext>

      <AddTaskModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditTask(null); }} onSave={handleSaveTask} editTask={editTask} />
    </div>
  );
}