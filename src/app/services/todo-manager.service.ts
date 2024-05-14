import { Injectable } from '@angular/core';
import { TodoItem, TodoStatus } from '../interfaces/todo-item.interface';
import { TodoFilterService } from './todo-filter.service';
import { HttpApiService } from './http-api.service';

export type ReadonlyTodoItem = Readonly<TodoItem>;
export type ReadonlyTodoArray = ReadonlyArray<ReadonlyTodoItem>;

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {

  constructor(
    private httpApi: HttpApiService,
    private todoFilters: TodoFilterService) { 
      todoFilters.filtersChanged.subscribe(() => this.resetFilteredItems());
      this.loadItems();
  }

  private items: TodoItem[] = [];

  private filteredItems: TodoItem[] | null = null;

  private newItemId(): number {
    let maxId = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  private loadItems(): void {
    this.httpApi.getTasks().subscribe(
      data => {
        this.items = data as TodoItem[];
        this.resetFilteredItems();
      },
    )
  }

  resetFilteredItems(): void {
    this.filteredItems = null;
  }

  getItemById(id: number): ReadonlyTodoItem | undefined {
    const item = this.items.find(item => item.id === id);
    if (item) {
      return Object.assign({}, item);
    }
    return;
  }

  getItems(): ReadonlyTodoArray {
    return this.items;
  }

  getFilteredItems(): ReadonlyTodoArray {
    if (!this.filteredItems) {
      this.filteredItems = this.todoFilters.filterItems(this.items);
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
        status: TodoStatus.InProgress,
      }).subscribe(
        () => this.loadItems(),
      );
    
    return true;
  }

  assignItem(todo: TodoItem): boolean {
    return this.addItem(todo.text, todo.description);
  }

  deleteItemById(id: number): boolean {
    this.httpApi.deleteTask(id).subscribe(
      () => this.loadItems(),
    )
    return true;
  }

  editItemById(id: number, text: string, description: string, status: TodoStatus): boolean {
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

  editItem(todo: TodoItem): boolean {
    return this.editItemById(todo.id, todo.text, todo.description, todo.status);
  }

  isItemDataValid(text: string, description: string): boolean {
    return text.trim().length > 0;
  }

}
