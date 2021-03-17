import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { IWorkflowTransaction } from '@nutela/models/workforce/employee-profiles';
import { LoadApprovedDataWorkflowTransaction, showEditorWorkflowTransaction, showViewerWorkflowTransaction, getWorkflowTransactionApprovedData, ShowViewerWorkflowTransaction } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';
// import { WorkflowTransactionViewerComponent } from './workflow-transactions-viewer/workflow-transactions-viewer.component';


@Component({
  selector: 'x365-fm-workforce-hr-workflow-transaction',
  templateUrl: './hr-workflow-transaction.component.html',
  styleUrls: ['./hr-workflow-transaction.component.scss']
})
export class HrWorkflowTransactionComponent implements OnInit {

  // @ViewChild('viewer') viewer: WorkflowTransactionViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IWorkflowTransaction[]>;
  public awaitingApprovalData$: Observable<IWorkflowTransaction[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Workflow Transaction'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataWorkflowTransaction({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkflowTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerWorkflowTransaction));

    this.approvedData$ = this.store.pipe(select(getWorkflowTransactionApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  // onApprovedViewIconClicked(rowId: number) {
  //   this.viewer.data = null;

  //   this.approvedData$.subscribe(
  //     (data: IWorkflowTransaction[]) => {
  //       const index = data.findIndex(row => row.employee_id === rowId);
  //       this.viewer.data = data[index];

  //       this.store.dispatch(new ShowViewerWorkflowTransaction());
  //     }
  //   );
  // }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
