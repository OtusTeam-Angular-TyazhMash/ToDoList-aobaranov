import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../interfaces/todo-item.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {

  private api = {
    tasksUrl: '/tasks',
  }

  constructor(
    private httpClient: HttpClient) { }

  createTask(task: TodoItem) {
    return this.httpClient.post(environment.apiUrl + this.api.tasksUrl, {...task, id: `${task.id}`});
  }

  updateTask(task: TodoItem) {
    return this.httpClient.put(environment.apiUrl + this.api.tasksUrl + '/' + task.id, task);
  }

  deleteTask(id: number) {
    return this.httpClient.delete(environment.apiUrl + this.api.tasksUrl + '/' + id);
  }

  getTasks() {
    return this.httpClient.get(environment.apiUrl + this.api.tasksUrl);
  }

}