import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskId } from 'src/app/interfaces/task.interface';
import { TasksManagerService } from 'src/app/services/tasks-manager.service';
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
  
  @Input() items: Task[] | null = [];
  @Input() allowDelete = true;
  @Input() allowEdit = true;

  @Input() hidden: boolean | undefined;
  @Input() taskRoute: string | null = null;

  private editingItemId: TaskId | null = null;

  onDblClickItem(id: TaskId): void {
    if (this.allowEdit) {
      this.editingItemId = id;
    }
  }

  isItemEditing(id: TaskId): boolean {
    return this.allowEdit && (this.editingItemId === id);
  }

  onDeleteItem(id: TaskId): void {
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

  onCancelEditItem(id: TaskId): void {
    this.editingItemId = null;
  }

  getRouterLink(id: TaskId): string[] {
    if (this.taskRoute) {
      return [this.taskRoute, id.toString()];
    } else {
      return [id.toString()];
    }
  }

}
