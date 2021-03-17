import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import {from} from 'rxjs'; 
import * as XLSX from 'xlsx';
import { IPerformanceState, LoadPlanlistLoadObjectives, getLoadObjectivesPlanList, ObjectiveExists, objectiveExistsLoadObjectives, ShowEditorLoadObjectives, showEditorLoadObjectives, HideEditorLoadObjectives, UploadObjectives, getLoadObjectivesObjectiveData, HideViewerLoadObjectives, showViewerLoadObjectives, ShowViewerLoadObjectives, DeleteObjectiveDataLoadObjectives, isProcessingDataGridLoadObjectives, ProcessingDataGridLoadObjectives, ValidateObjectives, ResetObjectiveDataLoadObjectives, LoadPlanlistManageObjectives, getManageObjectivesPlanList, LoadObjectiveMasterDataManageObjectives, showEditorManageObjectives, ShowEditorManageObjectives, HideEditorManageObjectives, LoadPerspectivelistManageObjectives, getManageObjectivesPerspectiveList, HideRecallManageObjectives, showRecallManageObjectives, ShowRecallManageObjectives, getManageObjectivesObjectiveMasterData, SubmitManageObjectives, DeleteObjectiveDataManageObjectives, showViewerManageObjectives, ShowViewerManageObjectives, ProcessingDataGridManageObjectives, isProcessingDataGridManageObjectives, ResetComponentManageObjectives, addBtnManageObjectives, recallBtnManageObjectives, progressBtnManageObjectives, deleteBtnManageObjectives, viewBtnManageObjectives, editBtnManageObjectives, submitBtnManageObjectives, DeleteAllObjectiveDataManageObjectives, getManageObjectivesInfo, resetBtnManageObjectives, HideViewerManageObjectives, SetLMStatusProgressDefinition, LoadPreScoredObjectiveMasterDataManageObjectives, getManageObjectivesPreScoredObjectiveMasterData } from '../../../store';
import { IObjectiveDto, IPlan, IPerspective, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { UtilService,  toastOptionsError, formatDate } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { ObjectiveViewerComponent } from '../../common/objective-viewer/objective-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IgxGridComponent } from 'igniteui-angular';
import { ObjectiveMasterEditorComponent } from '../../common/objective-master-editor/objective-master-editor.component';
import { ObjectiveRecallComponent } from '../../common/objective-recall/objective-recall.component';
import { ObjectiveMasterViewerComponent } from '../../common/objective-master-viewer/objective-master-viewer.component';
import * as constants from '../../../constants';
import { take } from 'rxjs/operators';
import { SetMetadataFeedbackForm, LoadEmployeeCanProvideFeedback, getCanProvideEmployeeFeedback, getStartEmployeeFeedback, NotProcessingFeedbackForm, StartEmployeeObjectiveFeedback, ProcessingFeedbackForm, getProcessingFeedbackForm } from '../../../store/reviews/feedback-form';
import { performanceShowExtendedObjectiveFields } from '@nutela/store/modules/foundation';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-talent-manage-objectives',
  templateUrl: './manage-objectives.component.html',
  styleUrls: ['./manage-objectives.component.scss']
})
export class ManageObjectivesComponent implements OnInit {

  @ViewChild('editor') editor: ObjectiveMasterEditorComponent;
  @ViewChild('recall') recall: ObjectiveRecallComponent;
  @ViewChild('viewer') viewer: ObjectiveMasterViewerComponent;
  @ViewChild('plansLookup') plansLookup: DxLookupComponent;
  @ViewChild('objectivesDataGrid', { read: IgxGridComponent })
  public objectivesDataGrid: IgxGridComponent;

  showEditor$: Observable<boolean>;
  showRecall$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessingDataGrid$: Observable<boolean>;
  objectivesMasterData$: Observable<IObjectiveMasterDto[]>;
  preScoredobjectivesMasterData$: Observable<IObjectiveMasterDto[]>;
  planlist$: Observable<IPlan[]>;
  perspectivelist$: Observable<IPerspective[]>;
  objectiveExists$: Observable<boolean>;
  objectiveInfo$: Observable<IObjectiveMasterDto>;
  comprehensiveData$: Observable<IComprehensiveData>;

  addBtn$: Observable<boolean>;
  recallBtn$: Observable<boolean>;
  submitBtn$: Observable<boolean>;
  editBtn$: Observable<boolean>;
  viewBtn$: Observable<boolean>;
  deleteBtn$: Observable<boolean>;
  progressBtn$: Observable<boolean>;
  resetBtn$: Observable<boolean>;

  isAdding$: Observable<boolean>;
  objectiveStatus = constants.OBJECTIVE_SUBMIT_STATUS_TYPES_LABEL;
  objectiveApprovalStatus = constants.OBJECTIVE_APPROVAL_STATUS_TYPES_LABEL;

  // For feedback
  isProcessingDataFeedback$: Observable<boolean>;
  canProvideFeedback$: Observable<boolean>;
  startFeedback$: Observable<boolean>;


