import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataSeparation, showEditorSeparation, showViewerSeparation, getSeparationApprovedData, ShowViewerSeparation } from '../../../store/employee-detailed-area';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { HrSeparationViewerComponent } from './hr-separation-viewer/hr-separation-viewer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-separate-data',
  templateUrl: './hr-separate-data.component.html',
  styleUrls: ['./hr-separate-data.component.scss']
})
export class HrSeparateDataComponent implements OnInit {
 @ViewChild('viewer') viewer: HrSeparationViewerComponent;

  @Input() employeeId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<ISeparation[]>;
  public awaitingApprovalData$: Observable<ISeparation[]>;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,) {
    titleService.setTitle(
      `${'HR Separation Data'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataSeparation({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSeparation));
    this.showViewer$ = this.store.pipe(select(showViewerSeparation));

    this.approvedData$ = this.store.pipe(select(getSeparationApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingApprovalEditIconClicked(rowId: number) {

  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.approvedData$.subscribe(
      (data: ISeparation[]) => {
        const index = data.findIndex(row => row.separation_id === rowId);
        this.viewer.data = data[index];

        this.store.dispatch(new ShowViewerSeparation());
      }
    );
  }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
