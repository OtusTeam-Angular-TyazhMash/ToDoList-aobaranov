import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task, TaskStatus, LocalTaskStatus } from 'src/app/interfaces/task.interface';
import { TasksManagerService } from 'src/app/services/tasks-manager.service';

interface BoardColumn {
  title: string;
  associatedStatus: TaskStatus
}

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit, OnDestroy {

  private items: Task[] = [];

  private itemsSubsciption!: Subscription;

  constructor(
    private tasksManager: TasksManagerService) { }

  private columns: BoardColumn[] = Object.values(TaskStatus).map(status => 
    { return {title: LocalTaskStatus[status], associatedStatus: status}; });

  getColumns(): BoardColumn[] {
    return this.columns;
  }

  ngOnInit(): void {
    this.itemsSubsciption = this.tasksManager.items$.subscribe(
      items => this.items = items,
    );
  }

  ngOnDestroy(): void {
    this.itemsSubsciption.unsubscribe();
  }

  getColumnItems(column: BoardColumn): Task[] {
    return this.items.filter(item => item.status === column.associatedStatus);
  }
}
