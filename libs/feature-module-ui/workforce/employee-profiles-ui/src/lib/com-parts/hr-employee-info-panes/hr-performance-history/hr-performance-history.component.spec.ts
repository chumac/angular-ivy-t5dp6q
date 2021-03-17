import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPerformanceHistoryComponent } from './hr-performance-history.component';

describe('HrPerformanceHistoryComponent', () => {
  let component: HrPerformanceHistoryComponent;
  let fixture: ComponentFixture<HrPerformanceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPerformanceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPerformanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
