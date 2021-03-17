import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackViewerComponent } from './feedback-viewer.component';

describe('FeedbackViewerComponent', () => {
  let component: FeedbackViewerComponent;
  let fixture: ComponentFixture<FeedbackViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
