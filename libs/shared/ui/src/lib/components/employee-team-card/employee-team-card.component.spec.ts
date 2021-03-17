import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTeamCardComponent } from './employee-team-card.component';

describe('EmployeeTeamCardComponent', () => {
  let component: EmployeeTeamCardComponent;
  let fixture: ComponentFixture<EmployeeTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
