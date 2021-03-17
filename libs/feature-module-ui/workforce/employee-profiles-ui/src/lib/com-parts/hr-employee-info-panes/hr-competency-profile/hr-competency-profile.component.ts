import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ICompetencyProfile } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store';
import { LoadApprovedDataCompetencyProfile, showEditorCompetencyProfile, showViewerCompetencyProfile, getCompetencyProfileApprovedData, ShowViewerCompetencyProfile } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';
//import { CompetencyProfileViewerComponent } from './competency-profile-viewer/competency-profile-viewer.component';


@Component({
  selector: 'x365-fm-workforce-hr-competency-profile',
  templateUrl: './hr-competency-profile.component.html',
  styleUrls: ['./hr-competency-profile.component.scss']
})
export class HrCompetencyProfileComponent implements OnInit {

  @Input() employeeId: number;

 // @ViewChild('viewer') viewer: CompetencyProfileViewerComponent;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  public approvedData$: Observable<ICompetencyProfile[]>;
  public awaitingApprovalData$: Observable<ICompetencyProfile[]>;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR Competency Profile'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataCompetencyProfile({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCompetencyProfile));
    this.showViewer$ = this.store.pipe(select(showViewerCompetencyProfile));

    this.approvedData$ = this.store.pipe(select(getCompetencyProfileApprovedData));
  }

  onApprovedEditIconClicked(rowId: number) {

  }

  onAwaitingEditIconClicked(rowId: number) {

  }

  // onApprovedViewIconClicked(rowId: number) {
  //   this.viewer.data = null;

  //   this.approvedData$.subscribe(
  //     (data: ICompetencyProfile[]) => {
  //       const index = data.findIndex(row => row.skill_id === rowId);
  //       this.viewer.data = data[index];

  //       this.store.dispatch(new ShowViewerCompetencyProfile());
  //     }
  //   );
  // }

  onAwaitingApprovalViewIconClicked(row: number) {

  }
}
