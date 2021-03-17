import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { LibraryLoadObjectivesEditorService } from './library-load-objectives-editor.service';
import { IPerformanceState } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ILibraryObjective, IPerspective } from '@nutela/models/talent/performance';
import * as constants from '../../../constants/common';
import { isProcessingLibraryLoadObjectives, ProcessingLibraryLoadObjectives, SaveLibraryLoadObjectives, LoadLibraryPlanlist, LoadLibraryPerspectiveList, LoadLibraryAnalysisList, LoadLibraryAnalysisDetList, LoadLibraryPositionList, LoadLibraryDesignationList, LoadLibraryGradeList, LoadLibraryEmployeeList, getPerspectListLibraryLoadObjectives, getAnalysisListLibraryLoadObjectives, getAnalysisDetListLibraryLoadObjectives, getPositionListLibraryLoadObjectives, getDesignationListLibraryLoadObjectives, getGradeListLibraryLoadObjectives, getEmployeeListLibraryLoadObjectives, CreateLibraryLoadObjectives } from '../../../store';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';


@Component({
  selector: 'x365-fm-talent-library-load-objectives-editor',
  templateUrl: './library-load-objectives-editor.component.html',
  styleUrls: ['./library-load-objectives-editor.component.scss'],
  providers: [LibraryLoadObjectivesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
}) 
export class LibraryLoadObjectivesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {
  
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public filename: string;
  @Output() cancelClick = new EventEmitter<any>();

  eligibiltyRule: any;
  isProcessing$: Observable<boolean>;


  perspectiveList$: Observable<IPerspective[]>;
  analysisList$: Observable<IAnalysis[]>;
  analysisDetList$: Observable<IAnalysisDetail[]>;
  positionList$: Observable<IPosition[]>;
  designationList$: Observable<IDesignation[]>;
  gradeList$: Observable<IGrade[]>;
  employeeList$: Observable<IPersonal[]>;


  targetTypeOptions = constants.targetTypeOptions;
  visibilityOptions = constants.visibilityOptions;
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  ELIGIBILITY_CONSTANTS = constants.ELIGIBILITY_CONSTANTS;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: LibraryLoadObjectivesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }



  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadLibraryPlanlist());

    this.store.dispatch(new LoadLibraryPerspectiveList());
    this.store.dispatch(new LoadLibraryAnalysisList());
    this.store.dispatch(new LoadLibraryAnalysisDetList());
    this.store.dispatch(new LoadLibraryPositionList());
    this.store.dispatch(new LoadLibraryDesignationList());
    this.store.dispatch(new LoadLibraryGradeList());
    this.store.dispatch(new LoadLibraryEmployeeList());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLibraryLoadObjectives));

    this.perspectiveList$ = this.store.pipe(select(getPerspectListLibraryLoadObjectives));
    this.analysisList$ = this.store.pipe(select(getAnalysisListLibraryLoadObjectives));
    this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListLibraryLoadObjectives));
    this.positionList$ = this.store.pipe(select(getPositionListLibraryLoadObjectives));
    this.designationList$ = this.store.pipe(select(getDesignationListLibraryLoadObjectives));
    this.gradeList$ = this.store.pipe(select(getGradeListLibraryLoadObjectives));
    this.employeeList$ = this.store.pipe(select(getEmployeeListLibraryLoadObjectives));
  }


  inEditMode(){}

  onCancel() {
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onAnalysisSelect($event){}

  onAnalysisDetSelect($event){}

  onEligibilityRuleSelected(data){
    this.eligibiltyRule = data.value;
  }

  onSubmit(){
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLibraryLoadObjectives());
      this.store.dispatch(new CreateLibraryLoadObjectives({objectiveData: <ILibraryObjective>this.fs.value}));

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
