import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorSummaryPageComponent } from './supervisor-summary-page.component';

describe('SupervisorSummaryPageComponent', () => {
  let component: SupervisorSummaryPageComponent;
  let fixture: ComponentFixture<SupervisorSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
