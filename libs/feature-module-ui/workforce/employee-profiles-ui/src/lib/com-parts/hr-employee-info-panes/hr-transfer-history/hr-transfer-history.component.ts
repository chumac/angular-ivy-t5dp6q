import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { ITransferHistory } from '@nutela/models/workforce/employee-profiles';
import { LoadApprovedDataTransferHistory, showEditorTransferHistory, showViewerTransferHistory, getTransferHistoryApprovedData, ShowViewerTransferHistory } from '../../../store/employee-detailed-area';
import { HrTransferHistoryViewerComponent } from './hr-transfer-history-viewer/hr-transfer-history-viewer.component';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-workforce-hr-transfer-history',
  templateUrl: './hr-transfer-history.component.html',
  styleUrls: ['./hr-transfer-history.component.scss']
})
export class HrTransferHistoryComponent implements OnInit {
 @ViewChild('viewer') viewer: HrTransferHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<ITransferHistory[]>;
  public awaitingApprovalData$: Observable<ITransferHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Transfer History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataTransferHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTransferHistory));
    this.showViewer$ = this.store.pipe(select(showViewerTransferHistory));

    this.approvedData$ = this.store.pipe(select(getTransferHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: ITransferHistory[]) => {
        const index = data.findIndex(row => row.employee_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerTransferHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
