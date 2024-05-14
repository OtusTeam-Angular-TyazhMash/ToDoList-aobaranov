export enum TodoStatus {
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export interface TodoItem {
  id: number,
  text: string,
  description: string,
  status: TodoStatus
}