import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { Observable, from } from 'rxjs';
import { IFeedbackObjectiveMaster, IFeedbackObjectiveDetail, IFeedbackRating, IFeedbackMetadata } from '@nutela/models/talent/performance';
import { UtilService } from '@nutela/core-services';
import { IPerformanceState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { LoadEmployeeObjectiveMastersFeedbackForm, getEmployeeObjectiveMasterFeedbackForm, getEmployeeInfoFeedbackForm, getEmployeeObjectiveDetailFeedbackForm, LoadEmployeeObjectiveDetailsFeedbackForm, SaveEmployeeObjectiveMastersFeedbackForm, SaveEmployeeObjectiveDetailsFeedbackForm, isLoadingMastersFeedbackForm, isLoadingDetailsFeedbackForm, getProcessingDetailsFeedbackForm, getProcessingMastersFeedbackForm, getRatingsFeedbackForm, LoadRatingsFeedbackForm, SubmitEmployeeObjectiveFeedbackForm, getSubmittingFeedbackForm, isSubmittingFeedbackForm, getMetaDataFeedbackForm, getLMObjectiveMasterFeedbackForm, getLMObjectiveDetailFeedbackForm, LoadLMObjectiveMastersFeedbackForm, LoadLMObjectiveDetailsFeedbackForm, SaveLMObjectiveMastersFeedbackForm, SaveLMObjectiveDetailsFeedbackForm, LoadHRObjectiveMastersFeedbackForm, LoadHRObjectiveDetailsFeedbackForm, getHRObjectiveMasterFeedbackForm, getHRObjectiveDetailFeedbackForm, SubmitLMObjectiveFeedbackForm, getLMObjectiveDetailAltFeedbackForm, LoadLMObjectiveDetailsAltFeedbackForm, getHRLMObjectiveDetailFeedbackForm, getHREmpObjectiveDetailFeedbackForm, LoadHREmployeeObjectiveDetailsFeedbackForm, LoadHRLineManagerObjectiveDetailsFeedbackForm, isCompletingMastersFeedbackForm, isCompletingDetailsFeedbackForm, getCompletingMastersFeedbackForm, getCompletingDetailsFeedbackForm } from '../../../store/reviews/feedback-form';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { take, map, flatMap, filter } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Router } from '@angular/router';
import * as constants from '../../../constants';
import { RoleTypes, StatusMode } from '../../../enumerations';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ObjectiveFeedbackEditorComponent } from './objective-feedback-editor/objective-feedback-editor.component';


@Component({
  selector: 'x365-objective-feedback-objective-feedback',
  templateUrl: './objective-feedback.component.html',
  styleUrls: ['./objective-feedback.component.scss']
})
export class ObjectiveFeedbackComponent implements OnInit {
  feedbackMetaData$: Observable<IFeedbackMetadata>;
  feedbackRatings$: Observable<ISelectOption[]>;
  objectiveMaster$: Observable<IFeedbackObjectiveMaster[]>;
  objectiveDetails$: Observable<IFeedbackObjectiveDetail[]>;

  hrEmpObjectiveDetails$: Observable<IFeedbackObjectiveDetail[]>; // created to augument employee details for hr 
  hrLMObjectiveDetails$: Observable<IFeedbackObjectiveDetail[]>; // created to augument line manager details for hr 
  objectiveDetailsAlt$: Observable<IFeedbackObjectiveDetail[]>; // Backend Patch Patch wahala !!!
  processingMasters$: Observable<boolean>;
  processingDetails$: Observable<boolean>;
  
  completingMasters$: Observable<boolean>;
  completingDetails$: Observable<boolean>;

  submittingObjectives$: Observable<boolean>;

  objectiveEmployeeInfo$: Observable<IPersonal>;
  roleTypes = RoleTypes;
  statusMode = StatusMode;
  isObjective: boolean = true;
  

  // Editor Section
  showEditor: boolean = false;
  @ViewChild('editor') editor: ObjectiveFeedbackEditorComponent;


