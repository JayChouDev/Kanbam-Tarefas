
import { useState, useEffect } from 'react';
import { Task, ColumnType } from '../types/kanban';
import { useToast } from '@/components/ui/use-toast';

export const useKanban = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Carregar tarefas do localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Tarefas de exemplo
      const initialTasks: Task[] = [
        { id: '1', title: 'Estudar UML', description: 'Aprender os conceitos básicos de UML', column: 'todo' },
        { id: '2', title: 'Diagrama de sequência', description: 'Criar um diagrama de sequência para o projeto final', column: 'doing' },
        { id: '3', title: 'Estudar Kanban', description: 'Entender os princípios do Kanban e como aplicá-los', column: 'done' }
      ];
      setTasks(initialTasks);
      localStorage.setItem('kanban-tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Salvar tarefas no localStorage quando mudar
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Adicionar nova tarefa
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      column: 'todo'
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Tarefa adicionada",
      description: "A tarefa foi adicionada com sucesso!",
    });
  };

  // Editar tarefa existente
  const editTask = (id: string, title: string, description: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
    toast({
      title: "Tarefa atualizada",
      description: "A tarefa foi atualizada com sucesso!",
    });
  };

  // Excluir tarefa
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi removida com sucesso!",
    });
  };

  // Mover tarefa para outra coluna
  const moveTask = (id: string, column: ColumnType) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, column } : task
    ));
  };

  // Filtrar tarefas por coluna
  const getTasksByColumn = (column: ColumnType): Task[] => {
    return tasks.filter(task => task.column === column);
  };

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    getTasksByColumn
  };
};
