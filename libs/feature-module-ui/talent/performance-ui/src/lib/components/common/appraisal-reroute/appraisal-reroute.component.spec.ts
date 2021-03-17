import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalRerouteComponent } from './appraisal-reroute.component';

describe('AppraisalRerouteComponent', () => {
  let component: AppraisalRerouteComponent;
  let fixture: ComponentFixture<AppraisalRerouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalRerouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalRerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
