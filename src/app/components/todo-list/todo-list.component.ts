import { Component, EventEmitter } from '@angular/core';

interface ToDoItem {
  id: number,
  text: string
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items: ToDoItem[] = [{id: 1, text: 'do homework'}, 
                       {id: 2, text: 'feed a cat'},
                       {id: 4, text: 'watch movie'},
                       {id: 5, text: 'watch another movie'}];

  newItemText: string = '';

  newItemTextChanged(text: string): void {
    this.newItemText = text;
  }

  allowNewItemAdd(): boolean {
    return (this.newItemText.trim().length === 0);
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
