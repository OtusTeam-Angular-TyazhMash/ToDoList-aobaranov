import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoItem } from '../../models/to-do-item.interface';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {
  @Input() data!: ToDoItem;
  @Output() deleted = new EventEmitter();

  onDeleteClick(): void {
    this.deleted.emit();
  }
}
