import { Injectable } from '@angular/core';
import { Task, TaskId, TaskStatus } from '../interfaces/task.interface';
import { HttpApiService } from './http-api.service';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { ToastService } from './toast.service';

export type ReadonlyTaskItem = Readonly<Task>;
export type ReadonlyTasksArray = ReadonlyArray<ReadonlyTaskItem>;

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {

  public readonly dataLoaded$ = new BehaviorSubject<boolean>(false);
  public readonly dataLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpApi: HttpApiService,
    private toastService: ToastService) { 
      this.loadItems();
  }


  private _items$ = new BehaviorSubject<Task[]>([]);

  get items$() {
    return this._items$.asObservable();
  }

  private loadItems(): void {
    this.dataLoading$.next(true);
    this.httpApi.getTasks().subscribe({
      next: items => {
        this.dataLoading$.next(false);
        this._items$.next(items as Task[]);
        this.dataLoaded$.next(true);
      },
      error: () => {
        this.toastService.showToast($localize`Items loading failed`);
        this.dataLoading$.next(false);
        this._items$.next([]);
        this.dataLoaded$.next(false);
      },
    })
  }
  
  getItemById(id: TaskId): Observable<Task | undefined> {
    return this.httpApi.getTaskById(id).pipe(
        map(result => result.length > 0 ? result[0] : undefined));
  }

  addItem(text: string, description: string): boolean {
    if (!this.isItemDataValid(text, description)) {
      return false;
    }

    this.httpApi.createTask(
      {
        id: '',
        text: text,
        description: description,
        status: TaskStatus.Todo,
      }).subscribe({
        next: () => this.loadItems(),
        error: () => this.toastService.showToast($localize`Item creation failed`),
      });
    
    return true;
  }

  assignItem(task: Task): boolean {
    return this.addItem(task.text, task.description);
  }

  deleteItemById(id: TaskId): boolean {
    this.httpApi.deleteTask(id).subscribe({
      next: () => this.loadItems(),
      error: () => this.toastService.showToast($localize`Item deletion failed`),
    })
    return true;
  }

  editItemById(id: TaskId, text: string, description: string, status: TaskStatus): boolean {
    if (!this.isItemDataValid(text, description)) {
      return false;
    }
    
    this.httpApi.updateTask(
      {
        id: id,
        text: text,
        description: description,
        status: status,
      },
    ).subscribe({
      next: () => this.loadItems(),
      error: () => this.toastService.showToast($localize`Item editing failed`),
    });
    return true;
  }

  editItem(task: Task): boolean {
    return this.editItemById(task.id, task.text, task.description, task.status);
  }

  isItemDataValid(text?: string, description?: string): boolean {
      return !!text && (text.trim().length > 0);
  }

}
