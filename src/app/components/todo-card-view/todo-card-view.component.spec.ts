import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardViewComponent } from './todo-card-view.component';

describe('TodoCardViewComponent', () => {
  let component: TodoCardViewComponent;
  let fixture: ComponentFixture<TodoCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCardViewComponent],
    });
    fixture = TestBed.createComponent(TodoCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});