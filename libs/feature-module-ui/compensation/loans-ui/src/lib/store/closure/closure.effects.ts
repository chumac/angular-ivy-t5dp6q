import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';



import { IApiResult } from '@nutela/models/core-data';
import { ApiService, toastOptionsSuccess, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../constants';
import { LoadApplicationsDataClosure, ClosureActionTypes, NotProcessingClosures, LoadApplicationsDataClosureSuccess, SaveClosure, HideEditorClosure, NotLoadingClosures, LoadAwaitingApprovalDataClosure, LoadAwaitingApprovalDataClosureSuccess, LoadRepaymentsScheduleData, LoadGenericScheduleData, LoadGenericScheduleDataSuccess, LoadRepaymentsScheduleDataSuccess } from './closure.actions';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { ILoanState } from '../root';

@Injectable()
export class ClosureEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<ILoanState>) {}


  @Effect()
  loadRunningLoansData$: Observable<Action> = this.actions$
    .ofType<LoadApplicationsDataClosure>(ClosureActionTypes.LOAD_APPLICATIONS_DATA_LOAN_CLOSURE)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs.getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingClosures());
                  return new LoadApplicationsDataClosureSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingClosures());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingClosures(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadClosedLoansData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataClosure>(ClosureActionTypes.LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_CLOSURE_DATA_URLs.getAwaiting)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingClosures());
                  return new LoadAwaitingApprovalDataClosureSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingClosures());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingClosures(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

    @Effect()
    loadGenericSchedules$: Observable<Action> = this.actions$
      .ofType<LoadGenericScheduleData>(
        ClosureActionTypes.LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE
      )
      .pipe(
        map(action => action.payload),
        mergeMap(payload => {
          return this.apiService
            .read(
              `${constants.LOAN_APPLICATIONS_DATA_URLs.getGenericSchedule}/${
                payload.loanId
              }/${payload.loanAmount}/${payload.interestRate}/${payload.tenor}?effective_date=${payload.effectiveDate}`
            )
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  this.store.dispatch(new NotLoadingClosures());
                  return new LoadGenericScheduleDataSuccess(<
                    ILoanRepayment[]
                  >data.Results);
                } else {
                  new NotLoadingClosures()
                  return new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded.',
                    options: toastOptionsError()
                  });
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingClosures(),
                  new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
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
      loadRepaymentsSchedule$: Observable<Action> = this.actions$
        .ofType<LoadRepaymentsScheduleData>(
          ClosureActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE
        )
        .pipe(
          map(action => action.payload),
          mergeMap(payload => {
            return this.apiService
              .read(
                `${constants.LOAN_REPAYMENTS_DATA_URLs.getRepaymentScheduleHR}/${payload.loanDetailId}/${payload.employeeId}`
              )
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    this.store.dispatch(new NotLoadingClosures());
                    return new LoadRepaymentsScheduleDataSuccess(<
                      ILoanRepayment[]
                    >data.Results);
                  } else {
                    this.store.dispatch(new NotLoadingClosures());
                    return new ShowToast({
                      title: 'Data Item Could Not Be Loaded',
                      message:
                        'Something went wrong. Form data could not be loaded.',
                      options: toastOptionsError()
                    });
                  }
                }),
                catchError((error: any) =>
                  of(
                    new NotLoadingClosures(),
                    new ShowToast({
                      title: 'Data Item Could Not Be Loaded',
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
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveClosure>(ClosureActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.LOAN_CLOSURE_DATA_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingClosures(),
                    new HideEditorClosure(),
                    new LoadApplicationsDataClosure()
                  ]);
                } else {
                  return from([
                    new NotProcessingClosures(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingClosures(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );
}
