import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewerComponent } from './schedule-viewer.component';

describe('ScheduleViewerComponent', () => {
  let component: ScheduleViewerComponent;
  let fixture: ComponentFixture<ScheduleViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
