import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ApiService, UtilService, toastOptionsSuccess, toastOptionsError } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';
import { RepaymentsActionTypes, LoadDataRepayments, LoadDataRepaymentsSuccess, NotProcessingRepayments, LoadDataRepaymentTypes, LoadDataRepaymentTypesSuccess, LoadDataPaymentInstruments, LoadDataPaymentInstrumentsSuccess, LoadDefinitionsRepayment, LoadDefinitionsRepaymentSuccess, SaveRepayment, HideEditorRepayment, LoadRunningLoansRepayments, LoadRunningLoansRepaymentsSuccess, LoadPaymentsHistory, LoadPaymentsHistorySuccess, NotLoadingRepayments, LoadDataRepaymentInterest, LoadDataRepaymentInterestSuccess, LoadRepaymentsScheduleData, LoadRepaymentsScheduleDataSuccess } from './repayments.actions';
import * as constants from '../../constants';
import { ILoanRepayment } from '@nutela/models/compensation/loans';
import { ILoanState } from '../root';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class RepaymentsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<ILoanState>, private utilService: UtilService) {}

  @Effect()
  loadRepaymentData$: Observable<Action> = this.actions$
    .ofType<LoadDataRepayments>(RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENTS)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_REPAYMENTS_DATA_URLs.getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingRepayments());
                  return new LoadDataRepaymentsSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingRepayments());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingRepayments(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );



  @Effect()
  loadPaymentsSchedule$: Observable<Action> = this.actions$
    .ofType<LoadPaymentsHistory>(
      RepaymentsActionTypes.LOAD_DATA_PAYMENTS_HISTORY
    )
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getPaymentsScheduleHR}/${payload.loanDetailId}/${payload.employeeId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingRepayments());
                return new LoadPaymentsHistorySuccess(<
                  ILoanRepayment[]
                >data.Results);
              } else {
                this.store.dispatch(new NotProcessingRepayments());
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
                new NotProcessingRepayments(),
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
  loadRunningLoansData$: Observable<Action> = this.actions$
    .ofType<LoadRunningLoansRepayments>(RepaymentsActionTypes.LOAD_DATA_RUNNING_LOANS_REPAYMENTS)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs.getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotProcessingRepayments());
                  return new LoadRunningLoansRepaymentsSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingRepayments(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadRepaymentTypes$: Observable<Action> = this.actions$
    .ofType<LoadDataRepaymentTypes>(RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_TYPES)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_REPAYMENTS_DATA_URLs.getTypes)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const typesTranformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                 this.store.dispatch(new NotProcessingRepayments());
                  return new LoadDataRepaymentTypesSuccess(<ISelectOption[]>typesTranformed );
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingRepayments(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

    @Effect()
    loadRepaymentInterest$: Observable<Action> = this.actions$
      .ofType<LoadDataRepaymentInterest>(
        RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_INTEREST
      )
      .pipe(
        map(action => action.payload),
        mergeMap(payload => {
          return this.apiService
            .read(
              `${constants.LOAN_REPAYMENTS_DATA_URLs.getRepaymentInterest}/${payload.loandetailId}/${payload.returnInterestOnly}?effective_date=${
                payload.effectiveDate
              }`
            )
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  this.store.dispatch(new NotProcessingRepayments());
                  return new LoadDataRepaymentInterestSuccess(data.Results[0]);
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
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
                  new NotProcessingRepayments(),
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
  loadRepaymentInstruments$: Observable<Action> = this.actions$
    .ofType<LoadDataPaymentInstruments>(RepaymentsActionTypes.LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_REPAYMENTS_DATA_URLs.getPaymentInstruments)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const instrumentsTranformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                 this.store.dispatch(new NotProcessingRepayments());
                  return new LoadDataPaymentInstrumentsSuccess(<ISelectOption[]>instrumentsTranformed );
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingRepayments(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadLoanDefinitions$: Observable<Action> = this.actions$
    .ofType<LoadDefinitionsRepayment>(RepaymentsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const definitions = this.utilService.transformToSelectDataList(data.Results, 'loan_id', 'description');
                 this.store.dispatch(new NotProcessingRepayments());
                  return new LoadDefinitionsRepaymentSuccess(<ISelectOption[]>definitions );
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
                  return new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingRepayments(),
                  new ShowToast({title: 'Loan Repayments Data Could Not Be Loaded', message: 'Something went wrong. Loan Repayments data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );


    @Effect()
    loadRepaymentsSchedule$: Observable<Action> = this.actions$
      .ofType<LoadRepaymentsScheduleData>(
        RepaymentsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT
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
                  this.store.dispatch(new NotProcessingRepayments());
                  return new LoadRepaymentsScheduleDataSuccess(<
                    ILoanRepayment[]
                  >data.Results);
                } else {
                  this.store.dispatch(new NotProcessingRepayments());
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
                  new NotProcessingRepayments(),
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
      .ofType<SaveRepayment>(RepaymentsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.LOAN_REPAYMENTS_DATA_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingRepayments(),
                    new HideEditorRepayment(),
                    new LoadDataRepayments()
                  ]);
                } else {
                  return from([
                    new NotProcessingRepayments(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingRepayments(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );
}
