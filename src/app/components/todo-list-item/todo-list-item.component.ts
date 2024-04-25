import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';

export type TodoListItemComponentMode = 'view' | 'edit' | undefined;

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  private _data!: TodoItem;
  private _mode: TodoListItemComponentMode;

  editText = '';

  @Output() deleted = new EventEmitter<number>();
  @Output() edited = new EventEmitter<TodoItem>();
  @Output() canceled = new EventEmitter<number>();

  get data(): TodoItem {
    return this._data;
  }

  @Input({required: true}) set data(value: TodoItem) {
    this._data = value;
    this.resetEditText();
  }

  get mode(): TodoListItemComponentMode {
    return this._mode;
  }

  @Input() set mode(value: TodoListItemComponentMode) {
    if (this.mode !== value) {
      this._mode = value;
      this.resetEditText();
    }
  }

  private resetEditText(): void {
    this.editText = this._data.text;
  }

  onDeleteClick(): void {
    this.deleted.emit(this.data.id);
  }

  onSaveClick(): void {
    this.edited.emit({
      id: this.data.id, 
      text: this.editText,
      description: this.data.description});
  }

  onCancelClick() {
    this.canceled.emit(this.data.id);
  }
}
