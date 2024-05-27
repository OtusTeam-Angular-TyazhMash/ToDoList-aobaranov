import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';

export type TasksListItemComponentMode = 'view' | 'edit' | undefined;

@Component({
  selector: 'app-tasks-list-item',
  templateUrl: './tasks-list-item.component.html',
  styleUrls: ['./tasks-list-item.component.scss'],
})
export class TasksListItemComponent {
  private _data!: Task;
  private _mode: TasksListItemComponentMode;

  editText = '';

  @Input() deletable = true;

  @Output() deleted = new EventEmitter<number>();
  @Output() edited = new EventEmitter<Task>();
  @Output() canceled = new EventEmitter<number>();

  get data(): Task {
    return this._data;
  }

  @Input({required: true}) set data(value: Task) {
    this._data = value;
    this.resetEditText();
  }

  get mode(): TasksListItemComponentMode {
    return this._mode;
  }

  @Input() set mode(value: TasksListItemComponentMode) {
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
      description: this.data.description,
      status: this.data.status});
  }

  onCancelClick() {
    this.canceled.emit(this.data.id);
  }
  
  onChangeStatusClick(changeEvent: MatCheckboxChange): void {
    const newStatus = changeEvent.checked ? TaskStatus.Completed : TaskStatus.InProgress;
    this.edited.emit({
      id: this.data.id,
      text: this.data.text,
      description: this.data.description,
      status: newStatus,
    });
  }

}
