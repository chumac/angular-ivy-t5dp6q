import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { FormTemplatesEditorService } from './form-templates-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IFormTemplate } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingFormTemplate, ProcessingFormTemplate, SaveFormTemplate, AddFormTemplate, LoadAnalysisListFormTemplate, LoadAnalysisDetListFormTemplate, LoadPositionListFormTemplate, LoadDesignationListFormTemplate, LoadGradeListFormTemplate, LoadEmployeeListFormTemplate, getAnalysisListFormTemplate, getAnalysisDetListFormTemplate, getPositionListFormTemplate, getDesignationListFormTemplate, getGradeListFormTemplate, getEmployeeListFormTemplate } from '../../../../store';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-form-templates-editor',
  templateUrl: './form-templates-editor.component.html',
  styleUrls: ['./form-templates-editor.component.scss'],
  providers: [FormTemplatesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FormTemplatesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFormTemplate; 

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

  constructor(public utilService: UtilService, public fs: FormTemplatesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadAnalysisListFormTemplate());
    this.store.dispatch(new LoadPositionListFormTemplate());
    this.store.dispatch(new LoadDesignationListFormTemplate());
    this.store.dispatch(new LoadGradeListFormTemplate());
    this.store.dispatch(new LoadEmployeeListFormTemplate());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFormTemplate));
    this.analysisList$ = this.store.pipe(select(getAnalysisListFormTemplate));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListFormTemplate));
    this.positionList$ = this.store.pipe(select(getPositionListFormTemplate));
    this.designationList$ = this.store.pipe(select(getDesignationListFormTemplate));
    this.gradeList$ = this.store.pipe(select(getGradeListFormTemplate));
    this.employeeList$ = this.store.pipe(select(getEmployeeListFormTemplate));
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
      this.store.dispatch(new LoadAnalysisDetListFormTemplate(data.value));
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingFormTemplate());
        this.store.dispatch(new SaveFormTemplate({data: <IFormTemplate>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingFormTemplate());
        this.store.dispatch(new AddFormTemplate({data: <IFormTemplate>this.fs.value }));
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

  ngOnDestroy() {
  }

} 
