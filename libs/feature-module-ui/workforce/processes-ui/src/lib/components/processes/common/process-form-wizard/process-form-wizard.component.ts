import { Component, OnInit, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IProcessTransactionDetail, IProcessTransactionMaster, IProcessMetaData } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { Observable, Subscription, ReplaySubject } from 'rxjs';
import { getProcessFormWizardMasterData, LoadDetailDataProcessFormWizard, getProcessFormWizardDetailData, LoadMasterDataProcessFormWizard, getProcessFormWizardMetaData, SaveProcessFormWizard, SavingProcessFormWizard, isSavingProcessFormWizard, isCompletingProcessFormWizard, CompleteProcessFormWizard, CompletingProcessFormWizard, SubmitProcessFormWizard, SubmittingProcessFormWizard, isSubmittingProcessFormWizard, isProcessingMasterProcessFormWizard, isProcessingDetailProcessFormWizard, ProcessingMasterProcessFormWizard, ProcessingDetailProcessFormWizard, ProcessFormWizardActionTypes } from '../../../../store/processes/process-form-wizard';
import { take, takeUntil } from 'rxjs/operators';
import { MdbStepperComponent } from 'ng-uikit-pro-standard';
import { FormRendererComponent } from '@nutela/shared/ui';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { PROCESS_FORM_ACCESS, PROCESS_FORM_COMPLETE, PROCESS_FORM_ROLE } from '../../../../constants';
import { Actions } from '@ngrx/effects';


