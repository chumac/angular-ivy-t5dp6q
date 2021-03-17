import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalStatusComponent } from './appraisal-status.component';

describe('AppraisalStatusComponent', () => {
  let component: AppraisalStatusComponent;
  let fixture: ComponentFixture<AppraisalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
