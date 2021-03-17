import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTwoSummaryPageComponent } from './supervisor-two-summary-page.component';

describe('SupervisorTwoSummaryPageComponent', () => {
  let component: SupervisorTwoSummaryPageComponent;
  let fixture: ComponentFixture<SupervisorTwoSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorTwoSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTwoSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