@Component({
  selector: 'x365-shared-ui-process-form-wizard',
  templateUrl: './process-form-wizard.component.html',
  styleUrls: ['./process-form-wizard.component.scss']
})
export class ProcessFormWizardComponent implements OnInit, OnDestroy {
  @ViewChild('renderer') renderer: FormRendererComponent
  masterForm: FormGroup;
  showRenderer: boolean; // displays the renderer for the user to complete his or her process
  rendererJson: string; //the placeholder for the form json for each process at a time
  detailRow: IProcessTransactionDetail;
  currentMasterData: IProcessTransactionMaster;
  currentDetailRowData: IProcessTransactionDetail;
  currentDetailRowIndex: number = 0;
  userMetaData$: Observable<IProcessMetaData>;
  userMetaData: IProcessMetaData;
  masterData$: Observable<IProcessTransactionMaster>;
  detailData$: Observable<IProcessTransactionDetail[]>;
  isProcessingMaster$: Observable<boolean>;
  isProcessingDetail$: Observable<boolean>;
  isSaving$: Observable<boolean>;
  isCompleting$: Observable<boolean>;
  isSubmitting$: Observable<boolean>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private location: Location, private fb: FormBuilder, private dispatcher$: Actions, private store: Store<IAppState>, private dialogBoxService: DialogBoxService, private cd: ChangeDetectorRef) {
    this.masterForm = this.fb.group({
      detailsForm: this.fb.array([])
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.onSubscribeToMetaData();
    this.onSubscribeToMasters();
    this.onSubscribeToDetails();
  }

  storeSelects() {
    this.userMetaData$ = this.store.pipe(select(getProcessFormWizardMetaData));
    this.masterData$ = this.store.pipe(select(getProcessFormWizardMasterData));
    this.detailData$ = this.store.pipe(select(getProcessFormWizardDetailData));
    this.isProcessingMaster$ = this.store.pipe(select(isProcessingMasterProcessFormWizard));
    this.isProcessingDetail$ = this.store.pipe(select(isProcessingDetailProcessFormWizard));
    this.isSaving$ = this.store.pipe(select(isSavingProcessFormWizard));
    this.isCompleting$ = this.store.pipe(select(isCompletingProcessFormWizard));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingProcessFormWizard));
  }

  onSubscribeToMetaData() {
    this.userMetaData$.pipe(takeUntil(this.destroyed$)).subscribe((result)=> {
      if(result) {
        this.userMetaData = result;
        this.store.dispatch(new ProcessingMasterProcessFormWizard());
        this.store.dispatch(new LoadMasterDataProcessFormWizard({masterId: result.masterId}));

        this.store.dispatch(new ProcessingDetailProcessFormWizard());
        this.store.dispatch(new LoadDetailDataProcessFormWizard({masterId: result.masterId, roleId: result.roleId}));
      }
    });
  }

  onSubscribeToMasters() {
    this.masterData$.pipe(takeUntil(this.destroyed$)).subscribe((result)=> {
      if(result) {
        this.currentMasterData = result;
      }
    });
  }

  onSubscribeToDetails() {
    this.detailData$.pipe(takeUntil(this.destroyed$)).subscribe((result)=> {
      if(result.length) {
        result.forEach((row) => this.addDetail(row));
        this.onShowRenderer(result[this.currentDetailRowIndex], this.currentDetailRowIndex);
      }
    });
  }

  setDetail(data: IProcessTransactionDetail): FormGroup {
    return this.fb.group({
      id: data.id,
      form_id: data.form_id,
      rank: data.rank,
      form_json: data.form_json,
      form_data: data.form_data,
      form_data_json: data.form_data_json,
      form_comment: data.form_comment,
      doc_binary: data.doc_binary,
      doc_guid: data.doc_guid,
      doc_url: data.doc_url,
      doc_filename: data.doc_filename,
      doc_ext: data.doc_ext,
      doc_extention: data.doc_extention,
      doc_mime: data.doc_mime,
      doc_size: data.doc_size,
      is_complete: data.is_complete,
      role: data.role,
      username: data.username,
      form_title: data.form_title, // used strictly to get title & description of form
      form_description: data.form_description, // used strictly to get title & description of form
      role_perm: data.role_perm // used strictly test if user has access to form
    })
  }

  get detailsform() : FormArray {
    return this.masterForm.get("detailsForm") as FormArray
  }

  addDetail(data: IProcessTransactionDetail) {
    this.detailsform.push(this.setDetail(data));
  }
 
  removeDetail(i:number) {
    this.detailsform.removeAt(i);
  }

  onRefreshButtonClicked(){}

  onShowRenderer(detail: IProcessTransactionDetail, i: number) {
    // this.onRendererCancel();
    this.currentDetailRowIndex = i; // i is  the index of the selection on the details form array
    this.currentDetailRowData = detail; // currently selected detail data
    this.renderer.title = detail.form_title;
    this.renderer.subTitle = detail.form_description;
    this.rendererJson = detail.form_json;
    this.renderer.readonly = detail.is_complete === PROCESS_FORM_COMPLETE.YES || !detail.is_owner || ((detail.role === PROCESS_FORM_ROLE.employee) && (detail.role_perm === PROCESS_FORM_ACCESS.canView)); // set form to readonly when submitted
    this.renderer.isAccessible =  !((this.userMetaData.roleId === PROCESS_FORM_ROLE.employee) && (detail.role_perm === PROCESS_FORM_ACCESS.noAccess)); // ((this.userMetaData.roleId === PROCESS_FORM_ROLE.employee) && ( (detail.role_perm === PROCESS_FORM_ACCESS.canView) || (detail.role_perm === PROCESS_FORM_ACCESS.notApplicable) )) || (detail.role !== PROCESS_FORM_ROLE.employee); // cannot view form without access
    this.renderer.initBuilderData(this.rendererJson);
    this.cd.markForCheck();
    this.showRenderer = true;
  }

  onRendererSave($event) {
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.rendererJson);
    for (const key of entries) {
      form_json.forEach(record => {
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.detailsform.value[this.currentDetailRowIndex].form_json = JSON.stringify(form_json);
    let detailFormValue: IProcessTransactionDetail = this.detailsform.value[this.currentDetailRowIndex];
    this.store.dispatch(new SavingProcessFormWizard());
    this.store.dispatch(new SaveProcessFormWizard({data: this.transformDetailsBody(detailFormValue), recordId: detailFormValue.id, masterId:this.currentDetailRowData.master_id, editMode: true, role: this.userMetaData.roleId, flag: this.userMetaData.flag}));
    // this.onRendererCancel();
  }

  onRendererComplete($event) {
    this.dialogBoxService.show(`Are you sure you want to mark this record as complete?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {

        const entries = Object.entries($event);
        const form_json = JSON.parse(this.rendererJson);
        for (const key of entries) {
          form_json.forEach(record => {
            if (record.field_name === key[0]) {
              record.value = key[1];
            }
          });
        }
        this.detailsform.value[this.currentDetailRowIndex].form_json = JSON.stringify(form_json);
        let detailFormValue: IProcessTransactionDetail = this.detailsform.value[this.currentDetailRowIndex];

        this.store.dispatch(new CompletingProcessFormWizard());
        this.store.dispatch(new CompleteProcessFormWizard({ data: this.transformDetailsBody(detailFormValue), recordId: this.currentDetailRowData.id, masterId:this.currentDetailRowData.master_id, processId:this.currentMasterData.process_id, role: this.currentDetailRowData.role, employeeId: this.currentMasterData.employee_id, flag: this.userMetaData.flag}));
      }
    });
  }

  onSubmitMastersButtonClicked(recordId: number){
    this.dialogBoxService.show(`Are you sure you want to submit this record finally?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new SubmittingProcessFormWizard());
        this.store.dispatch(new SubmitProcessFormWizard({ recordId: this.userMetaData.masterId, role: this.userMetaData.roleId, employeeId: this.userMetaData.employeeId, flag: this.userMetaData.flag}));
      }
    });
  }

  transformDetailsBody(data: IProcessTransactionDetail): IProcessTransactionDetail{
    return {
      form_id: data.form_id,
      rank: data.rank,
      form_json: data.form_json,
      form_data_json: data.form_data_json,
      form_comment: data.form_comment,
      doc_binary: data.doc_binary,
      doc_guid: data.doc_guid,
      doc_url: data.doc_url,
      doc_filename: data.doc_filename,
      doc_ext: data.doc_ext,
      doc_extention: data.doc_extention,
      doc_mime: data.doc_mime,
      doc_size: data.doc_size?data.doc_size:0,
      is_complete: data.is_complete === PROCESS_FORM_COMPLETE.YES,
      role: data.role,
      username: data.username
    };
  }

  onRendererCancel() {
    this.showRenderer = false;
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
