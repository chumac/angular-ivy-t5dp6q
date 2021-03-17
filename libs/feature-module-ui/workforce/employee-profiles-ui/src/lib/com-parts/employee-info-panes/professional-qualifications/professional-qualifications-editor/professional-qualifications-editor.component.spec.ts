import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalQualificationsEditorComponent } from './professional-qualifications-editor.component';

describe('ProfessionalQualificationsEditorComponent', () => {
  let component: ProfessionalQualificationsEditorComponent;
  let fixture: ComponentFixture<ProfessionalQualificationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalQualificationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalQualificationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
