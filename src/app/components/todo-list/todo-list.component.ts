import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoItem[] = [{id: 1, text: 'Выполнить домашнее задание'}, 
                       {id: 7, text: 'Переобуть машину'}, 
                       {id: 6, text: 'Записаться на ТО'}];

  newItemText = '';

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  isNewItemDataValid(): boolean {
    return this.newItemText.trim().length > 0;
  }

  private newItemId(): number {
    let maxId = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  onDeleteItem(id: number): void {
    const idx: number = this.items.findIndex(item => item.id === id);
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
