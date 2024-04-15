import { Component } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items: TodoItem[] = [{id: 1, text: 'Выполнить домашнее задание'}, 
                       {id: 4, text: 'Переобуть машину'}, 
                       {id: 6, text: 'Записаться на ТО'}];

  newItemText: string = '';

  isNewItemDataValid(): boolean {
    return this.newItemText.trim().length > 0;
  }

  private newItemId(): number {
    let maxId: number = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  onDeleteItem(id: number): void {
    let idx: number = this.items.findIndex(item => item.id === id);
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }

  onAddItem(): void {
    if (this.isNewItemDataValid()) {
      this.items.push({id: this.newItemId(), text: this.newItemText});
      this.newItemText = '';
    }
  }
}