  constructor(private store: Store<IPerformanceState>, private dialogBoxService: DialogBoxService, public router: Router) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanlistManageObjectives());
    this.store.dispatch(new LoadPerspectivelistManageObjectives());

    // For Feedback
    this.store.dispatch(new LoadEmployeeCanProvideFeedback());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorManageObjectives));
    this.showViewer$ = this.store.pipe(select(showViewerManageObjectives));
    this.showRecall$ = this.store.pipe(select(showRecallManageObjectives));
    this.addBtn$ = this.store.pipe(select(addBtnManageObjectives));
    this.recallBtn$ = this.store.pipe(select(recallBtnManageObjectives));
    this.submitBtn$ = this.store.pipe(select(submitBtnManageObjectives));
    this.editBtn$ = this.store.pipe(select(editBtnManageObjectives));
    this.viewBtn$ = this.store.pipe(select(viewBtnManageObjectives));
    this.deleteBtn$ = this.store.pipe(select(deleteBtnManageObjectives));
    this.progressBtn$ = this.store.pipe(select(progressBtnManageObjectives));
    this.isProcessingDataGrid$ = this.store.pipe(select(isProcessingDataGridManageObjectives));
    this.objectivesMasterData$ = this.store.pipe(select(getManageObjectivesObjectiveMasterData));
    this.preScoredobjectivesMasterData$ = this.store.pipe(select(getManageObjectivesPreScoredObjectiveMasterData));
    this.planlist$ = this.store.pipe(select(getManageObjectivesPlanList));
    this.perspectivelist$ = this.store.pipe(select(getManageObjectivesPerspectiveList));
    this.objectiveExists$ = this.store.pipe(select(objectiveExistsLoadObjectives));
    this.objectiveInfo$ = this.store.pipe(select(getManageObjectivesInfo));
    this.resetBtn$ = this.store.pipe(select(resetBtnManageObjectives));
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));

    // Feedback Selects
    this.isProcessingDataFeedback$ = this.store.pipe(select(getProcessingFeedbackForm));
    this.canProvideFeedback$ = this.store.pipe(select(getCanProvideEmployeeFeedback));
    this.startFeedback$ = this.store.pipe(select(getStartEmployeeFeedback));
    
  }

  onAddButtonClicked(){
    if(this.plansLookup.value){
      this.editor.data = null;
      this.editor.reset();
      this.editor.planID = this.plansLookup.value;
      this.store.dispatch(new ShowEditorManageObjectives());
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onRecallButtonClicked(){
    if(this.plansLookup.value){
      this.recall.data = null;
      this.recall.reset();
      this.recall.planID = this.plansLookup.value;
      this.store.dispatch(new ShowRecallManageObjectives());
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onResetButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to delete all your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteAllObjectiveDataManageObjectives({recordId: null, planID: this.plansLookup.value}));
        }
      });
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onSubmitButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to submit your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new SubmitManageObjectives(this.plansLookup.value));
        }
      });
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorManageObjectives());
  }

  onCancelRecall() {
    this.store.dispatch(new HideRecallManageObjectives());
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerManageObjectives());
  }



  onEditIconClicked(rowId: number){
    if(this.plansLookup.value){
      this.editor.data = null;
      this.editor.planID = this.plansLookup.value;

      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.editor.data = result;
            this.editor.reset();
            this.store.dispatch(new ShowEditorManageObjectives());
          }
        );
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onViewIconClicked(rowId: number){
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

  onProgressIconClicked(rowId: number){
    this.store.dispatch(new SetLMStatusProgressDefinition({ status: false }));
    this.goToProgressReport(rowId);
  }

  onDeleteIconClicked(rowId: number){

    if(this.plansLookup.value){

      this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteObjectiveDataManageObjectives({recordId: rowId, planID: this.plansLookup.value}));
        }
      });

    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onPlanSelect(data){
    if(data){
      // this.store.dispatch(new ProcessingDataGridLoadObjectives());
      this.store.dispatch(new ProcessingDataGridManageObjectives());
      this.store.dispatch(new LoadObjectiveMasterDataManageObjectives(data.value));
      this.store.dispatch(new LoadPreScoredObjectiveMasterDataManageObjectives({ planId: data.value }));
    }
    
  }

  getRowData$(rowId: number): Observable<IObjectiveMasterDto> {
    return this.objectivesMasterData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getPreScoredRowData$(rowId: number): Observable<IObjectiveMasterDto> {
    return this.preScoredobjectivesMasterData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  
  goToProgressReport(id: number) {
    this.router.navigate([constants.MANAGE_OBJECTIVES_URLs.progressReportUrl, id], { skipLocationChange: false });
  }

  gotoProvideFeedback() {
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to proceed to your feedback?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ProcessingFeedbackForm());
          this.store.dispatch(new StartEmployeeObjectiveFeedback(this.plansLookup.value));
          this.startFeedback$.subscribe((start)=>{
            if(start){
              this.store.dispatch(new SetMetadataFeedbackForm({isEmp: true, isLm: false, isHr: false}));
              this.router.navigate([constants.MANAGE_OBJECTIVES_URLs.objectiveFeedbackUrl], { skipLocationChange: false });    
            }
          });
        }
      });

    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentManageObjectives());
  }

}
