import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCustomDataFormsEditorComponent } from './hrCustomDataForms-editor.component';

describe('HrCustomDataFormsEditorComponent', () => {
  let component: HrCustomDataFormsEditorComponent;
  let fixture: ComponentFixture<HrCustomDataFormsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCustomDataFormsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCustomDataFormsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
