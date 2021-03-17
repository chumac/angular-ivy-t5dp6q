import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEducationalHistoryViewerComponent } from './hr-educational-history-viewer.component';

describe('HrEducationalHistoryViewerComponent', () => {
  let component: HrEducationalHistoryViewerComponent;
  let fixture: ComponentFixture<HrEducationalHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEducationalHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEducationalHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
