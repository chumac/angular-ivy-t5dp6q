import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileXsCardComponent } from './employee-profile-xs-card.component';

describe('EmployeeProfileXsCardComponent', () => {
  let component: EmployeeProfileXsCardComponent;
  let fixture: ComponentFixture<EmployeeProfileXsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProfileXsCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileXsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
