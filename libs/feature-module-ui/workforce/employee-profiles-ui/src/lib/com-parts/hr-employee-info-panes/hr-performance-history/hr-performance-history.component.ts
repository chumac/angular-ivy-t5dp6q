
import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { IPerformanceHistory } from "@nutela/models/workforce/employee-profiles";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IEmployeesProfileState } from "../../../store";
import { LoadApprovedDataPerformanceHistory, showEditorPerformanceHistory, showViewerPerformanceHistory, getPerformanceHistoryApprovedData, ShowViewerPerformanceHistory } from "../../../store/employee-detailed-area";
import { HrPerformanceHistoryViewerComponent } from "./hr-performance-history-viewer/hr-performance-history-viewer.component";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'x365-fm-workforce-hr-performance-history',
  templateUrl: './hr-performance-history.component.html',
  styleUrls: ['./hr-performance-history.component.scss']
})
export class HrPerformanceHistoryComponent implements OnInit {
 @ViewChild('viewer') viewer: HrPerformanceHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IPerformanceHistory[]>;
  public awaitingApprovalData$: Observable<IPerformanceHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Performance History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPerformanceHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPerformanceHistory));
    this.showViewer$ = this.store.pipe(select(showViewerPerformanceHistory));

    this.approvedData$ = this.store.pipe(select(getPerformanceHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: IPerformanceHistory[]) => {
        const index = data.findIndex(row => row.employee_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerPerformanceHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
