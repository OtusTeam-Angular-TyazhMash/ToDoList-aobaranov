import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateItemComponent } from './todo-create-item.component';

describe('TodoCreateItemComponent', () => {
  let component: TodoCreateItemComponent;
  let fixture: ComponentFixture<TodoCreateItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCreateItemComponent],
    });
    fixture = TestBed.createComponent(TodoCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
