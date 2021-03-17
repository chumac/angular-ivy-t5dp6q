import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalQualificationsComponent } from './professional-qualifications.component';

describe('ProfessionalQualificationsComponent', () => {
  let component: ProfessionalQualificationsComponent;
  let fixture: ComponentFixture<ProfessionalQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalQualificationsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
