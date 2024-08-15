import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BacklogViewComponent } from './components/backlog-view/backlog-view.component';
import { FormsModule } from '@angular/forms';
import { TasksListItemComponent } from './components/tasks-list-item/tasks-list-item.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastsComponent } from './components/toasts/toasts.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TaskCardViewComponent } from './components/task-card-view/task-card-view.component';
import { RootViewComponent } from './components/root-view/root-view.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogViewComponent,
    TasksListItemComponent,
    ToastsComponent,
    TaskCreateComponent,
    TaskCardViewComponent,
    RootViewComponent,
    TasksListComponent,
    BoardViewComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
