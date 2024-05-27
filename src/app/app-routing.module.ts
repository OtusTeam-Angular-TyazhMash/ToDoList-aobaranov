import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogViewComponent } from './components/backlog-view/backlog-view.component';
import { TaskCardViewComponent } from './components/task-card-view/task-card-view.component';
import { BoardViewComponent } from './components/board-view/board-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'backlog',
    pathMatch: 'full',
  },
  {
    title: 'Backlog',
    path: 'backlog',
    component: BacklogViewComponent,
    children: [
      {
        path: 'task/:id',
        component: TaskCardViewComponent,
      },
    ],
  },
  {
    title: 'Board',
    path: 'board',
    component: BoardViewComponent,
    children: [
      {
        path: 'task/:id',
        component: BoardViewComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
