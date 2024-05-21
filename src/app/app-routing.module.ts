import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoCardViewComponent } from './components/todo-card-view/todo-card-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TodoListComponent,
    children: [
      {
        path: ':id',
        // outlet: 'card-view',
        component: TodoCardViewComponent,
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
