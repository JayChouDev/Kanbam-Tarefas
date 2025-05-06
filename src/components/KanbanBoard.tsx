
import { useState } from 'react';
import { Column as ColumnComponent } from './Column';
import { AddTaskModal } from './AddTaskModal';
import { useKanban } from '../hooks/useKanban';
import { Task, ColumnType } from '../types/kanban';

export const KanbanBoard = () => {
  const { tasks, addTask, editTask, deleteTask, moveTask, getTasksByColumn } = useKanban();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'todo' as ColumnType, title: 'A Fazer' },
    { id: 'doing' as ColumnType, title: 'Fazendo' },
    { id: 'done' as ColumnType, title: 'Feito' }
  ];

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: ColumnType) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.column !== columnId) {
      moveTask(draggedTask.id, columnId);
    }
    
    setDraggedTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsAddModalOpen(true);
  };

  const handleSaveTask = (title: string, description: string) => {
    if (editingTask) {
      editTask(editingTask.id, title, description);
      setEditingTask(null);
    } else {
      addTask(title, description);
    }
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)] p-4">
        {columns.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            tasks={getTasksByColumn(column.id)}
            onAddTask={() => {
              setEditingTask(null);
              setIsAddModalOpen(true);
            }}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
      
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
};
