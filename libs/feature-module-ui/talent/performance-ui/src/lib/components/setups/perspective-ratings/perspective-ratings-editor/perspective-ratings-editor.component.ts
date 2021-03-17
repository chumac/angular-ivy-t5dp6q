import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { PerspectiveRatingsEditorService } from './perspective-ratings-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPerspectiveRating, IPerspective } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingPerspectiveRating, ProcessingPerspectiveRating, SavePerspectiveRating, AddPerspectiveRating, LoadAnalysisListPerspectiveRating, LoadAnalysisDetListPerspectiveRating, LoadPositionListPerspectiveRating, LoadDesignationListPerspectiveRating, LoadGradeListPerspectiveRating, LoadEmployeeListPerspectiveRating, getAnalysisListPerspectiveRating, getAnalysisDetListPerspectiveRating, getPositionListPerspectiveRating, getDesignationListPerspectiveRating, getGradeListPerspectiveRating, getEmployeeListPerspectiveRating, getPerspectiveRatingPerspectiveList, LoadPerspectiveListPerspectiveRating } from '../../../../store';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-perspective-ratings-editor',
  templateUrl: './perspective-ratings-editor.component.html',
  styleUrls: ['./perspective-ratings-editor.component.scss'],
  providers: [PerspectiveRatingsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PerspectiveRatingsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPerspectiveRating;
  @Input() public perspectiveId: number;
  @ViewChild('analysisDetailLookup') analysisDetailLookup: DxLookupComponent; 
  @ViewChild('perspectiveLookup') perspectiveLookup: DxLookupComponent;


  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  perspectiveList$: Observable<IPerspective[]>;
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
    if(changes['show'] && (this.show === true)) {
      this.fs.perpesctiveId.setValue(this.perspectiveId);
    }
  }

  constructor(public utilService: UtilService, public fs: PerspectiveRatingsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPerspectiveListPerspectiveRating());
    this.store.dispatch(new LoadAnalysisListPerspectiveRating());
    // this.store.dispatch(new LoadAnalysisDetListPerspectiveRating());
    this.store.dispatch(new LoadPositionListPerspectiveRating());
    this.store.dispatch(new LoadDesignationListPerspectiveRating());
    this.store.dispatch(new LoadGradeListPerspectiveRating());
    this.store.dispatch(new LoadEmployeeListPerspectiveRating());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPerspectiveRating));
    this.perspectiveList$ = this.store.pipe(select(getPerspectiveRatingPerspectiveList));
    this.analysisList$ = this.store.pipe(select(getAnalysisListPerspectiveRating));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListPerspectiveRating));
    this.positionList$ = this.store.pipe(select(getPositionListPerspectiveRating));
    this.designationList$ = this.store.pipe(select(getDesignationListPerspectiveRating));
    this.gradeList$ = this.store.pipe(select(getGradeListPerspectiveRating));
    this.employeeList$ = this.store.pipe(select(getEmployeeListPerspectiveRating));
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
      this.store.dispatch(new LoadAnalysisDetListPerspectiveRating(data.value));
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingPerspectiveRating());
        this.store.dispatch(new SavePerspectiveRating({data: <IPerspectiveRating>this.fs.value, recordId: recordId, editMode: this.inEditMode(), persepectiveId: this.perspectiveId }));
      } else {
        this.store.dispatch(new ProcessingPerspectiveRating());
        this.store.dispatch(new AddPerspectiveRating({data: <IPerspectiveRating>this.fs.value, persepectiveId: this.perspectiveId }));
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
