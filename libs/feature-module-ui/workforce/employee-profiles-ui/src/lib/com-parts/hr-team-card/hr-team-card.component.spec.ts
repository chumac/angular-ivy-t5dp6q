import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTeamCardComponent } from './hr-team-card.component';

describe('HrTeamCardComponent', () => {
  let component: HrTeamCardComponent;
  let fixture: ComponentFixture<HrTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
