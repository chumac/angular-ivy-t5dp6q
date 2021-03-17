import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ObjectiveMasterEditorService } from './objective-master-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, LoadWeightBalance, getWeightBalance, ProcessingManageObjectives, SaveManageObjectives, EditManageObjectives, isProcessingManageObjectives, EditFromApprovalManageObjectives, SaveFromApprovalManageObjectives, LoadWeightBalanceLM, getLMWeightBalance } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IPerspective, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import { DxLookupComponent } from 'devextreme-angular';
import * as constants from '../../../constants';
import { performanceShowExtendedObjectiveFields } from '@nutela/store/modules/foundation';


@Component({
  selector: 'x365-fm-talent-objective-master-editor',
  templateUrl: './objective-master-editor.component.html',
  styleUrls: ['./objective-master-editor.component.scss'],
  providers: [ObjectiveMasterEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ObjectiveMasterEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public perspectiveList: IPerspective;
  @Input() public planID: number;
  @Input() public approvalData: any[];
  @ViewChild('perspectiveLookup') plansLookup: DxLookupComponent; 

  

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  perspectiveWeightBalance$: Observable<string>;

  //Sys Options
  performanceShowExtendedObjectiveFields$: Observable<string>;



  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  targetTypeOptions = constants.targetTypeOptions;
  visibilityOptions = constants.visibilityOptions;
  targetTypeConstants = constants.TARGET_TYPE_CONSTANTS;


   constructor(public utilService: UtilService, public fs: ObjectiveMasterEditorService, private store: Store<IPerformanceState>) { 
    super();
  }


  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {    
    if(this.inApprovalMode()){
      console.log('APR');
      this.isProcessing$ = this.store.pipe(select(isProcessingManageObjectives));
      this.perspectiveWeightBalance$ = this.store.pipe(select(getLMWeightBalance));
    } else {
      console.log('MST');
      this.isProcessing$ = this.store.pipe(select(isProcessingManageObjectives));
      this.perspectiveWeightBalance$ = this.store.pipe(select(getWeightBalance));
    }

    // Sys Option
    this.performanceShowExtendedObjectiveFields$ = this.store.pipe(select(performanceShowExtendedObjectiveFields));    

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  
  inApprovalMode(): boolean {
    if(Array.isArray(this.approvalData)){
      return true;
    } else {
      return false;
    }
  }

  onCancel() { 
    this.reset();
    this.cancelClick.emit();
  }

  onPerspectiveSelect(data){
    if(data.value){
      
      if(this.inApprovalMode()){
        console.log('APR');
        this.store.dispatch(new LoadWeightBalanceLM({perspectiveId: data.value, planId: this.planID, employeeId: this.approvalData['employee_id']}));

      } else {
        console.log('MST');
        this.store.dispatch(new LoadWeightBalance({perspectiveId: data.value, planId: this.planID}));

      }

    }
  }

  onSubmit(){
    if(this.inApprovalMode()){
      console.log('APR');
      this.approvalSubmit();
    } else {
      console.log('MST');
      this.submit();
    }
  }

  approvalSubmit(){
    if (this.fs.valid) {
      this.fs.planID.setValue(this.planID);
      if(this.data){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingManageObjectives());
        this.store.dispatch(new EditFromApprovalManageObjectives({objectiveData: <IObjectiveMasterDto>this.fs.value, recordId: recordId, editMode: this.inEditMode(), planID: this.planID, approvalInfo: this.approvalData}));
      } else {
        const recordId = 0;
        this.store.dispatch(new ProcessingManageObjectives());
        this.store.dispatch(new SaveFromApprovalManageObjectives({objectiveData: <IObjectiveMasterDto>this.fs.value, recordId: recordId, editMode: this.inEditMode(), approvalInfo: this.approvalData}));

      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  submit(){
    if (this.fs.valid) {
      
      this.fs.planID.setValue(this.planID);

      if(this.data){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingManageObjectives());
        this.store.dispatch(new EditManageObjectives({objectiveData: <IObjectiveMasterDto>this.fs.value, recordId: recordId, editMode: this.inEditMode(), planID: this.planID}));
      } else {
        const recordId = 0;
        this.store.dispatch(new ProcessingManageObjectives());
        this.store.dispatch(new SaveManageObjectives({objectiveData: <IObjectiveMasterDto>this.fs.value, recordId: recordId, editMode: this.inEditMode(), planId: this.planID}));

      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

}
 