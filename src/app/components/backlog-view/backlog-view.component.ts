import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Filter } from '../../interfaces/filter.interface';
import {
  TasksManagerService,
} from 'src/app/services/tasks-manager.service';
import { Task } from 'src/app/interfaces/task.interface';
import { TasksFilterService } from 'src/app/services/tasks-filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-backlog-view',
  templateUrl: './backlog-view.component.html',
  styleUrls: ['./backlog-view.component.scss'],
})
export class BacklogViewComponent implements OnInit, OnDestroy {

  constructor(
    private tasksManager: TasksManagerService,
    private tasksFilters: TasksFilterService,
    public readonly router: Router,
    public readonly activatedRoute: ActivatedRoute) {
  }

  isLoading = true;

  private itemsCount = 0;
  private itemsSubscription!: Subscription;

  public filters$!: Observable<Filter[]>;
  public filteredItems$!: Observable<Task[]>;
  public items$!: Observable<Task[]>;

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 500);
    this.filters$ = this.tasksFilters.filters$;
    this.items$ = this.tasksManager.items$;
    this.filteredItems$ = this.tasksFilters.composeFilteredTasks$(this.items$);
    this.itemsSubscription = this.items$.subscribe(
      items => this.itemsCount = items.length,
    )
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  isItemCardShowing(): boolean {
    return this.itemsCount > 0 && !this.isLoading;
  }

  onFilterItemClick(filter: Filter, value: string): void {
    this.tasksFilters.toggleFilter(filter, value);
  }
}
