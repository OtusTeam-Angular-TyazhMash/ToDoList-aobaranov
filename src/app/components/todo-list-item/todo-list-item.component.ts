import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input({required: true}) data!: TodoItem;
  @Output() deleted = new EventEmitter<number>();

  onDeleteClick(): void {
    this.deleted.emit(this.data.id);
  }
}
