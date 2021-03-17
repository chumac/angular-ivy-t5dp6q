import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { WorkflowDefinitionsEditorService } from './workflow-definitions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingWorkflowDefinition, ProcessingWorkflowDefinition, SaveWorkflowDefinition, AddWorkflowDefinition, getAnalysisListWorkflowDefinition, getAnalysisDetListWorkflowDefinition, getPositionListWorkflowDefinition, getDesignationListWorkflowDefinition, getGradeListWorkflowDefinition, getEmployeeListWorkflowDefinition, LoadAnalysisListWorkflowDefinition, LoadAnalysisDetListWorkflowDefinition, LoadPositionListWorkflowDefinition, LoadDesignationListWorkflowDefinition, LoadGradeListWorkflowDefinition, LoadEmployeeListWorkflowDefinition } from '../../../../store';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-workflow-definitions-editor',
  templateUrl: './workflow-definitions-editor.component.html',
  styleUrls: ['./workflow-definitions-editor.component.scss'],
  providers: [WorkflowDefinitionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class WorkflowDefinitionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowDefinition;

  @Output() cancelClick = new EventEmitter<any>();
  @ViewChild('analysisDetailLookup') analysisDetailLookup: DxLookupComponent; 
  isProcessing$: Observable<boolean>;
  analysisList$: Observable<IAnalysis[]>;
  analysisDetList$: Observable<IAnalysisDetail[]>;
  positionList$: Observable<IPosition[]>;
  designationList$: Observable<IDesignation[]>;
  gradeList$: Observable<IGrade[]>;
  employeeList$: Observable<IPersonal[]>;

  eligibiltyRule: any;
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  ELIGIBILITY_CONSTANTS = constants.ELIGIBILITY_CONSTANTS;
  

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: WorkflowDefinitionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadAnalysisListWorkflowDefinition());
    // this.store.dispatch(new LoadAnalysisDetListWorkflowDefinition());
    this.store.dispatch(new LoadPositionListWorkflowDefinition());
    this.store.dispatch(new LoadDesignationListWorkflowDefinition());
    this.store.dispatch(new LoadGradeListWorkflowDefinition());
    this.store.dispatch(new LoadEmployeeListWorkflowDefinition());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingWorkflowDefinition));
    this.analysisList$ = this.store.pipe(select(getAnalysisListWorkflowDefinition));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListWorkflowDefinition));
    this.positionList$ = this.store.pipe(select(getPositionListWorkflowDefinition));
    this.designationList$ = this.store.pipe(select(getDesignationListWorkflowDefinition));
    this.gradeList$ = this.store.pipe(select(getGradeListWorkflowDefinition));
    this.employeeList$ = this.store.pipe(select(getEmployeeListWorkflowDefinition));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onEligibilityRuleSelected(data){
    this.eligibiltyRule = data.value;
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  loadAnalysisDetail(data){
    if(data){
      this.analysisDetailLookup.instance.reset();
      this.store.dispatch(new LoadAnalysisDetListWorkflowDefinition(data.value));
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingWorkflowDefinition());
        this.store.dispatch(new SaveWorkflowDefinition({data: <IWorkflowDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingWorkflowDefinition());
        this.store.dispatch(new AddWorkflowDefinition({data: <IWorkflowDefinition>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
