import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { TasksManagerService } from 'src/app/services/tasks-manager.service';

@Component({
  selector: 'app-task-create-item',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {

  constructor(
    private tasksManager: TasksManagerService,
    private toastService: ToastService,
  ) {}

  newItemText = '';
  newItemDescription = '';

  @ViewChild('textInput') textInput: ElementRef | null = null;

  isNewItemDataValid(): boolean {
    return this.tasksManager.isItemDataValid(this.newItemText, this.newItemDescription);
  }

  onSubmit(form: NgForm): void {
    const itemAdded = 
    this.tasksManager.addItem(
      this.newItemText,
      this.newItemDescription);

    if (itemAdded) {
      this.toastService.showToast($localize`new item added`);
      form.resetForm();
      this.textInput?.nativeElement.focus();
    }
  }

}
