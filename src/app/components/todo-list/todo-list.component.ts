import { Component, EventEmitter } from '@angular/core';
import { ToDoItem } from '../../models/to-do-item.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items: ToDoItem[] = [{id: 1, text: 'Выполнить домашнее задание'}, 
                       {id: 4, text: 'Переобуть машину'}, 
                       {id: 6, text: 'Записаться на ТО'}];

  newItemText: string = '';

  isNewItemDataValid(): boolean {
    return this.newItemText.trim().length > 0;
  }

  private newItemId(): number {
    let maxId: number = 0;
    this.items.forEach(item => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });
    return maxId + 1;
  }

  onDeleteItem(item: ToDoItem): void {
    let idx: number = this.items.indexOf(item);
    this.items.splice(idx, 1);
  }

  onAddItem(): void {
    this.items.push({id: this.newItemId(), text: this.newItemText});
    this.newItemText = '';
  }
}
