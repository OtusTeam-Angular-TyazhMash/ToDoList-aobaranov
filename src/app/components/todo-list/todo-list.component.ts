import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item.interface';
import { Filter } from '../../interfaces/filter.interface';
import {
  TodoManagerService,
  ReadonlyTodoArray,
} from 'src/app/services/todo-manager.service';
import { ToastService } from 'src/app/services/toast.service';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  constructor(
    private todoManager: TodoManagerService,
    private todoFilters: TodoFilterService,
    private toastService: ToastService,
    public readonly router: Router,
    public readonly activatedRoute: ActivatedRoute) {
  }

  isLoading = true;

  private editingItemId: number | null = null;

  get selectedItemId(): Observable<number | null> {
    if (this.activatedRoute.children[0]) {
        return this.activatedRoute.children[0].paramMap
            .pipe(map(map => map.get('id')),
                  map(value => value ? +value : null));
    }
    return of(null);
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

  isItemSelected(id: number): Observable<boolean> {
    return this.selectedItemId.pipe(map(value => value === id));
  }

  isItemCardShowing(): boolean {
    return this.getItems().length > 0 && !this.isLoading;
  }

  onDblClickItem(id: number): void {
    this.editingItemId = id;
  }

  isItemEditing(id: number): boolean {
    return this.editingItemId === id;
  }

  onDeleteItem(id: number): void {
    if (this.todoManager.deleteItemById(id)) {
      this.toastService.showToast('item deleted');
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
