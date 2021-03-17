import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalCoursesEditorComponent } from './educational-courses-editor.component';

describe('EducationalCoursesEditorComponent', () => {
  let component: EducationalCoursesEditorComponent;
  let fixture: ComponentFixture<EducationalCoursesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalCoursesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalCoursesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
