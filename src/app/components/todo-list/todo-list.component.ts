import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';
import { Filter } from 'src/app/interfaces/filter.interface';
import { 
  TodoManagerService,
  ReadonlyTodoArray,     
} from 'src/app/services/todo-manager.service';
import { ToastService } from 'src/app/services/toast.service';
import { TodoFilterService } from 'src/app/services/todo-filter.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  
  constructor(
    private todoManager: TodoManagerService,
    private todoFilters: TodoFilterService,
    private toastService: ToastService) { }

  isLoading = true;

  private editingItemId: number | null = null;

  private _selectedItemId: number | null = null;

  get selectedItem(): TodoItem | undefined {
    if (this.selectedItemId) {
      return this.todoManager.getItemById(this.selectedItemId);
    }
    return;
  }

  get selectedItemId(): number | null {
    return this._selectedItemId;
  }

  set selectedItemId(value: number | null) {
    if (this.selectedItemId !== value) {
      this._selectedItemId = value;
      this.editingItemId = null;
    }
  }

  getFilters(): Filter[] {
    return this.todoFilters.getFilters();
  }

  getItems(): ReadonlyTodoArray {
    return this.todoManager.getItems();
  }

  getFilteredItems(): ReadonlyTodoArray {
    return this.todoManager.getFilteredItems();
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  isItemSelected(id: number): boolean {
    return this.selectedItemId === id;
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

  onEditItem(item: TodoItem): void {
    const itemEdited = this.todoManager.editItem(item);
    if (itemEdited) {
      this.toastService.showToast('item edited');
      this.editingItemId = null;
    }
  }

  onCancelEditItem(id: number): void {
    this.editingItemId = null;
  }

  onFilterItemClick(filter: Filter, value: string): void {
    this.todoFilters.toggleFilter(filter, value);
  }
}
