import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';
import { 
  TodoManagerService,
  ReadonlyTodoArray,     
} from 'src/app/services/todo-manager.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  
  constructor(
    private todoManager: TodoManagerService,
    private toastService: ToastService) { }

  newItemText = '';
  newItemDescription = '';

  isLoading = true;

  private editingItemId: number | null = null;

  private _selectedItemId: number | null = null;

  get selectedItemId(): number | null {
    return this._selectedItemId;
  }

  set selectedItemId(value: number | null) {
    if (this.selectedItemId !== value) {
      this._selectedItemId = value;
      this.editingItemId = null;
    }
  }

  getItems(): ReadonlyTodoArray {
    return this.todoManager.getItems();
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  isItemSelected(id: number): boolean {
    return this.selectedItemId === id;
  }

  isNewItemDataValid(): boolean {
    return this.todoManager.isItemDataValid(this.newItemText, this.newItemDescription);
  }

  isItemCardShowing(): boolean {
    return this.getItems().length > 0 && !this.isLoading;
  }

  onClickItem(id: number): void {
    this.selectedItemId = id;
  }

  onDblClickItem(id: number): void {
    this.selectedItemId = id;
    this.editingItemId = id;
  }

  isItemEditing(id: number): boolean {
    return this.editingItemId === id;
  }

  onDeleteItem(id: number): void {
    if (this.todoManager.deleteItemById(id)) {
      this.toastService.showToast('item deleted');
      if (this.isItemSelected(id)) {
        this.selectedItemId = null;
      }
    }   
  }

  getSelectedItemDescription(): string {
    if (this.selectedItemId !== null) {
      return this.todoManager.getItemById(this.selectedItemId)?.description || '';
    } else {
      return '';
    }
  }

  onAddItem(): void {
    const itemAdded = 
      this.todoManager.addItem(
        this.newItemText,
        this.newItemDescription);

    if (itemAdded) {
      this.toastService.showToast('new item added');
      this.newItemText = '';
      this.newItemDescription = '';
    }
  }

  onEditItem(item: TodoItem): void {
    const itemEdited = this.todoManager.editItem(item);
    if (itemEdited) {
      this.toastService.showToast('item edited');
      this.editingItemId = null;
    }
  }

  onCancelEditItem(id: number) {
    this.editingItemId = null;
  }
}
