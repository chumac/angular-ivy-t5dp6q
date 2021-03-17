import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess,
  UtilService
} from '@nutela/core-services';

import {
  ProcessFormWizardActionTypes,
  SaveProcessFormWizard,
  NotProcessingProcessFormWizard,
  HideEditorProcessFormWizard,
  DeleteDataProcessFormWizard,
  AddProcessFormWizard,
  LoadMasterDataProcessFormWizard,
  LoadMasterDataProcessFormWizardSuccess,
  LoadDetailDataProcessFormWizard,
  LoadDetailDataProcessFormWizardSuccess,
  NotSavingProcessFormWizard,
  SubmitProcessFormWizard,
  NotCompletingProcessFormWizard, CompleteProcessFormWizard, NotProcessingMasterProcessFormWizard, NotProcessingDetailProcessFormWizard, CompleteProcessFormWizardSuccess
} from './process-form-wizard.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import {
  IProcessTransactionMaster,
  IProcessTransactionDetail
} from '@nutela/models/workforce/employee-profiles';
import { PROCESS_FORM_FLAG, PROCESS_FORM_ROLE } from '../../../constants';

@Injectable()
export class ProcessFormWizardEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) {}

  @Effect()
  loadMasterData$: Observable<Action> = this.actions$
    .ofType<LoadMasterDataProcessFormWizard>(
      ProcessFormWizardActionTypes.LOAD_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.PROCESS_FORM_WIZARD_URLs.getMasterData}/${
              payload.masterId
            }`
          )
          .pipe(
            mergeMap((data: IApiResult) => [
              new NotProcessingMasterProcessFormWizard(),
              data.Success? 
                new LoadMasterDataProcessFormWizardSuccess(<IProcessTransactionMaster>data.Results[0]): 
                new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ]),
            catchError((error: any) =>
              of(
                new NotProcessingMasterProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  loadDetailData$: Observable<Action> = this.actions$
    .ofType<LoadDetailDataProcessFormWizard>(
      ProcessFormWizardActionTypes.LOAD_DETAIL_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.PROCESS_FORM_WIZARD_URLs.getDetailData}/${
              payload.masterId
            }/${payload.roleId}`
          )
          .pipe(
            mergeMap((data: IApiResult) => [
              new NotProcessingDetailProcessFormWizard(),
              data.Success? 
                new LoadDetailDataProcessFormWizardSuccess(<IProcessTransactionDetail[]>data.Results): 
                new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ]),
            catchError((error: any) =>
              of(
                new NotProcessingDetailProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddProcessFormWizard>(ProcessFormWizardActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PROCESS_FORM_WIZARD_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Your data was saved successfully.`,
                    options: toastOptionsSuccess()
                  }),
                  new NotProcessingProcessFormWizard(),
                  new HideEditorProcessFormWizard()
                  // new LoadMasterDataProcessFormWizard(),
                  //new LoadDetailDataProcessFormWizard()
                ]);
              } else {
                return from([
                  new NotProcessingProcessFormWizard(),
                  new ShowToast({
                    title: 'Data Could Not Be Saved',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Form data could not be loaded.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message:
                    `Something went wrong. Form data could not be saved. Error occured.` +
                    error,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveProcessFormWizard>(ProcessFormWizardActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(
            `${this.updateDetailUrlByRole(payload.role, payload.flag)}/${payload.recordId}`,
            payload.data
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Your data was updated successfully.`,
                    options: toastOptionsSuccess()
                  }),
                  new NotSavingProcessFormWizard(),
                  new HideEditorProcessFormWizard(),
                  // new LoadMasterDataProcessFormWizard(),
                  new LoadDetailDataProcessFormWizard({masterId:payload.masterId, roleId: payload.role})
                ]);
              } else {
                return from([
                  new NotSavingProcessFormWizard(),
                  new ShowToast({
                    title: 'Data Could Not Be Saved',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Form data could not be loaded.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSavingProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message:
                    `Something went wrong. Form data could not be saved. Error occured.` +
                    error,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );

  @Effect()
  completeData$: Observable<Action> = this.actions$
    .ofType<CompleteProcessFormWizard>(ProcessFormWizardActionTypes.COMPLETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(
            `${this.completeDetailUrlByRole(payload.role, payload.flag)}/${payload.recordId}/${payload.processId}/${payload.role != PROCESS_FORM_ROLE.employee?payload.employeeId:''}`,
            payload.data
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Your record is marked as Completed.`,
                    options: toastOptionsSuccess()
                  }),
                  new NotCompletingProcessFormWizard(),
                  new HideEditorProcessFormWizard(),
                  // new LoadMasterDataProcessFormWizard(),
                  new LoadDetailDataProcessFormWizard({masterId:payload.masterId, roleId: payload.role}),
                  new CompleteProcessFormWizardSuccess(),
                ]);
              } else {
                return from([
                  new NotCompletingProcessFormWizard(),
                  new ShowToast({
                    title: 'Data Could Not Be Completed',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Form data could not be completed.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotCompletingProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Completed',
                  message:
                    `Something went wrong. Form data could not be completed. Error occured.` +
                    error,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SubmitProcessFormWizard>(ProcessFormWizardActionTypes.SUBMIT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(
            `${this.submitDetailUrlByRole(payload.role, payload.flag)}/${payload.recordId}/${payload.employeeId}`,
            null
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Your data was submitted successfully.`,
                    options: toastOptionsSuccess()
                  }),
                  new NotSavingProcessFormWizard(),
                  new HideEditorProcessFormWizard()
                  // new LoadMasterDataProcessFormWizard(),
                  //new LoadDetailDataProcessFormWizard()
                ]);
              } else {
                return from([
                  new NotSavingProcessFormWizard(),
                  new ShowToast({
                    title: 'Data Could Not Be Submitted',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Form data could not be submitted.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSavingProcessFormWizard(),
                new ShowToast({
                  title: 'Data Could Not Be Submitted',
                  message:
                    `Something went wrong. Form data could not be submitted. Error occured.` +
                    error,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataProcessFormWizard>(
      ProcessFormWizardActionTypes.DELETE_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(
            `${constants.PROCESS_FORM_WIZARD_URLs.delete}/${payload.recordId}`
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Record was deleted successfully.`,
                    options: toastOptionsSuccess()
                  })
                  // new LoadMasterDataProcessFormWizard(),
                  //new LoadDetailDataProcessFormWizard()
                ]);
              } else {
                return from([
                  new ShowToast({
                    title: 'Data Could Not Be Deleted',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Record was not deleted.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Deleted',
                  message: `Something went wrong. Record was not deleted.`,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );

  updateDetailUrlByRole(role: any, flag: number) {
    let url = '';
    switch (+role) {
      case PROCESS_FORM_ROLE.employee:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.updateDetailSelf}`;
        break;
      case PROCESS_FORM_ROLE.lineManager:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.updateDetailLM}`;
        break;
      case PROCESS_FORM_ROLE.HR:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.updateDetailHR}`;
        break;
    }
    if(flag === PROCESS_FORM_FLAG.isReviewer){
      url = `${constants.PROCESS_FORM_WIZARD_URLs.updateDetailReviewer}`;
    }
    return url;
  }

  completeDetailUrlByRole(role: any, flag: number) {
    let url = '';
    switch (+role) {
      case PROCESS_FORM_ROLE.employee:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.completeDetailSelf}`;
        break;
      case PROCESS_FORM_ROLE.lineManager:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.completeDetailLM}`;
        break;
      case PROCESS_FORM_ROLE.HR:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.completeDetailHR}`;
        break;
    }
    if(flag === PROCESS_FORM_FLAG.isReviewer){
      url = `${constants.PROCESS_FORM_WIZARD_URLs.completeDetailReviewer}`;
    }
    return url;
  }

  submitDetailUrlByRole(role: any, flag: number) {
    let url = '';
    switch (+role) {
      case PROCESS_FORM_ROLE.employee:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.submitDetailSelf}`;
        break;
      case PROCESS_FORM_ROLE.lineManager:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.submitDetailLM}`;
        break;
      case PROCESS_FORM_ROLE.HR:
        url = `${constants.PROCESS_FORM_WIZARD_URLs.submitDetailHR}`;
        break;
    }
    if(flag === PROCESS_FORM_FLAG.isReviewer){
      url = `${constants.PROCESS_FORM_WIZARD_URLs.submitDetailReviewer}`;
    }
    return url;
  }
}
