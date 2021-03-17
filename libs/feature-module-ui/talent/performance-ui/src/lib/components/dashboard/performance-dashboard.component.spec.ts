import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDashboardsComponent } from './performanceDashboards.component';

describe('PerformanceDashboardsComponent', () => {
  let component: PerformanceDashboardsComponent;
  let fixture: ComponentFixture<PerformanceDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
