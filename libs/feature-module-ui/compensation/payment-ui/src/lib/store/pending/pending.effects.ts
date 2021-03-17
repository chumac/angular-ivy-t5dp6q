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
import { PendingScheduleActionTypes, NotLoadingDataPendingSchedule, SaveDataPendingSchedule, NotProcessingDataPendingSchedule, HideEditorPendingSchedule, LoadPaymentPlatformDataPendingSchedule, LoadPaymentPlatformDataPendingScheduleSuccess, LoadCurrencyDataPendingSchedule, LoadCurrencyDataPendingScheduleSuccess, LoadPaymentSourceDataPendingSchedule, LoadPaymentSourceDataPendingScheduleSuccess, LoadPayrollProfileDataPendingSchedule, LoadPayrollProfileDataPendingScheduleSuccess, LoadPayrollSourceDataPendingSchedule, LoadPayrollSourceDataPendingScheduleSuccess, LoadAccountTypeDataPendingSchedule, LoadAccountTypeDataPendingScheduleSuccess, DeletePendingSchedule, ArchivePendingSchedule, SubmitPendingSchedule, LoadDataNewScheduleSuccess, LoadDataNewSchedule, LoadAwaitingSubmissionDataSchedule, LoadAwaitingSubmissionDataScheduleSuccess, NotSubmittingDataPendingSchedule, ValidateRecordPendingSchedule, LoadPayrollDateDataPendingSchedule, LoadPayrollDateDataPendingScheduleSuccess } from './pending.actions';

@Injectable()
export class PendingScheduleEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadNewScheduleData$: Observable<Action> = this.actions$
    .ofType<LoadDataNewSchedule>(PendingScheduleActionTypes.LOAD_NEW_SCHEDULE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.new)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadDataNewScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingSubmissionData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingSubmissionDataSchedule>(PendingScheduleActionTypes.LOAD_AWAITING_SUBMISSION_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.awaitingSubmission)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadAwaitingSubmissionDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaymentPlatformDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPaymentPlatformDataPendingSchedule>(PendingScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.platform)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadPaymentPlatformDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadCurrencyDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyDataPendingSchedule>(PendingScheduleActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getCurrency)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadCurrencyDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAccountTypeDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadAccountTypeDataPendingSchedule>(PendingScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getAccountType)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadAccountTypeDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaymentSourceDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPaymentSourceDataPendingSchedule>(PendingScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPaymentSource)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadPaymentSourceDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileDataPendingSchedule>(PendingScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPayrollProfile)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadPayrollProfileDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollSourceDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPayrollSourceDataPendingSchedule>(PendingScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPayrollSource)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadPayrollSourceDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollDateDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPayrollDateDataPendingSchedule>(PendingScheduleActionTypes.LOAD_PAYROLL_DATE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.SCHEDULE_DATA_URLs.getPaymentDate}/${payload.payload.payrollProfileId}/${payload.payload.payrollSource}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new LoadPayrollDateDataPendingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataPendingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  validateRecordSchedule$: Observable<Action> = this.actions$
    .ofType<ValidateRecordPendingSchedule>(PendingScheduleActionTypes.VALIDATE_RECORD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DETAIL_DATA_URLs.validateUpload}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingSubmissionDataSchedule(),
                  new NotSubmittingDataPendingSchedule()
                ]);
              } else {
                return from([
                  new NotSubmittingDataPendingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSubmittingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  saveDataSchedule$: Observable<Action> = this.actions$
    .ofType<SaveDataPendingSchedule>(PendingScheduleActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.SCHEDULE_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new HideEditorPendingSchedule(),
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDataPendingSchedule(),
                  new LoadDataNewSchedule(),
                  new LoadAwaitingSubmissionDataSchedule()
                ]);
              } else {
                return from([
                  new NotProcessingDataPendingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteScheduleData$: Observable<Action> = this.actions$
    .ofType<DeletePendingSchedule>(PendingScheduleActionTypes.DELETE_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SCHEDULE_DATA_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new NotSubmittingDataPendingSchedule(),
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataNewSchedule(),
                ]);
              } else {
                return from([
                  new NotSubmittingDataPendingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSubmittingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Deleted', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  archiveScheduleData$: Observable<Action> = this.actions$
    .ofType<ArchivePendingSchedule>(PendingScheduleActionTypes.ARCHIVE_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DATA_URLs.abandon}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([

                  new ShowToast({ title: null, message: `Record was Archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataNewSchedule(),
                  new LoadAwaitingSubmissionDataSchedule(),
                  new NotSubmittingDataPendingSchedule()
                ]);
              } else {
                return from([
                  new NotSubmittingDataPendingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR }),

                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSubmittingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Archived', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitScheduleData$: Observable<Action> = this.actions$
    .ofType<SubmitPendingSchedule>(PendingScheduleActionTypes.SUBMIT_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DATA_URLs.submit}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was Submitted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingSubmissionDataSchedule(),
                  new NotSubmittingDataPendingSchedule()
                ]);
              } else {
                return from([
                  new NotSubmittingDataPendingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not submitted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotSubmittingDataPendingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not submitted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}
