import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPerformanceHistoryViewerComponent } from './hr-performance-history-viewer.component';

describe('HrPerformanceHistoryViewerComponent', () => {
  let component: HrPerformanceHistoryViewerComponent;
  let fixture: ComponentFixture<HrPerformanceHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPerformanceHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPerformanceHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
