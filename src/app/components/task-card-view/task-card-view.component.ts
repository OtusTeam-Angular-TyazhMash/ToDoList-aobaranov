import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, TaskStatus } from 'src/app/interfaces/task.interface';
import { TasksManagerService } from 'src/app/services/tasks-manager.service';

@Component({
  selector: 'app-task-card-view',
  templateUrl: './task-card-view.component.html',
  styleUrls: ['./task-card-view.component.scss'],
})
export class TaskCardViewComponent implements OnDestroy, OnInit {

  private routeParamsSubscription!: Subscription;
  private dataSubscription!: Subscription;
  private params: Params | null = null;

  @Input() data: Task | null | undefined = null;

  private dataNotFound(): void {
    this.router.navigate(['..']);
  }

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tasksManager: TasksManagerService) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.params = params;
        this.loadDataById(+this.params['id']);
      },
    );
    this.dataSubscription = this.tasksManager.dataLoaded$.subscribe(
      () => {
        if (this.params) {
          this.loadDataById(+this.params['id']);
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  private loadDataById(id: number): void {
    this.data = this.tasksManager.getItemById(id);
    if (!this.data) {
      this.dataNotFound();
    }
  }

  getStatuses(): TaskStatus[] {
    return Object.values(TaskStatus);
  }
  
  onStatusClick(status: TaskStatus): void {
    if (this.data) {
      this.tasksManager.editItem({...this.data, status: status});
    }
  }
}
