import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectiveMasterDto, IPlan } from '@nutela/models/talent/performance';
import { IPerformanceState, getLmManageObjectivesObjectiveMasterData, isProcessingLmManageObjectives, getPlanListLmManageObjectives, LoadPlanlistLmManageObjectives, getEmployeeListLmManageObjectives, LoadEmployeelistLmManageObjectives, LoadObjectiveMasterDataLmManageObjectives, ProcessingLmManageObjectives, SetLMStatusProgressDefinition, SetSelectedEmployeeId, LoadPreScoredObjectiveMasterDataLmManageObjectives, getLmManageObjectivesPreScoredObjectiveMasterData, showViewerManageObjectives, ShowViewerManageObjectives, HideViewerManageObjectives, ResetComponentsLmManageObjectives } from '../../../store';
import { Store, select } from '@ngrx/store';
import { IPersonal, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getSelectOptionData, getActivePersonnel } from '@nutela/store/modules/foundation';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import { Router } from '@angular/router';
import * as constants from '../../../constants';
import { SwitchComponent } from '@nutela/shared/ui';
import { ObjectiveMasterViewerComponent } from '../../common/objective-master-viewer/objective-master-viewer.component';

@Component({
  selector: 'x365-fm-talent-lm-manage-objectives',
  templateUrl: './lm-manage-objectives.component.html',
  styleUrls: ['./lm-manage-objectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class LmManageObjectivesComponent implements OnInit, OnDestroy {
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isProcessingDataGrid$: Observable<boolean>;
  objectivesMasterData$: Observable<IObjectiveMasterDto[]>;
  preScoredObjectivesMasterData$: Observable<IObjectiveMasterDto[]>;
  planlist$: Observable<IPlan[]>;
  employeelist$: Observable<IPersonal[]>;
  comprehensiveData$: Observable<IComprehensiveData>;
  @ViewChild('viewer') viewer: ObjectiveMasterViewerComponent;
  @ViewChild('employeeId') employeeId:ElementRef;
  @ViewChild('plansLookup') plansLookup: DxLookupComponent;
  @ViewChild('employeesLookup') employeesLookup: DxLookupComponent;
  @ViewChild('switch') switch: SwitchComponent;
  
  constructor(private store: Store<IPerformanceState>, private router: Router) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanlistLmManageObjectives());
    this.store.dispatch(new LoadEmployeelistLmManageObjectives({ planId: null, employeeId: null}));

  }

  storeSelects() {
    this.showViewer$ = this.store.pipe(select(showViewerManageObjectives));
    this.isProcessing$ = this.store.pipe(select(isProcessingLmManageObjectives));
    this.objectivesMasterData$ = this.store.pipe(select(getLmManageObjectivesObjectiveMasterData));
    this.preScoredObjectivesMasterData$ = this.store.pipe(select(getLmManageObjectivesPreScoredObjectiveMasterData));
    this.planlist$ = this.store.pipe(select(getPlanListLmManageObjectives));
    this.employeelist$ = this.store.pipe(select(getEmployeeListLmManageObjectives));
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
  }

  onPlanSelect($event) {
    // const emplyId = this.employeeId.nativeElement.value;
    // this.store.dispatch(new LoadEmployeelistLmManageObjectives({ planId: $event.value, employeeId: emplyId}));
    // console.log('plan : ', $event, 'data', this.employeeId.nativeElement.value);
  }

  onEmployeeSelect($event) {
    if(this.plansLookup.value){
      this.store.dispatch(new ProcessingLmManageObjectives());
      this.store.dispatch(new LoadObjectiveMasterDataLmManageObjectives({ planId: this.plansLookup.value, employeeId: $event.value}));
      this.store.dispatch(new LoadPreScoredObjectiveMasterDataLmManageObjectives({ planId: this.plansLookup.value, employeeId: $event.value}));

    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onViewIconClicked(rowId: number) {
    if(this.plansLookup.value){
      this.viewer.data = null;
  
      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.viewer.data = result;
            this.store.dispatch(new ShowViewerManageObjectives());
          }
        );
      }else{
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
      }
  }

  onViewPreScoredIconClicked(rowId: number) {
    if(this.plansLookup.value){
      this.viewer.data = null;
  
      this.getPreScoredRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.viewer.data = result;
            this.store.dispatch(new ShowViewerManageObjectives());
          }
        );
      }else{
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
      }
  }

  getRowData$(rowId: number): Observable<IObjectiveMasterDto> {
    return this.objectivesMasterData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getPreScoredRowData$(rowId: number): Observable<IObjectiveMasterDto> {
    return this.preScoredObjectivesMasterData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onProgressIconClicked(id: number) {
    if(this.employeesLookup.value){
      this.store.dispatch(new SetLMStatusProgressDefinition({ status: true }));
      this.store.dispatch(new SetSelectedEmployeeId({ employeeId: this.employeesLookup.value }));
      this.router.navigate([constants.MANAGE_OBJECTIVES_URLs.progressReportUrl, id], { skipLocationChange: false });
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select an employee', options: toastOptionsError()}))
    }
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerManageObjectives());
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentsLmManageObjectives());
  }

}
