import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardScheduleGridViewerComponent } from './standard-schedule-grid-viewer.component';

describe('StandardScheduleGridViewerComponent', () => {
  let component: StandardScheduleGridViewerComponent;
  let fixture: ComponentFixture<StandardScheduleGridViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardScheduleGridViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardScheduleGridViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
