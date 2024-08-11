import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskId } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment.development';

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
    const { ['id']: remove, ...taskData } = task;
    return this.httpClient.post(this.api.tasksUrl, taskData);
  }

  updateTask(task: Task) {
    return this.httpClient.put(this.api.tasksUrl + '/' + task.id, task);
  }

  deleteTask(id: TaskId) {
    return this.httpClient.delete(this.api.tasksUrl + '/' + id);
  }

  getTasks() {
    return this.httpClient.get(this.api.tasksUrl);
  }

  getTaskById(id: TaskId) {
    return this.httpClient.get<Task[]>(this.api.tasksUrl, { params: new HttpParams().set('id', id) });
  }

}