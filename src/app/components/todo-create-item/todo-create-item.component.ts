import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { TodoManagerService } from 'src/app/services/todo-manager.service';

@Component({
  selector: 'app-todo-create-item',
  templateUrl: './todo-create-item.component.html',
  styleUrls: ['./todo-create-item.component.scss'],
})
export class TodoCreateItemComponent {

  constructor(
    private todoManager: TodoManagerService,
    private toastService: ToastService,
  ) {}

  newItemText = '';
  newItemDescription = '';

  @ViewChild('textInput') textInput: ElementRef | null = null;

  isNewItemDataValid(): boolean {
    return this.todoManager.isItemDataValid(this.newItemText, this.newItemDescription);
  }

  onSubmit(form: NgForm): void {
    const itemAdded = 
    this.todoManager.addItem(
      this.newItemText,
      this.newItemDescription);

    if (itemAdded) {
      this.toastService.showToast('new item added');
      form.resetForm();
      this.textInput?.nativeElement.focus();
    }
  }

}
