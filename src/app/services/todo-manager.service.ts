import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item.interface';

export type ReadonlyTodoItem = Readonly<TodoItem>;
export type ReadonlyTodoArray = ReadonlyArray<ReadonlyTodoItem>;

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {

  private items: TodoItem[] = [{id: 1, text: 'Todo item 1', description: 'description for todo 1'}, 
                               {id: 7, text: 'Todo item 2', description: 'description for todo 2'}, 
                               {id: 6, text: 'Todo item 3', description: 'description for todo 3'}];

  private newItemId(): number {
    let maxId = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  private getItemByIdForEdit(id: number): TodoItem | undefined {
    return this.items.find(item => item.id === id);
  }

  getItemById(id: number): ReadonlyTodoItem | undefined {
    const item = this.getItemByIdForEdit(id);
    if (item) {
      return Object.assign({}, item);
    }
    return;
  }

  getItems(): ReadonlyTodoArray {
    // TODO: переделать на возврат копии данных
    return this.items;
  }

  addItem(text: string, description = ''): boolean {
    if (this.isItemDataValid(text, description)) {
      this.items.push({
        id: this.newItemId(),
        text: text,
        description: description});
      return true;
    } else {
      return false;
    }
  }

  assignItem(todo: TodoItem): boolean {
    return this.addItem(todo.text, todo.description);
  }

  deleteItemById(id: number): boolean {
    const idx: number = this.items.findIndex(item => item.id === id);
    if (idx > -1) {
      this.items.splice(idx, 1);
      return true;
    } else {
      return false;
    }
  }

  editItemById(id: number, text: string, description = ''): boolean {
    const item = this.getItemByIdForEdit(id);
    if (!(item && this.isItemDataValid(text, description))) {
      return false;
    }

    item.text = text;
    item.description = description;
    return true;
  }

  editItem(todo: TodoItem): boolean {
    return this.editItemById(todo.id, todo.text, todo.description);
  }

  isItemDataValid(text: string, description = ''): boolean {
    return text.trim().length > 0;
  }

}
