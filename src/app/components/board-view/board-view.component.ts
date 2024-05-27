import { Component } from '@angular/core';
import { TaskStatus } from 'src/app/interfaces/task.interface';
import { ReadonlyTasksArray, TasksManagerService } from 'src/app/services/tasks-manager.service';

interface BoardColumn {
  title: string;
  associatedStatus: TaskStatus
}

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent {

  constructor(
    private tasksManager: TasksManagerService) { }

  private columns: BoardColumn[] = Object.values(TaskStatus).map(status => 
    { return {title: status, associatedStatus: status}; });

  getColumns(): BoardColumn[] {
    return this.columns;
  }

  getColumnItems(column: BoardColumn): ReadonlyTasksArray {
    return this.tasksManager.getItems().filter(item => item.status === column.associatedStatus);
  }
}
