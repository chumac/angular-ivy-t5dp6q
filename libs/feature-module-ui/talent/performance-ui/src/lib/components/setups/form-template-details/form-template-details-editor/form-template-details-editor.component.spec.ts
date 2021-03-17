import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateDetailsEditorComponent } from './formTemplateDetails-editor.component';

describe('FormTemplateDetailsEditorComponent', () => {
  let component: FormTemplateDetailsEditorComponent;
  let fixture: ComponentFixture<FormTemplateDetailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplateDetailsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateDetailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
