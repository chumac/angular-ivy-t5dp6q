import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfessionalQualificationComponent } from './hr-professional-qualification.component';

describe('HrProfessionalQualificationComponent', () => {
  let component: HrProfessionalQualificationComponent;
  let fixture: ComponentFixture<HrProfessionalQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfessionalQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfessionalQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
