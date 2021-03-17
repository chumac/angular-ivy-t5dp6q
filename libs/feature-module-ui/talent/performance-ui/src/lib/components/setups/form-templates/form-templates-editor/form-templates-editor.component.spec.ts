import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplatesEditorComponent } from './formTemplates-editor.component';

describe('FormTemplatesEditorComponent', () => {
  let component: FormTemplatesEditorComponent;
  let fixture: ComponentFixture<FormTemplatesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplatesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplatesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
