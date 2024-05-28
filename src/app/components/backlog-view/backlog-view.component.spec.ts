import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogViewComponent } from './backlog-view.component';

describe('TasksListComponent', () => {
  let component: BacklogViewComponent;
  let fixture: ComponentFixture<BacklogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogViewComponent],
    });
    fixture = TestBed.createComponent(BacklogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
