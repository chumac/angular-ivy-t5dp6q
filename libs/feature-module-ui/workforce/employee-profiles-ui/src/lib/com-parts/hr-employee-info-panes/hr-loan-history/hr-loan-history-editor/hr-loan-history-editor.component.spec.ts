import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLoanHistoryEditorComponent } from './hr-loan-history-editor.component';

describe('HrLoanHistoryEditorComponent', () => {
  let component: HrLoanHistoryEditorComponent;
  let fixture: ComponentFixture<HrLoanHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLoanHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLoanHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
