import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfessionalQualificationEditorComponent } from './hr-professional-qualification-editor.component';

describe('HrProfessionalQualificationEditorComponent', () => {
  let component: HrProfessionalQualificationEditorComponent;
  let fixture: ComponentFixture<HrProfessionalQualificationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfessionalQualificationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfessionalQualificationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
