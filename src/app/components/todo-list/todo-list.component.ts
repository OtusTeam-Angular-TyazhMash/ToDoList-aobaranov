import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: TodoItem[] = [{id: 1, text: 'Todo item 1', description: 'description for todo 1'}, 
                       {id: 7, text: 'Todo item 2', description: 'description for todo 2'}, 
                       {id: 6, text: 'Todo item 3', description: 'description for todo 3'}];

  newItemText = '';
  newItemDescription = '';

  private selectedItemId: number | null = null;

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  isItemSelected(id: number): boolean {
    return this.selectedItemId === id;
  }

  private getItemById(id: number): TodoItem | undefined {
    return this.items.find(item => item.id === id);
  }

  isNewItemDataValid(): boolean {
    return this.newItemText.trim().length > 0;
  }

  isItemCardShowing(): boolean {
    return this.items.length > 0 && !this.isLoading;
  }

  private newItemId(): number {
    let maxId = 0;
    this.items.forEach(item => maxId = Math.max(maxId, item.id));
    return maxId + 1;
  }

  onClickItem(id: number) {
    this.selectedItemId = id;
  }

  onDeleteItem(id: number): void {
    const idx: number = this.items.findIndex(item => item.id === id);
    if (idx > -1) {
      this.items.splice(idx, 1);

      if (this.isItemSelected(id)) {
        this.selectedItemId = null;
      }
    }
  }

  getSelectedItemDescription(): string {
    if (this.selectedItemId !== null) {
      return this.getItemById(this.selectedItemId)?.description || '';
    } else {
      return '';
    }
  }

  onAddItem(): void {
    if (this.isNewItemDataValid()) {
      this.items.push({
        id: this.newItemId(), 
        text: this.newItemText, 
        description: this.newItemDescription});

      this.newItemText = '';
      this.newItemDescription = '';
    }
  }
}
