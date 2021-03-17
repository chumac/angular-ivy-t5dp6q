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
import { LoadApprovedDataSchedule, LoadAwaitingApprovalDataSchedule, LoadAwaitingApprovalDataScheduleSuccess, ScheduleActionTypes, NotLoadingDataSchedule, LoadApprovedDataScheduleSuccess, SaveDataSchedule, NotProcessingDataSchedule, HideEditorSchedule, LoadPaymentPlatformDataSchedule, LoadPaymentPlatformDataScheduleSuccess, LoadCurrencyDataSchedule, LoadCurrencyDataScheduleSuccess, LoadPaymentSourceDataSchedule, LoadPaymentSourceDataScheduleSuccess, LoadPayrollProfileDataSchedule, LoadPayrollProfileDataScheduleSuccess, LoadPayrollSourceDataSchedule, LoadPayrollSourceDataScheduleSuccess, NotSavingSchedule, LoadDataClosedSchedule, LoadDataClosedScheduleSuccess, LoadDataCompletedSchedule } from './schedule.actions';
import { LoadDataScheduleDetail } from '../schedule-details';

@Injectable()
export class ScheduleEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataSchedule>(ScheduleActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getApproved)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadApprovedDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  loadAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataSchedule>(ScheduleActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadAwaitingApprovalDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadClosedData$: Observable<Action> = this.actions$
    .ofType<LoadDataClosedSchedule>(ScheduleActionTypes.LOAD_CLOSED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getClosed)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadDataClosedScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadCompletedData$: Observable<Action> = this.actions$
    .ofType<LoadDataCompletedSchedule>(ScheduleActionTypes.LOAD_COMPLETED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadDataClosedScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaymentPlatformDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPaymentPlatformDataSchedule>(ScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.platform)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadPaymentPlatformDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadCurrencyDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyDataSchedule>(ScheduleActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getCurrency)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadCurrencyDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  // @Effect()
  // loadAccountTypeDataSchedule$: Observable<Action> = this.actions$
  //   .ofType<LoadAccountTypeDataSchedule>(ScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA)
  //   .pipe(
  //     map(action => action),
  //     switchMap(payload => {
  //       return this.apiService
  //         .read(constants.SCHEDULE_DATA_URLs.getAccountType)
  //         .pipe(
  //           map((data: IApiResult) => {
  //             if (data.Success && data.Results) {
  //               this.store.dispatch(new NotLoadingDataSchedule());
  //               return new LoadAccountTypeDataScheduleSuccess(data.Results);
  //             } else {
  //               this.store.dispatch(new NotLoadingDataSchedule());
  //               return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new NotLoadingDataSchedule(),
  //               new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
  //             )
  //           )
  //         );
  //     })
  //   );

  @Effect()
  loadPaymentSourceDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPaymentSourceDataSchedule>(ScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPaymentSource)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadPaymentSourceDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileDataSchedule>(ScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPayrollProfile)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadPayrollProfileDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollSourceDataSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPayrollSourceDataSchedule>(ScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getPayrollSource)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new LoadPayrollSourceDataScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  saveDataSchedule$: Observable<Action> = this.actions$
    .ofType<SaveDataSchedule>(ScheduleActionTypes.SAVE)
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
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDataSchedule(),
                  new HideEditorSchedule(),
                  new LoadApprovedDataSchedule(),
                  new LoadAwaitingApprovalDataSchedule()
                ]);
              } else {
                return from([
                  new NotProcessingDataSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDataSchedule(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  // @Effect()
  // validateSchedule$: Observable<Action> = this.actions$
  //   .ofType<ValidateSchedule>(ScheduleActionTypes.VALIDATE_SCHEDULE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .update(`${constants.SCHEDULE_DATA_URLs.validate}/${payload.scheduleID}`, null)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was validated successfully.`, type: ToastTypes.SUCCESS }),
  //                 new LoadApprovedDataSchedule(),
  //                 new NotSavingSchedule()
  //               ]);
  //             } else {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotSavingSchedule(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );


  // @Effect()
  // deleteScheduleData$: Observable<Action> = this.actions$
  //   .ofType<DeleteSchedule>(ScheduleActionTypes.DELETE_SCHEDULE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .delete(`${constants.SCHEDULE_DATA_URLs.delete}/${payload.recordId}`)
  //         .pipe(
  //           switchMap((data: IApiResult) => {

  //             if (data.Success) {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
  //                 new LoadAwaitingApprovalDataSchedule(),
  //               ]);
  //             } else {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotSavingSchedule(),
  //               new ShowToast({ title: 'Data Could Not Be Deleted', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // archiveScheduleData$: Observable<Action> = this.actions$
  //   .ofType<ArchiveSchedule>(ScheduleActionTypes.ARCHIVE_SCHEDULE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .update(`${constants.SCHEDULE_DATA_URLs.abandon}/${payload.recordId}`, null)
  //         .pipe(
  //           switchMap((data: IApiResult) => {

  //             if (data.Success) {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: null, message: `Record was Archived successfully.`, type: ToastTypes.SUCCESS }),
  //                 new LoadAwaitingApprovalDataSchedule(),
  //               ]);
  //             } else {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotSavingSchedule(),
  //               new ShowToast({ title: 'Data Could Not Be Archived', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // requeueScheduleData$: Observable<Action> = this.actions$
  //   .ofType<RequeueSchedule>(ScheduleActionTypes.REQUEUE_SCHEDULE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .update(`${constants.SCHEDULE_DATA_URLs.requeue}/${payload.recordId}`, null)
  //         .pipe(
  //           switchMap((data: IApiResult) => {

  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Record was Requeued successfully.`, type: ToastTypes.SUCCESS }),
  //                 new LoadApprovedDataSchedule(),
  //                 new LoadAwaitingApprovalDataSchedule(),
  //                 new NotSavingSchedule(),
  //               ]);
  //             } else {
  //               return from([
  //                 new NotSavingSchedule(),
  //                 new ShowToast({ title: 'Data Could Not Be Requeued', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not requeue.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotSavingSchedule(),
  //               new ShowToast({ title: 'Data Could Not Be Requeued', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not requeued.`, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );
}
