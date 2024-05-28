export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export interface Task {
  id: number,
  text: string,
  description: string,
  status: TaskStatus
}