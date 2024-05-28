import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../interfaces/task.interface';
import { TasksFilterService } from './tasks-filter.service';
import { HttpApiService } from './http-api.service';
import { Subject, map } from 'rxjs';

export type ReadonlyTaskItem = Readonly<Task>;
export type ReadonlyTasksArray = ReadonlyArray<ReadonlyTaskItem>;

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  public readonly dataLoaded = new Subject<number>();

  private notifyDataLoaded(): void {
    this.dataLoaded.next(this.items.length);
  }

  constructor(
    private httpApi: HttpApiService,
    private tasksFilters: TasksFilterService) { 
      tasksFilters.filtersChanged.subscribe(() => this.resetFilteredItems());
      this.loadItems();
  }

  private items: Task[] = [];

  private filteredItems: Task[] | null = null;

  private newItemId(): number {
    let maxId = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  private loadItems(): void {
    this._loading = true;
    this.httpApi.getTasks().pipe(map(
      data => (data as Array<Task>).map(item => {
          item.id = +item.id;
          return item;
        }),
    )).subscribe(
      items => {
        this.items = items;
        this.resetFilteredItems();
        this._loading = false;
        this.notifyDataLoaded();
      },
    )
  }

  resetFilteredItems(): void {
    this.filteredItems = null;
  }

  getItemById(id: number): ReadonlyTaskItem | undefined {
    const item = this.items.find(item => item.id === id);
    if (item) {
      return Object.assign({}, item);
    }
    return;
  }

  getItems(): ReadonlyTasksArray {
    return this.items;
  }

  getFilteredItems(): ReadonlyTasksArray {
    if (!this.filteredItems) {
      this.filteredItems = this.tasksFilters.filterItems(this.items);
    }
    return this.filteredItems;    
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
      }).subscribe(
        () => this.loadItems(),
      );
    
    return true;
  }

  assignItem(task: Task): boolean {
    return this.addItem(task.text, task.description);
  }

  deleteItemById(id: number): boolean {
    this.httpApi.deleteTask(id).subscribe(
      () => this.loadItems(),
    )
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
    ).subscribe(
      () => this.loadItems(),
    );
    return true;
  }

  editItem(task: Task): boolean {
    return this.editItemById(task.id, task.text, task.description, task.status);
  }

  isItemDataValid(text?: string, description?: string): boolean {
      return !!text && (text.trim().length > 0);
  }

}
