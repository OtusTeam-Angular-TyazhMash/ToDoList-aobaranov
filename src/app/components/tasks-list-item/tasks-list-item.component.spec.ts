import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListItemComponent } from './tasks-list-item.component';

describe('TodoListItemComponent', () => {
  let component: TasksListItemComponent;
  let fixture: ComponentFixture<TasksListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListItemComponent],
    });
    fixture = TestBed.createComponent(TasksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
