import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormsEditorComponent } from './customForms-editor.component';

describe('CustomFormsEditorComponent', () => {
  let component: CustomFormsEditorComponent;
  let fixture: ComponentFixture<CustomFormsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
