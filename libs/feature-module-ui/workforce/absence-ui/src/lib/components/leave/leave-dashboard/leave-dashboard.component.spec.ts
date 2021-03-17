import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDashboardComponent } from './leave-dashboard.component';

describe('LeaveDashboardComponent', () => {
  let component: LeaveDashboardComponent;
  let fixture: ComponentFixture<LeaveDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