  constructor(public utilService: UtilService, private dialogBoxService: DialogBoxService, private store: Store<IPerformanceState>, private location: Location, public router: Router) {
    
   }

  ngOnInit() {
    this.feedbackMetaData$ = this.store.pipe(select(getMetaDataFeedbackForm)); 
    this.performInit();
  }

  performInit(): void {
    this.feedbackMetaData$.pipe(take(1)).subscribe((metaData)=> {
      if(metaData){
        if(metaData.isEmp){
          this.employeeStoreSelects();
          this.employeeStoreDispatches(); 
        }
        if(metaData.isLm){
          this.lineManagerStoreSelects();
          this.lineManagerStoreDispatches(); 
        }
        if(metaData.isHr){
          this.hrStoreSelects(); 
          this.hrStoreDispatches(); 
        }
      }
    });
  }

  employeeStoreDispatches() {
    this.store.dispatch(new LoadRatingsFeedbackForm());

    this.store.dispatch(new LoadEmployeeObjectiveMastersFeedbackForm());
    this.store.dispatch(new LoadEmployeeObjectiveDetailsFeedbackForm());
  }
  employeeStoreSelects() {
    this.feedbackRatings$ = this.store.pipe(select(getRatingsFeedbackForm)); 
    this.processingMasters$ = this.store.pipe(select(getProcessingMastersFeedbackForm));
    this.processingDetails$ = this.store.pipe(select(getProcessingDetailsFeedbackForm));
    this.completingMasters$ = this.store.pipe(select(getCompletingMastersFeedbackForm));
    this.completingDetails$ = this.store.pipe(select(getCompletingDetailsFeedbackForm));
    this.submittingObjectives$ = this.store.pipe(select(getSubmittingFeedbackForm));
    
    this.objectiveMaster$ = this.store.pipe(select(getEmployeeObjectiveMasterFeedbackForm)); 
    this.objectiveDetails$ = this.store.pipe(select(getEmployeeObjectiveDetailFeedbackForm));
  }

  lineManagerStoreDispatches() {
    this.store.dispatch(new LoadRatingsFeedbackForm());

    this.loadLMObjectiveMastersFeedbackForm();
    this.loadLMObjectiveDetailsFeedbackForm();

    this.loadLMObjectiveDetailsAltFeedbackForm(); // Backend Patch Patch wahala !!!
  }
  lineManagerStoreSelects() {
    this.feedbackRatings$ = this.store.pipe(select(getRatingsFeedbackForm)); 
    this.processingMasters$ = this.store.pipe(select(getProcessingMastersFeedbackForm));
    this.processingDetails$ = this.store.pipe(select(getProcessingDetailsFeedbackForm));
    this.completingMasters$ = this.store.pipe(select(getCompletingMastersFeedbackForm));
    this.completingDetails$ = this.store.pipe(select(getCompletingDetailsFeedbackForm));
    this.submittingObjectives$ = this.store.pipe(select(getSubmittingFeedbackForm));
    
    this.objectiveEmployeeInfo$ = this.store.pipe(select(getEmployeeInfoFeedbackForm)); 
    this.objectiveMaster$ = this.store.pipe(select(getLMObjectiveMasterFeedbackForm)); 
    this.objectiveDetails$ = this.store.pipe(select(getLMObjectiveDetailFeedbackForm));

    this.objectiveDetailsAlt$ = this.store.pipe(select(getLMObjectiveDetailAltFeedbackForm)); // Backend Patch Patch wahala !!!

  }

