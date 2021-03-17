import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalFormsComponent } from './appraisal-forms.component';

describe('AppraisalFormsComponent', () => {
  let component: AppraisalFormsComponent;
  let fixture: ComponentFixture<AppraisalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
