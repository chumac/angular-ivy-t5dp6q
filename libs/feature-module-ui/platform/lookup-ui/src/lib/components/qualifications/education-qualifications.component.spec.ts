import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationQualificationsComponent } from './education-qualifications.component';

describe('EducationQualificationsComponent', () => {
  let component: EducationQualificationsComponent;
  let fixture: ComponentFixture<EducationQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationQualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
