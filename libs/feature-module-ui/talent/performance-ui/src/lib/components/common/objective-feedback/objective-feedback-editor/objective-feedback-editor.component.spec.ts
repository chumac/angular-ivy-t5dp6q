import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveFeedbackEditorComponent } from './objective-feedback-editor.component';

describe('ObjectiveFeedbackEditorComponent', () => {
  let component: ObjectiveFeedbackEditorComponent;
  let fixture: ComponentFixture<ObjectiveFeedbackEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveFeedbackEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveFeedbackEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
