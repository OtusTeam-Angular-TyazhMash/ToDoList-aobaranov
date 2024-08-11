export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export type TaskId = string;

export interface Task {
  id: TaskId,
  text: string,
  description: string,
  status: TaskStatus
}