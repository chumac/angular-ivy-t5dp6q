import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataFormsEditorComponent } from './customDataForms-editor.component';

describe('CustomDataFormsEditorComponent', () => {
  let component: CustomDataFormsEditorComponent;
  let fixture: ComponentFixture<CustomDataFormsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDataFormsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataFormsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
