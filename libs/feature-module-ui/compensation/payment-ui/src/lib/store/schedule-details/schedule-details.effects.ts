import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';


import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../constants';
import { IRootState } from '../root';
import { LoadDataScheduleDetail, ScheduleDetailActionTypes, NotLoadingDataScheduleDetail, LoadDataScheduleDetailSuccess, HideEditorScheduleDetail, UploadScheduleDetails, NotProcessingScheduleDetail, ResetScheduleDetailData, RequeueScheduleDetails, LoadCurrencyDataScheduleDetail, LoadCurrencyDataScheduleDetailSuccess, LoadAccountTypeDataScheduleDetail, LoadAccountTypeDataScheduleDetailSuccess, LoadDataByIdScheduleSuccess, LoadDataByIdSchedule, NotUploadingScheduleDetail, SubmitDataScheduleDetails, SaveUpdateDataScheduleDetail, ValidateUploadScheduleDetail, ValidatePaymentScheduleDetail, SavePaymentProcessScheduleDetailSuccess, SavePaymentProcessScheduleDetail, SavePaymentProcessScheduleDetailFailure, ProcessPayrollScheduleDetails, NotResetingDataScheduleDetail, NotValidatingRecordScheduleDetail, NotRequeueingDataScheduleDetail, NotSubmittingDataScheduleDetail } from './schedule-details.actions';

@Injectable()
export class ScheduleDetailEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadDataScheduleDetail$: Observable<Action> = this.actions$
    .ofType<LoadDataScheduleDetail>(ScheduleDetailActionTypes.LOAD_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        let url = constants.SCHEDULE_DETAIL_DATA_URLs.getAll
        return this.apiService
          .read(`${url}/${payload.payload.scheduleID}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new LoadDataScheduleDetailSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadDataByIdSchedule>(ScheduleDetailActionTypes.LOAD_SINGLE_SCHEDULE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        let url = constants.SCHEDULE_DATA_URLs.getById
        return this.apiService
          .read(`${url}/${payload.payload.scheduleID}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new LoadDataByIdScheduleSuccess(data.Results[0]);
              } else {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  loadCurrencyDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyDataScheduleDetail>(ScheduleDetailActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getCurrency)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new LoadCurrencyDataScheduleDetailSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAccountTypeDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadAccountTypeDataScheduleDetail>(ScheduleDetailActionTypes.LOAD_ACCOUNT_TYPE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getAccountType)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new LoadAccountTypeDataScheduleDetailSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );



  @Effect()
  saveAuthorizePaymentSchedule$: Observable<Action> = this.actions$
    .ofType<SavePaymentProcessScheduleDetail>(ScheduleDetailActionTypes.SAVE_PAYMENT_PROCESS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.SCHEDULE_DATA_URLs.pay;
        return this.apiService
          .create(`${url}/${payload.scheduleID}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new SavePaymentProcessScheduleDetailSuccess(),
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                this.store.dispatch(new SavePaymentProcessScheduleDetailFailure());
                return from([
                  new NotProcessingScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR }),
                new SavePaymentProcessScheduleDetailFailure(),
              ])
            )
          );
      })
    );


  @Effect()
  uploadScheduleDetailData$: Observable<Action> = this.actions$
    .ofType<UploadScheduleDetails>(ScheduleDetailActionTypes.UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.upload}/${payload.scheduleID}`, payload.detailData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was Uploaded successfully.`, type: ToastTypes.SUCCESS }),
                  new NotUploadingScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                  // new LoadDataScheduleDetail({ eventID: constants.SCHEDULE_DETAIL_UPLOAD_EVENTS_CONSTANTS.upload }),
                ]);
              } else {
                this.store.dispatch(new NotUploadingScheduleDetail());
                this.store.dispatch(new NotLoadingDataScheduleDetail());
                this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Uploaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, type: ToastTypes.ERROR }));
              }
            }),
            catchError((error: any) =>

              from([
                new NotUploadingScheduleDetail(),
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error.error.ErrorMassage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  resetScheduleDetailData$: Observable<Action> = this.actions$
    .ofType<ResetScheduleDetailData>(ScheduleDetailActionTypes.RESET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.reset}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new NotResetingDataScheduleDetail(),
                  new ShowToast({ title: null, message: `Record was Reset successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                  // new LoadDataScheduleDetail({ eventID: constants.SCHEDULE_DETAIL_UPLOAD_EVENTS_CONSTANTS.reset }),
                ]);
              } else {
                return from([
                  new NotResetingDataScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Reset', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not reset.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotResetingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Reset', message: `Something went wrong. Record was not reset.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  processPayroll$: Observable<Action> = this.actions$
    .ofType<ProcessPayrollScheduleDetails>(ScheduleDetailActionTypes.PROCESS_PAYROLL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.processPayroll}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new NotUploadingScheduleDetail(),
                  new NotLoadingDataScheduleDetail(),
                  new ShowToast({ title: null, message: `Record was Processed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                return from([
                  new NotUploadingScheduleDetail(),
                  new NotLoadingDataScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Processed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not processed.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotUploadingScheduleDetail(),
                new NotLoadingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Processed', message: `Something went wrong. Record was not processed.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  validatePaymentScheduleDetail$: Observable<Action> = this.actions$
    .ofType<ValidatePaymentScheduleDetail>(ScheduleDetailActionTypes.VALIDATE_PAYMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.validatePayment}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID }),
                ]);
              } else {
                return from([
                  new NotProcessingScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  validateUploadScheduleDetail$: Observable<Action> = this.actions$
    .ofType<ValidateUploadScheduleDetail>(ScheduleDetailActionTypes.VALIDATE_UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.validateUpload}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotValidatingRecordScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                return from([
                  new NotValidatingRecordScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotValidatingRecordScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  requeueScheduleDetail$: Observable<Action> = this.actions$
    .ofType<RequeueScheduleDetails>(ScheduleDetailActionTypes.REQUEUE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.requeue}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotRequeueingDataScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                return from([
                  new NotRequeueingDataScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotRequeueingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitScheduleDetail$: Observable<Action> = this.actions$
    .ofType<SubmitDataScheduleDetails>(ScheduleDetailActionTypes.SUBMIT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.submit}/${payload.scheduleID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS }),
                  new NotSubmittingDataScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                return from([
                  new NotSubmittingDataScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Submission data could not be completed.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSubmittingDataScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateDataScheduleDetail$: Observable<Action> = this.actions$
    .ofType<SaveUpdateDataScheduleDetail>(ScheduleDetailActionTypes.SAVE_UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.SCHEDULE_DETAIL_DATA_URLs.update;
        return this.apiService
          .update(`${url}/${payload.scheduleDetailID}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingScheduleDetail(),
                  new HideEditorScheduleDetail(),
                  new LoadDataScheduleDetail({ scheduleID: payload.scheduleID }),
                  new LoadDataByIdSchedule({ scheduleID: payload.scheduleID })
                ]);
              } else {
                return from([
                  new NotProcessingScheduleDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingScheduleDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );
}
