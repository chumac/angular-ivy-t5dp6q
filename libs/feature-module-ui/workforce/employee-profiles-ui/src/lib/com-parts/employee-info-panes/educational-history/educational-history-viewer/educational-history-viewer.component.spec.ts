import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalHistoryViewerComponent } from './educational-history-viewer.component';

describe('EducationalHistoryViewerComponent', () => {
  let component: EducationalHistoryViewerComponent;
  let fixture: ComponentFixture<EducationalHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
