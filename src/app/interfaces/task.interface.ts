export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export const LocalTaskStatus: { [key: string]: string} = {
  'Todo': $localize`Todo`,
  'InProgress': $localize`InProgress`,
  'Completed': $localize`Completed`
}
export type TaskId = string;

export interface Task {
  id: TaskId,
  text: string,
  description: string,
  status: TaskStatus
}