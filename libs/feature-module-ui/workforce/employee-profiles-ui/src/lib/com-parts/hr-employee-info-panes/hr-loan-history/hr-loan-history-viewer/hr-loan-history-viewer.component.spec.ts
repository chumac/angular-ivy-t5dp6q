import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLoanHistoryViewerComponent } from './hr-loan-history-viewer.component';

describe('HrLoanHistoryViewerComponent', () => {
  let component: HrLoanHistoryViewerComponent;
  let fixture: ComponentFixture<HrLoanHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLoanHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLoanHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
