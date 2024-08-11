import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {

  private api = {
    tasksUrl: `${environment.apiUrl}/tasks`,
  }

  constructor(
    private httpClient: HttpClient) { }

  createTask(task: Task) {
    return this.httpClient.post(this.api.tasksUrl, {...task, id: `${task.id}`});
  }

  updateTask(task: Task) {
    return this.httpClient.put(this.api.tasksUrl + '/' + task.id, task);
  }

  deleteTask(id: number) {
    return this.httpClient.delete(this.api.tasksUrl + '/' + id);
  }

  getTasks() {
    return this.httpClient.get(this.api.tasksUrl);
  }

}