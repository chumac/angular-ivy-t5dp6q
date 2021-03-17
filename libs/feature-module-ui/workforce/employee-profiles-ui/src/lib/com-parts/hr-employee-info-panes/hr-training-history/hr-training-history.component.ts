
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrainingHistory } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataTrainingHistory, showEditorTrainingHistory, showViewerTrainingHistory, getTrainingHistoryApprovedData, ShowViewerTrainingHistory } from '../../../store/employee-detailed-area';
import { HrTrainingHistoryViewerComponent } from './hr-training-history-viewer/hr-training-history-viewer.component';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-workforce-hr-training-history',
  templateUrl: './hr-training-history.component.html',
  styleUrls: ['./hr-training-history.component.scss']
})
export class HrTrainingHistoryComponent implements OnInit {
  @Input() employeeId: number;

  @ViewChild('viewer') viewer: HrTrainingHistoryViewerComponent;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<ITrainingHistory[]>;
  public awaitingApprovalData$: Observable<ITrainingHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Training History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataTrainingHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTrainingHistory));
    this.showViewer$ = this.store.pipe(select(showViewerTrainingHistory));

    this.approvedData$ = this.store.pipe(select(getTrainingHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: ITrainingHistory[]) => {
        const index = data.findIndex(row => row.course_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerTrainingHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
