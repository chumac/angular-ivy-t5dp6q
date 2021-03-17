import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { RoleWeightsEditorService } from './role-weights-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IRoleWeight } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingRoleWeight, ProcessingRoleWeight, SaveRoleWeight, AddRoleWeight, LoadAnalysisListRoleWeight, LoadAnalysisDetListRoleWeight, LoadPositionListRoleWeight, LoadDesignationListRoleWeight, LoadGradeListRoleWeight, LoadEmployeeListRoleWeight, getAnalysisListRoleWeight, getAnalysisDetListRoleWeight, getPositionListRoleWeight, getDesignationListRoleWeight, getGradeListRoleWeight, getEmployeeListRoleWeight } from '../../../../store';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-talent-role-weights-editor',
  templateUrl: './role-weights-editor.component.html',
  styleUrls: ['./role-weights-editor.component.scss'],
  providers: [RoleWeightsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RoleWeightsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRoleWeight; 

  @Output() cancelClick = new EventEmitter<any>();
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

  constructor(public utilService: UtilService, public fs: RoleWeightsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadAnalysisListRoleWeight());
    this.store.dispatch(new LoadAnalysisDetListRoleWeight());
    this.store.dispatch(new LoadPositionListRoleWeight());
    this.store.dispatch(new LoadDesignationListRoleWeight());
    this.store.dispatch(new LoadGradeListRoleWeight());
    this.store.dispatch(new LoadEmployeeListRoleWeight());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRoleWeight));
    this.analysisList$ = this.store.pipe(select(getAnalysisListRoleWeight));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListRoleWeight));
    this.positionList$ = this.store.pipe(select(getPositionListRoleWeight));
    this.designationList$ = this.store.pipe(select(getDesignationListRoleWeight));
    this.gradeList$ = this.store.pipe(select(getGradeListRoleWeight));
    this.employeeList$ = this.store.pipe(select(getEmployeeListRoleWeight));
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

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingRoleWeight());
        this.store.dispatch(new SaveRoleWeight({data: <IRoleWeight>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingRoleWeight());
        this.store.dispatch(new AddRoleWeight({data: <IRoleWeight>this.fs.value }));
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
