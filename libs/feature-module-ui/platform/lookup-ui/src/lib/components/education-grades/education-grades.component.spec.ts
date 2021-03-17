import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationGradesComponent } from './education-grades.component';

describe('EducationGradesComponent', () => {
  let component: EducationGradesComponent;
  let fixture: ComponentFixture<EducationGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
