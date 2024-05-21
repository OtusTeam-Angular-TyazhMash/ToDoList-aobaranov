import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';
import { TodoManagerService } from 'src/app/services/todo-manager.service';

@Component({
  selector: 'app-todo-card-view',
  templateUrl: './todo-card-view.component.html',
  styleUrls: ['./todo-card-view.component.scss'],
})
export class TodoCardViewComponent implements OnDestroy, OnInit {

  private routeParamsSubscription!: Subscription;
  private dataSubscription!: Subscription;
  private params: Params | null = null;

  @Input() data: TodoItem | null | undefined = null;

  private dataNotFound(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoManager: TodoManagerService) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.params = params;
        this.loadDataById(+this.params['id']);
      },
    );
    this.dataSubscription = this.todoManager.dataLoaded.subscribe(
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
    if (!this.todoManager.loading) {
      this.data = this.todoManager.getItemById(id);
      if (!this.data) {
        this.dataNotFound();
      }
    }
  }

    
}
