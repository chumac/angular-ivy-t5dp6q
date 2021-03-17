import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCompetencyProfileComponent } from './hr-competency-profile.component';

describe('HrCompetencyProfileComponent', () => {
  let component: HrCompetencyProfileComponent;
  let fixture: ComponentFixture<HrCompetencyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCompetencyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCompetencyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
