import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkflowTransactionViewerComponent } from './hr-workflow-transaction-viewer.component';

describe('HrWorkflowTransactionViewerComponent', () => {
  let component: HrWorkflowTransactionViewerComponent;
  let fixture: ComponentFixture<HrWorkflowTransactionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkflowTransactionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkflowTransactionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
