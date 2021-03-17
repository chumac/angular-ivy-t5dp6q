import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkHistoryViewerComponent } from './hr-work-history-viewer.component';

describe('HrWorkHistoryViewerComponent', () => {
  let component: HrWorkHistoryViewerComponent;
  let fixture: ComponentFixture<HrWorkHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
