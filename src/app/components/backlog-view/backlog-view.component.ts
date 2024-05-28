import { Component, OnInit } from '@angular/core';
import { Filter } from '../../interfaces/filter.interface';
import {
  TasksManagerService,
  ReadonlyTasksArray,
} from 'src/app/services/tasks-manager.service';
import { TasksFilterService } from 'src/app/services/tasks-filter.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-backlog-view',
  templateUrl: './backlog-view.component.html',
  styleUrls: ['./backlog-view.component.scss'],
})
export class BacklogViewComponent implements OnInit {

  constructor(
    private tasksManager: TasksManagerService,
    private tasksFilters: TasksFilterService,
    public readonly router: Router,
    public readonly activatedRoute: ActivatedRoute) {
  }

  isLoading = true;

  getFilters(): Filter[] {
    return this.tasksFilters.getFilters();
  }

  getItems(): ReadonlyTasksArray {
    return this.tasksManager.getItems();
  }

  getFilteredItems(): ReadonlyTasksArray {
    return this.tasksManager.getFilteredItems();
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  isItemCardShowing(): boolean {
    return this.getItems().length > 0 && !this.isLoading;
  }

  onFilterItemClick(filter: Filter, value: string): void {
    this.tasksFilters.toggleFilter(filter, value);
  }
}
