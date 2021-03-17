import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationGradesEditorComponent } from './education-grades-editor.component';

describe('EducationGradesEditorComponent', () => {
  let component: EducationGradesEditorComponent;
  let fixture: ComponentFixture<EducationGradesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationGradesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationGradesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
