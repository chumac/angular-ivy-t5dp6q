import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { ILoanHistory } from '@nutela/models/workforce/employee-profiles';
import { LoadApprovedDataLoanHistory, showEditorLoanHistory, showViewerLoanHistory, getLoanHistoryApprovedData, ShowViewerLoanHistory } from '../../../store/employee-detailed-area';
import { HrLoanHistoryViewerComponent } from './hr-loan-history-viewer/hr-loan-history-viewer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-loan-history',
  templateUrl: './hr-loan-history.component.html',
  styleUrls: ['./hr-loan-history.component.scss']
})
export class HrLoanHistoryComponent implements OnInit {
   @ViewChild('viewer') viewer: HrLoanHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<ILoanHistory[]>;
  public awaitingApprovalData$: Observable<ILoanHistory[]>;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR Loan History'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataLoanHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorLoanHistory));
    this.showViewer$ = this.store.pipe(select(showViewerLoanHistory));

    this.approvedData$ = this.store.pipe(select(getLoanHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: ILoanHistory[]) => {
        const index = data.findIndex(row => row.loan_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerLoanHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
