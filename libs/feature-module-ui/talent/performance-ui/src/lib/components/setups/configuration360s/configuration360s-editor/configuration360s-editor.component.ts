import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Configuration360sEditorService } from './configuration360s-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IConfiguration360, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingConfiguration360, ProcessingConfiguration360, SaveConfiguration360, AddConfiguration360, LoadAnalysisListConfiguration360, LoadAnalysisDetListConfiguration360, LoadPositionListConfiguration360, LoadDesignationListConfiguration360, LoadGradeListConfiguration360, LoadEmployeeListConfiguration360, getAnalysisListConfiguration360, getAnalysisDetListConfiguration360, getPositionListConfiguration360, getDesignationListConfiguration360, getGradeListConfiguration360, getEmployeeListConfiguration360, LoadPlanListConfiguration360, getPlanListConfiguration360 } from '../../../../store';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-configuration360s-editor',
  templateUrl: './configuration360s-editor.component.html',
  styleUrls: ['./configuration360s-editor.component.scss'],
  providers: [Configuration360sEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class Configuration360sEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IConfiguration360; 

  @Output() cancelClick = new EventEmitter<any>();
  @ViewChild('analysisDetailLookup') analysisDetailLookup: DxLookupComponent; 
  isProcessing$: Observable<boolean>;
  analysisList$: Observable<IAnalysis[]>;
  analysisDetList$: Observable<IAnalysisDetail[]>;
  positionList$: Observable<ISelectOption[]>;
  designationList$: Observable<IDesignation[]>;
  gradeList$: Observable<IGrade[]>;
  employeeList$: Observable<IPersonal[]>;
  planList$: Observable<IPlan[]>;
  eligibiltyRule: any;
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  ELIGIBILITY_CONSTANTS = constants.ELIGIBILITY_CONSTANTS;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: Configuration360sEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadAnalysisListConfiguration360());
    this.store.dispatch(new LoadPositionListConfiguration360());
    this.store.dispatch(new LoadDesignationListConfiguration360());
    this.store.dispatch(new LoadGradeListConfiguration360());
    this.store.dispatch(new LoadEmployeeListConfiguration360());
    this.store.dispatch(new LoadPlanListConfiguration360());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingConfiguration360));
    this.analysisList$ = this.store.pipe(select(getAnalysisListConfiguration360));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListConfiguration360));
    this.positionList$ = this.store.pipe(select(getPositionListConfiguration360));
    this.designationList$ = this.store.pipe(select(getDesignationListConfiguration360));
    this.gradeList$ = this.store.pipe(select(getGradeListConfiguration360));
    this.employeeList$ = this.store.pipe(select(getEmployeeListConfiguration360));
    this.planList$ = this.store.pipe(select(getPlanListConfiguration360));
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
      this.store.dispatch(new LoadAnalysisDetListConfiguration360(data.value));
    }
  }

  onSubmit(){
    this.validateNumberFields();
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingConfiguration360());
        this.store.dispatch(new SaveConfiguration360({data: <IConfiguration360>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingConfiguration360());
        this.store.dispatch(new AddConfiguration360({data: <IConfiguration360>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    // this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  validateNumberFields(){
    if(!this.fs.externalWeight.value){
      this.fs.externalWeight.setValue(0);
    }
    if(!this.fs.leadershipWeight.value){
      this.fs.leadershipWeight.setValue(0);
    }
    if(!this.fs.peerWeight.value){
      this.fs.peerWeight.setValue(0);
    }
  }
  
  ngOnDestroy() {
  }

} 