  hrStoreDispatches() {
    this.store.dispatch(new LoadRatingsFeedbackForm());

    this.loadHRObjectiveMastersFeedbackForm();
    // this.loadHRObjectiveDetailsFeedbackForm();
    this.loadHREmpObjectiveDetailsFeedbackForm();
    this.loadHRLMObjectiveDetailsFeedbackForm();
  }
  hrStoreSelects() {
    this.feedbackRatings$ = this.store.pipe(select(getRatingsFeedbackForm)); 
    this.processingMasters$ = this.store.pipe(select(getProcessingMastersFeedbackForm));
    this.processingDetails$ = this.store.pipe(select(getProcessingDetailsFeedbackForm));
    this.completingMasters$ = this.store.pipe(select(getCompletingMastersFeedbackForm));
    this.completingDetails$ = this.store.pipe(select(getCompletingDetailsFeedbackForm));
    this.submittingObjectives$ = this.store.pipe(select(getSubmittingFeedbackForm));
    
    this.objectiveEmployeeInfo$ = this.store.pipe(select(getEmployeeInfoFeedbackForm));
    this.objectiveMaster$ = this.store.pipe(select(getHRObjectiveMasterFeedbackForm)); 
    this.objectiveDetails$ = this.store.pipe(select(getHRObjectiveDetailFeedbackForm));
    this.hrEmpObjectiveDetails$ = this.store.pipe(select(getHREmpObjectiveDetailFeedbackForm));
    this.hrLMObjectiveDetails$ = this.store.pipe(select(getHRLMObjectiveDetailFeedbackForm));
  }

