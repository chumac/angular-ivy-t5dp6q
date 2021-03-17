import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVacationHistoryViewerComponent } from './hr-vacation-history-viewer.component';

describe('HrVacationHistoryViewerComponent', () => {
  let component: HrVacationHistoryViewerComponent;
  let fixture: ComponentFixture<HrVacationHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrVacationHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVacationHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
