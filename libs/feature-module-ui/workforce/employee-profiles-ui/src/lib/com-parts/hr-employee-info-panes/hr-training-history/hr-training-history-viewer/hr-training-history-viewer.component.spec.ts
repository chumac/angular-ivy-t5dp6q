import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTrainingHistoryViewerComponent } from './hr-training-history-viewer.component';

describe('HrTrainingHistoryViewerComponent', () => {
  let component: HrTrainingHistoryViewerComponent;
  let fixture: ComponentFixture<HrTrainingHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTrainingHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTrainingHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
