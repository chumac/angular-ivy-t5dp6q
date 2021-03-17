import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLoanHistoryComponent } from './hr-loan-history.component';

describe('HrLoanHistoryComponent', () => {
  let component: HrLoanHistoryComponent;
  let fixture: ComponentFixture<HrLoanHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLoanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
