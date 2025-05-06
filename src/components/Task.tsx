
import { useState } from 'react';
import { Task as TaskType } from '../types/kanban';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface TaskProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: TaskType) => void;
}

export const Task = ({ task, onEdit, onDelete, onDragStart }: TaskProps) => {
  return (
    <Card 
      className="mb-3 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium truncate">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(task)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
