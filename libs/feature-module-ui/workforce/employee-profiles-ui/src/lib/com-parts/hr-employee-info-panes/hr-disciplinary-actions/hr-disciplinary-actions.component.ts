import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IEmployeesProfileState } from "../../../store";
import { IDisciplinaryAction } from "@nutela/models/workforce/employee-profiles";
import { LoadApprovedDataDisciplinaryAction, showEditorDisciplinaryAction, showViewerDisciplinaryAction, getDisciplinaryActionApprovedData, ShowViewerDisciplinaryAction } from "../../../store/employee-detailed-area";
import { Title } from "@angular/platform-browser";
// import { DisciplinaryActionViewerComponent } from "./disciplinary-actions-viewer/disciplinary-actions-viewer.component";


@Component({
  selector: 'x365-fm-workforce-hr-disciplinary-actions',
  templateUrl: './hr-disciplinary-actions.component.html',
  styleUrls: ['./hr-disciplinary-actions.component.scss']
})
export class HrDisciplinaryActionsComponent implements OnInit {

  // @ViewChild('viewer') viewer: DisciplinaryActionViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IDisciplinaryAction[]>;
  public awaitingApprovalData$: Observable<IDisciplinaryAction[]>;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR Disciplinary Actions'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataDisciplinaryAction({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDisciplinaryAction));
    this.showViewer$ = this.store.pipe(select(showViewerDisciplinaryAction));

    this.approvedData$ = this.store.pipe(select(getDisciplinaryActionApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingEditIconClicked(rowId: number) {

  }

  // onApprovedViewIconClicked(rowId: number) {
  //   this.viewer.data = null;

  //   this.approvedData$.subscribe(
  //     (data: IDisciplinaryAction[]) => {
  //       const index = data.findIndex(row => row.issue_to_employee_id === rowId);
  //       this.viewer.data = data[index];

  //       this.store.dispatch(new ShowViewerDisciplinaryAction());
  //     }
  //   );
  // }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
