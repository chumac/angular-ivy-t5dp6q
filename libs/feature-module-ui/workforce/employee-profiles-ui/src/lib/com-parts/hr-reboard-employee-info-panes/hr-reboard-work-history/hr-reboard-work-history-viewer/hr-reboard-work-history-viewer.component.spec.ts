import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoryViewerComponent } from './work-history-viewer.component';

describe('WorkHistoryViewerComponent', () => {
  let component: WorkHistoryViewerComponent;
  let fixture: ComponentFixture<WorkHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
