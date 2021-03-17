import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTeamComponent } from './hr-team.component';

describe('HrTeamComponent', () => {
  let component: HrTeamComponent;
  let fixture: ComponentFixture<HrTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
