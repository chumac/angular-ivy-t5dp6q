import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IVacationHistory } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataVacationHistory, showEditorVacationHistory, showViewerVacationHistory, getVacationHistoryApprovedData, ShowViewerVacationHistory } from '../../../store/employee-detailed-area';
import { HrVacationHistoryViewerComponent } from './hr-vacation-history-viewer/hr-vacation-history-viewer.component';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-workforce-hr-vacation-history',
  templateUrl: './hr-vacation-history.component.html',
  styleUrls: ['./hr-vacation-history.component.scss']
})
export class HrVacationHistoryComponent implements OnInit {

@ViewChild('viewer') viewer: HrVacationHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IVacationHistory[]>;
  public awaitingApprovalData$: Observable<IVacationHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Vacation History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataVacationHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorVacationHistory));
    this.showViewer$ = this.store.pipe(select(showViewerVacationHistory));

    this.approvedData$ = this.store.pipe(select(getVacationHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: IVacationHistory[]) => {
        const index = data.findIndex(row => row.employee_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerVacationHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
