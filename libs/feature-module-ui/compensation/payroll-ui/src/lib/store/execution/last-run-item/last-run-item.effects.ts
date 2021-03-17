import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';

import {
  LastRunItemActionTypes,
  LoadLastRunData,
  LoadLastRunDataSuccess,
  NotProcessingLastRunItem,
  NotLoadingLastRunItem,
  LoadCanCancelData,
  LoadCanCancelDataSuccess,
  LoadLastRunStatusDataSuccess,
  LoadLastRunStatusData,
  LoadEmployeeData,
  LoadEmployeeDataSuccess,
  LoadPayslipData,
  LoadPayslipDataSuccess,
  SendRunDataForApproval,
  SavePayrollRunFinalize,
  CancelRun,
  LoadByIdPayrollProfileData,
  LoadByIdPayrollProfileDataSuccess,
  LoadReportUrlData,
  LoadReportUrlDataSuccess,
  LoadSendForApprovalMessageData,
  LoadSendForApprovalMessageDataSuccess,
  HideEditorFinalize,

} from './last-run-item.actions';
import { IRootState } from '../../root/root.state';
import { UtilService, ApiService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IApiResult } from '@nutela/models/core-data';

@Injectable()
export class LastRunItemEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }



  @Effect()
  loadLastRunItemData$: Observable<Action> = this.actions$
      .ofType<LoadLastRunData>(LastRunItemActionTypes.LOAD_LAST_RUN_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.lastRunItems}/${payload.payrollProfileID}/${payload.payrollPeriod}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new LoadLastRunDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  payrollByIdData$: Observable<Action> = this.actions$
      .ofType<LoadByIdPayrollProfileData>(LastRunItemActionTypes.LOAD_BY_ID_PAYROLL_PROFILE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.singleProfile}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new LoadByIdPayrollProfileDataSuccess(
                  data.Results[0]
                );
              } else {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  loadEmployeeData$: Observable<Action> = this.actions$
      .ofType<LoadEmployeeData>(LastRunItemActionTypes.LOAD_EMPLOYEE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.employee}/${payload.payrollRunID}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new LoadEmployeeDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );


  @Effect()
  sendForApproval$: Observable<Action> = this.actions$
      .ofType<SendRunDataForApproval>(LastRunItemActionTypes.SEND_FOR_APPROVAL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EXECUTION_URLs.sendForApproval}/${payload.payrollRunID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotLoadingLastRunItem(),
                  new LoadLastRunData({payrollProfileID: payload.payrollProfileID, payrollPeriod: payload.payrollPeriod })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                  new NotLoadingLastRunItem()
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingLastRunItem(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  cancelRun$: Observable<Action> = this.actions$
      .ofType<CancelRun>(LastRunItemActionTypes.CANCEL_RUN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EXECUTION_URLs.cancel}/${payload.payrollRunId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotLoadingLastRunItem(),
                  new LoadLastRunData({payrollProfileID: payload.payrollProfileID, payrollPeriod: payload.payrollPeriod })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                  new NotLoadingLastRunItem()
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingLastRunItem(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  saveRunFinalize$: Observable<Action> = this.actions$
      .ofType<SavePayrollRunFinalize>(LastRunItemActionTypes.SAVE_RUN_FINALIZE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXECUTION_URLs.finalize}/${payload.recordId}?payrollProfileID=${payload.payrollProfileID}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingLastRunItem(),
                  new HideEditorFinalize(),
                  new LoadLastRunData({ payrollProfileID: payload.payrollProfileID, payrollPeriod: payload.payrollPeriod })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                  new NotProcessingLastRunItem()
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLastRunItem(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.Message, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  loadPayslipData$: Observable<Action> = this.actions$
      .ofType<LoadPayslipData>(LastRunItemActionTypes.LOAD_PAYSLIP_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.payslip}/${payload.employeeID}/${payload.payrollProfileID}/${payload.payrollDate}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new LoadPayslipDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadPayslipDataSuccess(
                  [

                  ]
                ),
                new NotLoadingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  loadSendForApprovalMessageData$: Observable<Action> = this.actions$
      .ofType<LoadSendForApprovalMessageData>(LastRunItemActionTypes.LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.approvalMessage}/${payload.payrollRunID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new LoadSendForApprovalMessageDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotLoadingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadPayslipDataSuccess(
                  [

                  ]
                ),
                new NotLoadingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  loadLastRunItemStatusData$: Observable<Action> = this.actions$
      .ofType<LoadLastRunStatusData>(LastRunItemActionTypes.LOAD_LAST_RUN_STATUS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.lastRunItemStatus}/${payload.payrollRunID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new LoadLastRunStatusDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  loadReportUrlData$: Observable<Action> = this.actions$
      .ofType<LoadReportUrlData>(LastRunItemActionTypes.LOAD_REPORT_URL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EXECUTION_URLs.reportUrl}/${payload.payrollRunID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new LoadReportUrlDataSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotProcessingLastRunItem());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingLastRunItem(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

}

