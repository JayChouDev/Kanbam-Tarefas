
import { Task as TaskComponent } from './Task';
import { Column as ColumnType, Task, ColumnType as ColumnIdType } from '../types/kanban';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: ColumnIdType) => void;
}

export const Column = ({ 
  column, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop
}: ColumnProps) => {
  
  // Definir cores de fundo com base na coluna
  const getColumnColor = (columnId: ColumnIdType) => {
    switch(columnId) {
      case 'todo':
        return 'bg-[#F2FCE2]'; // verde suave
      case 'doing':
        return 'bg-[#FEF7CD]'; // amarelo suave
      case 'done':
        return 'bg-[#E5DEFF]'; // lilás suave
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Card className={`${getColumnColor(column.id)} border-t-4 border-t-primary/50 h-full flex flex-col`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{column.title}</CardTitle>
          <span className="text-sm font-bold bg-white px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </CardHeader>
      <CardContent 
        className="flex-1 overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
      >
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
            Arraste tarefas aqui
          </div>
        )}
      </CardContent>
      {column.id === 'todo' && (
        <div className="p-3 pt-0">
          <Button 
            onClick={onAddTask} 
            className="w-full"
          >
            + Adicionar Tarefa
          </Button>
        </div>
      )}
    </Card>
  );
};
