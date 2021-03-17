
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataConfirmationInformation, showEditorConfirmationInformation, showViewerConfirmationInformation, getConfirmationInformationApprovedData, ShowViewerConfirmationInformation } from '../../../store/employee-detailed-area';
import { IConfirmationInformation } from '@nutela/models/workforce/employee-profiles';
import { Title } from '@angular/platform-browser';
// import { ConfirmationInformationViewerComponent } from './confirmation-information-viewer/confirmation-information-viewer.component';


@Component({
  selector: 'x365-fm-workforce-hr-confirmation-information',
  templateUrl: './hr-confirmation-information.component.html',
  styleUrls: ['./hr-confirmation-information.component.scss']
})
export class HrConfirmationInformationComponent implements OnInit {

  // @ViewChild('viewer') viewer: ConfirmationInformationViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<IConfirmationInformation[]>;
  public awaitingApprovalData$: Observable<IConfirmationInformation[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Confirmation Information'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataConfirmationInformation({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorConfirmationInformation));
    this.showViewer$ = this.store.pipe(select(showViewerConfirmationInformation));

    this.approvedData$ = this.store.pipe(select(getConfirmationInformationApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  // onApprovedViewIconClicked(rowId: number) {
  //   this.viewer.data = null;

  //   this.approvedData$.subscribe(
  //     (data: IConfirmationInformation[]) => {
  //       const index = data.findIndex(row => row.employee_id === rowId);
  //       this.viewer.data = data[index];

  //       this.store.dispatch(new ShowViewerConfirmationInformation());
  //     }
  //   );
  // }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
