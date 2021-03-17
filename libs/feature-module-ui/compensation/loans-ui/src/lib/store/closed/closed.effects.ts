import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';



import { IApiResult } from '@nutela/models/core-data';
import { ApiService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../constants';
import { LoadClosedData, ClosedActionTypes, NotLoadingClosedData, LoadClosedDataSuccess, LoadGenericScheduleData, LoadGenericScheduleDataSuccess, LoadRepaymentsScheduleDataSuccess, LoadRepaymentsScheduleData } from './closed.actions';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { ILoanState } from '../root';

@Injectable()
export class ClosedEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<ILoanState>) {}


  @Effect()
  loadClosedData$: Observable<Action> = this.actions$
    .ofType<LoadClosedData>(ClosedActionTypes.LOAD_CLOSED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_CLOSURE_DATA_URLs.getClosed)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingClosedData());
                  return new LoadClosedDataSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingClosedData());
                  return new ShowToast({title: 'Closed Loans Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingClosedData(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );


    @Effect()
    loadRepaymentsSchedule$: Observable<Action> = this.actions$
      .ofType<LoadRepaymentsScheduleData>(
        ClosedActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED
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
                  this.store.dispatch(new NotLoadingClosedData());
                  return new LoadRepaymentsScheduleDataSuccess(<
                    ILoanRepayment[]
                  >data.Results);
                } else {
                  this.store.dispatch(new NotLoadingClosedData());
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
                  new NotLoadingClosedData(),
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
      loadGenericSchedules$: Observable<Action> = this.actions$
        .ofType<LoadGenericScheduleData>(
          ClosedActionTypes.LOAD_GENERIC_SCHEDULE_DATA_CLOSED
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
                    this.store.dispatch(new NotLoadingClosedData());
                    return new LoadGenericScheduleDataSuccess(<
                      ILoanRepayment[]
                    >data.Results);
                  } else {
                    new NotLoadingClosedData()
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
                    new NotLoadingClosedData(),
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

}
