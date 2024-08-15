import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootViewComponent } from './root-view.component';

describe('RootViewComponent', () => {
  let component: RootViewComponent;
  let fixture: ComponentFixture<RootViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootViewComponent],
    });
    fixture = TestBed.createComponent(RootViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
