import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { IPromotionHistory } from "@nutela/models/workforce/employee-profiles";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IEmployeesProfileState } from "../../../store";
import { LoadApprovedDataPromotionHistory, showEditorPromotionHistory, showViewerPromotionHistory, getPromotionHistoryApprovedData, ShowViewerPromotionHistory } from "../../../store/employee-detailed-area";
import { HrPromotionHistoryViewerComponent } from "./hr-promotion-history-viewer/hr-promotion-history-viewer.component";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'x365-fm-workforce-hr-promotion-history',
  templateUrl: './hr-promotion-history.component.html',
  styleUrls: ['./hr-promotion-history.component.scss']
})
export class HrPromotionHistoryComponent implements OnInit {
 @ViewChild('viewer') viewer: HrPromotionHistoryViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IPromotionHistory[]>;
  public awaitingApprovalData$: Observable<IPromotionHistory[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Promotion History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPromotionHistory({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPromotionHistory));
    this.showViewer$ = this.store.pipe(select(showViewerPromotionHistory));

    this.approvedData$ = this.store.pipe(select(getPromotionHistoryApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: IPromotionHistory[]) => {
        const index = data.findIndex(row => row.employee_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerPromotionHistory());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
