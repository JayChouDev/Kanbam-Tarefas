
export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
}

export type ColumnType = 'todo' | 'doing' | 'done';

export interface Column {
  id: ColumnType;
  title: string;
  tasks: Task[];
}