  loadLMObjectiveMastersFeedbackForm() {
    this.objectiveEmployeeInfo$.subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadLMObjectiveMastersFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  loadLMObjectiveDetailsFeedbackForm() {
    this.objectiveEmployeeInfo$.pipe(take(1)).subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadLMObjectiveDetailsFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  loadLMObjectiveDetailsAltFeedbackForm() {
    this.objectiveEmployeeInfo$.pipe(take(1)).subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadLMObjectiveDetailsAltFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  loadHRObjectiveMastersFeedbackForm() {
    this.objectiveEmployeeInfo$.subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadHRObjectiveMastersFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  loadHRObjectiveDetailsFeedbackForm() {
    this.objectiveEmployeeInfo$.pipe(take(1)).subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadHRObjectiveDetailsFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  
  loadHREmpObjectiveDetailsFeedbackForm() {
    this.objectiveEmployeeInfo$.pipe(take(1)).subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadHREmployeeObjectiveDetailsFeedbackForm(employeeInfo.employee_id));
      }
    });
  }

  
  loadHRLMObjectiveDetailsFeedbackForm() {
    this.objectiveEmployeeInfo$.pipe(take(1)).subscribe((employeeInfo: IPersonal) => {
      if (employeeInfo) {
        this.store.dispatch(new LoadHRLineManagerObjectiveDetailsFeedbackForm(employeeInfo.employee_id));
      }
    });
  }



  onSaveEmployeeOBjectiveMasters() {
    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'emp_comment', error: 'emp_comment_err'}, {field: 'usr_feedback', error: 'emp_feedback_err'}],  
        'required')){
        let finalData = values.map((obj) => {
          return {
            id: obj.id,
            description: obj.description,
            metric: obj.metric,
            target: obj.target,
            start_date: obj.start_date,
            due_date: obj.due_date,
            edit_objective: obj.edit_objective,
            feedback_period_start: obj.feedback_period_start,
            feedback_period_end: obj.feedback_period_end,
            period_update: obj.period_update,
            usr_feedback: obj.usr_feedback,
            emp_comment: obj.emp_comment,
            weight: obj.weight
          }
        });
        this.store.dispatch(new isCompletingMastersFeedbackForm(true));
        this.store.dispatch(new SaveEmployeeObjectiveMastersFeedbackForm({values: finalData, planId: values[0].planInfo.id}));
  
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
      }
    });
  }

  onPreSaveEmployeeOBjectiveMasters() {
    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
        let finalData = values.map((obj) => {
          return {
            id: obj.id,
            description: obj.description,
            metric: obj.metric,
            target: obj.target,
            start_date: obj.start_date,
            due_date: obj.due_date,
            edit_objective: obj.edit_objective,
            feedback_period_start: obj.feedback_period_start,
            feedback_period_end: obj.feedback_period_end,
            period_update: obj.period_update,
            usr_feedback: obj.usr_feedback,
            emp_comment: obj.emp_comment,
            weight: obj.weight
          }
        });
        this.store.dispatch(new isLoadingMastersFeedbackForm(true));
        this.store.dispatch(new SaveEmployeeObjectiveMastersFeedbackForm({values: finalData, planId: values[0].planInfo.id}));
    });
  }

  onSaveEmployeeOBjectiveDetails() {
    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'comment_value', error: 'emp_comment_err'}], 'required')){
        let finalData = values.map((obj) => {
          return {
            objective_detail_id: obj.id,
            comment_value: obj.comment_value
          }
        });
        this.store.dispatch(new isCompletingDetailsFeedbackForm(true));
        this.store.dispatch(new SaveEmployeeObjectiveDetailsFeedbackForm({values: finalData}));
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
      }
    });
  }

  onPreSaveEmployeeOBjectiveDetails() {
    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
        let finalData = values.map((obj) => {
          return {
            objective_detail_id: obj.id,
            comment_value: obj.comment_value
          }
        });
        this.store.dispatch(new isLoadingDetailsFeedbackForm(true));
        this.store.dispatch(new SaveEmployeeObjectiveDetailsFeedbackForm({values: finalData}));
    });
  }

  onSubmitEmployeeOBjective() { 
    if(this.preSubmitValidateEmpField()){
      this.dialogBoxService.show(`Are you sure you want to submit this feedback finally?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
  
            this.store.dispatch(new isSubmittingFeedbackForm(true));
            this.store.dispatch(new SubmitEmployeeObjectiveFeedbackForm(values[0].planInfo.id));
          });
        }
      });

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
    }

  }

  onSaveLMOBjectiveMasters() {
    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'lm_comment', error: 'lm_comment_err'}, {field: 'lm_feedback', error: 'lm_feedback_err'}],  
        'required')){
        let finalData = values.map((obj) => {
          return {
            id: obj.id,
            description: obj.description,
            metric: obj.metric,
            target: obj.target,
            start_date: obj.start_date,
            due_date: obj.due_date,
            edit_objective: obj.edit_objective,
            feedback_period_start: obj.feedback_period_start,
            feedback_period_end: obj.feedback_period_end,
            period_update: obj.period_update,
            // usr_feedback: obj.usr_feedback,
            // emp_comment: obj.emp_comment,
            lm_feedback: obj.lm_feedback,
            lm_comment: obj.lm_comment,
            weight: obj.weight
          }
        });
        this.store.dispatch(new isCompletingMastersFeedbackForm(true));
        this.store.dispatch(new SaveLMObjectiveMastersFeedbackForm({values: finalData, planId: values[0].planInfo.id, employeeId: values[0].employee_id}));
  
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
      }
    });
  }

  onPreSaveLMOBjectiveMasters() {
    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
        let finalData = values.map((obj) => {
          return {
            id: obj.id,
            description: obj.description,
            metric: obj.metric,
            target: obj.target,
            start_date: obj.start_date,
            due_date: obj.due_date,
            edit_objective: obj.edit_objective,
            feedback_period_start: obj.feedback_period_start,
            feedback_period_end: obj.feedback_period_end,
            period_update: obj.period_update,
            // usr_feedback: obj.usr_feedback,
            // emp_comment: obj.emp_comment,
            lm_feedback: obj.lm_feedback,
            lm_comment: obj.lm_comment,
            weight: obj.weight
          }
        });
        this.store.dispatch(new isLoadingMastersFeedbackForm(true));
        this.store.dispatch(new SaveLMObjectiveMastersFeedbackForm({values: finalData, planId: values[0].planInfo.id, employeeId: values[0].employee_id}));
    });
  }

  onSaveLMOBjectiveDetails() {
    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'lm_comment_value', error: 'emp_comment_err'}], 'required')){
        let finalData = values.map((obj) => {
          return {
            objective_detail_id: obj.id,
            lm_comment_value: obj.lm_comment_value
          }
        });
        this.store.dispatch(new isCompletingDetailsFeedbackForm(true));
        this.store.dispatch(new SaveLMObjectiveDetailsFeedbackForm({values: finalData, objectiveDetailsId: values[0].id, employeeId: values[0].masterInfo.employeeInfo.employee_id}));
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
      }
    });
  }

  onPreSaveLMOBjectiveDetails() {
    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
        let finalData = values.map((obj) => {
          return {
            objective_detail_id: obj.id,
            lm_comment_value: obj.lm_comment_value
          }
        });
        this.store.dispatch(new isLoadingDetailsFeedbackForm(true));
        this.store.dispatch(new SaveLMObjectiveDetailsFeedbackForm({values: finalData, objectiveDetailsId: values[0].id, employeeId: values[0].masterInfo.employeeInfo.employee_id}));
    });
  }

  onSubmitLMOBjective() {
    if(this.preSubmitValidateLMField()){
      this.dialogBoxService.show(`Are you sure you want to submit this feedback finally?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
            this.store.dispatch(new isSubmittingFeedbackForm(true));
            this.store.dispatch(new SubmitLMObjectiveFeedbackForm({planId: values[0].planInfo.id, employeeId: values[0].employee_id}));
          });
        }
      });

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following errors', message: 'All Input fields are required', type: ToastTypes.ERROR}))
    }
  }

  validateField(array: Object[], fields: Object[], validationType):boolean {
    let result = true;
      fields.forEach((row: any)=>{
        array.forEach((arrayRow)=>{
          if(!arrayRow[row.field]){
            arrayRow[row.error] = 'This field is required !';
            result = false;
          }
        })
      });
      return result;
  }

    preSubmitValidateEmpField():boolean {
    let result = true;

    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'emp_comment', error: 'emp_comment_err'}, {field: 'usr_feedback', error: 'emp_feedback_err'}],  
        'required')){

        } else {
        result = false;
      }
    });

    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'comment_value', error: 'emp_comment_err'}], 'required')){

      } else {
        result = false;
      }
    });

      return result;
  }

  preSubmitValidateLMField():boolean {
    let result = true;

    this.objectiveMaster$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'lm_comment', error: 'lm_comment_err'}, {field: 'lm_feedback', error: 'lm_feedback_err'}],  
        'required')){

        } else {
        result = false;
      }
    });

    this.objectiveDetails$.pipe(take(1)).subscribe((values) => {
      if(this.validateField(values,[{field: 'lm_comment_value', error: 'emp_comment_err'}], 'required')){

      } else {
        result = false;
      }
    });
      return result;
  }

    refresh(){
      this.performInit();
      this.store.dispatch(new ShowToast({title: null, message: `Feedack Information is being refreshed.`, type: ToastTypes.INFO}));
    }

    goBack(){
      this.location.back();
    }

    gotoManageObjective(){
      this.router.navigate([`${STANDARD_ROUTES.manageObjective}`]);
    }

    gotoLandingPage(){
      this.router.navigate([`${STANDARD_ROUTES.landingPage}`]);
    }

// Editor section

    onEditButtonClicked(data) {
      this.editor.initFormValues(data);
      this.onShowEditor();
    }

    processEditObjectiveMasters($event: IFeedbackObjectiveMaster) {
      this.objectiveMaster$.pipe(take(1),flatMap((data) => data),filter((data) => data.id === $event.id) ).subscribe((values) => {
        if(values){
          values.description = $event.description;
          values.metric = $event.metric;
          values.target = $event.target;
          values.due_date = $event.due_date;
          values.weight = $event.weight;
        }
        this.onCancelEditor();
      });
    }

    onShowEditor() {
      this.showEditor = true;
    }

    onCancelEditor() {
      this.showEditor = false;
    }

}
