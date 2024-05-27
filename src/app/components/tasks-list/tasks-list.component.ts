import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { ReadonlyTasksArray, TasksManagerService } from 'src/app/services/tasks-manager.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  
  constructor(
    private tasksManager: TasksManagerService,
    private toastService: ToastService,
    public readonly router: Router,
    public readonly activatedRoute: ActivatedRoute) {
  }
  
  @Input() items: ReadonlyTasksArray = [];
  @Input() allowDelete = true;
  @Input() allowEdit = true;

  @Input() hidden: boolean | undefined;
  @Input() taskRoute: string | null = null;

  private editingItemId: number | null = null;

  onDblClickItem(id: number): void {
    if (this.allowEdit) {
      this.editingItemId = id;
    }
  }

  isItemEditing(id: number): boolean {
    return this.allowEdit && (this.editingItemId === id);
  }

  onDeleteItem(id: number): void {
    if (this.allowDelete) {
      if (this.tasksManager.deleteItemById(id)) {
        this.toastService.showToast('item deleted');
      }
    }
  }

  onEditItem(item: Task): void {
    if (this.allowEdit) {
      const itemEdited = this.tasksManager.editItem(item);
      if (itemEdited) {
        this.toastService.showToast('item edited');
        this.editingItemId = null;
      }
    }
  }

  onCancelEditItem(id: number): void {
    this.editingItemId = null;
  }

  getRouterLink(id: number): string[] {
    if (this.taskRoute) {
      return [this.taskRoute, id.toString()];
    } else {
      return [id.toString()];
    }
  }

}
