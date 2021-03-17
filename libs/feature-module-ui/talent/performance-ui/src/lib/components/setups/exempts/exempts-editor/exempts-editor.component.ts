import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ExemptsEditorService } from './exempts-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IExempt, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingExempt, ProcessingExempt, SaveExempt, AddExempt, getExemptPlanList, LoadPlanListExempt, LoadAnalysisListExempt, LoadPositionListExempt, LoadDesignationListExempt, LoadGradeListExempt, LoadEmployeeListExempt, getAnalysisListExempt, getAnalysisDetListExempt, getPositionListExempt, getDesignationListExempt, getGradeListExempt, getEmployeeListExempt, LoadAnalysisDetListExempt } from '../../../../store';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-exempts-editor',
  templateUrl: './exempts-editor.component.html',
  styleUrls: ['./exempts-editor.component.scss'],
  providers: [ExemptsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ExemptsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IExempt;

  @Output() cancelClick = new EventEmitter<any>();
  @ViewChild('analysisDetailLookup') analysisDetailLookup: DxLookupComponent; 

  isProcessing$: Observable<boolean>;
  planList$: Observable<IPlan[]>;
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

  constructor(public utilService: UtilService, public fs: ExemptsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanListExempt());
    this.store.dispatch(new LoadAnalysisListExempt());
    this.store.dispatch(new LoadPositionListExempt());
    this.store.dispatch(new LoadDesignationListExempt());
    this.store.dispatch(new LoadGradeListExempt());
    this.store.dispatch(new LoadEmployeeListExempt());
    
  }

  storeSelects() {
    this.planList$ = this.store.pipe(select(getExemptPlanList));
    this.isProcessing$ = this.store.pipe(select(isProcessingExempt));

    this.analysisList$ = this.store.pipe(select(getAnalysisListExempt));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListExempt));
    this.positionList$ = this.store.pipe(select(getPositionListExempt));
    this.designationList$ = this.store.pipe(select(getDesignationListExempt));
    this.gradeList$ = this.store.pipe(select(getGradeListExempt));
    this.employeeList$ = this.store.pipe(select(getEmployeeListExempt));
  }


  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onEligibilityRuleSelected(data){
    this.eligibiltyRule = data.value;
  }

  loadAnalysisDetail(data){
    if(data){
      this.analysisDetailLookup.instance.reset();
      this.store.dispatch(new LoadAnalysisDetListExempt(data.value));
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      console.log('exempt form', this.fs.value);
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingExempt());
        this.store.dispatch(new SaveExempt({data: <IExempt>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingExempt());
        this.store.dispatch(new AddExempt({data: <IExempt>this.fs.value }));
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
