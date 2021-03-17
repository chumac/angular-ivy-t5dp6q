import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkflowTransactionComponent } from './hr-workflow-transaction.component';

describe('HrWorkflowTransactionComponent', () => {
  let component: HrWorkflowTransactionComponent;
  let fixture: ComponentFixture<HrWorkflowTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkflowTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkflowTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
