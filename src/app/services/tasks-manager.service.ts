import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../interfaces/task.interface';
import { HttpApiService } from './http-api.service';
import { BehaviorSubject, map } from 'rxjs';
import { ToastService } from './toast.service';

export type ReadonlyTaskItem = Readonly<Task>;
export type ReadonlyTasksArray = ReadonlyArray<ReadonlyTaskItem>;

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {

  private _items: Task[] = [];

  public readonly dataLoaded$ = new BehaviorSubject<boolean>(false);
  public readonly dataLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpApi: HttpApiService,
    private toastService: ToastService) { 
      this.items$.subscribe(
          items => this._items = items,
      );
      this.loadItems();
  }


  private _items$ = new BehaviorSubject<Task[]>([]);

  get items$() {
    return this._items$.asObservable();
  }

  private newItemId(): number {
    let maxId = 0;
    this._items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  private loadItems(): void {
    this.dataLoading$.next(true);
    this.httpApi.getTasks().pipe(map(
      data => (data as Array<Task>).map(item => {
          item.id = +item.id;
          return item;
        }),
    )).subscribe({
      next: items => {
        this.dataLoading$.next(false);
        this._items = items;
        this._items$.next(items);
        this.dataLoaded$.next(true);
      },
      error: () => {
        this.toastService.showToast($localize`Items loading failed`);
        this.dataLoading$.next(false);
        this._items = [];
        this._items$.next([]);
        this.dataLoaded$.next(false);
      },
    })
  }

  getItemById(id: number): Task | undefined {
    const item = this._items.find(item => item.id === id);
    if (item) {
      return Object.assign({}, item);
    }
    return;
  }

  addItem(text: string, description: string): boolean {
    if (!this.isItemDataValid(text, description)) {
      return false;
    }

    this.httpApi.createTask(
      {
        id: this.newItemId(),
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

  deleteItemById(id: number): boolean {
    this.httpApi.deleteTask(id).subscribe({
      next: () => this.loadItems(),
      error: () => this.toastService.showToast($localize`Item deletion failed`),
    })
    return true;
  }

  editItemById(id: number, text: string, description: string, status: TaskStatus): boolean {
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
