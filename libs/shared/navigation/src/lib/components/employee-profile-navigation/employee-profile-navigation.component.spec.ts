import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileNavigationComponent } from './employee-profile-navigation.component';

describe('EmployeeProfileNavigationComponent', () => {
  let component: EmployeeProfileNavigationComponent;
  let fixture: ComponentFixture<EmployeeProfileNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProfileNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
