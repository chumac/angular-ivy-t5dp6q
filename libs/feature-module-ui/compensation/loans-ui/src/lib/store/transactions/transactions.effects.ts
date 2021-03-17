import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import * as constants from '../../constants';
import { IApprovedLoan, ILoanRepayment } from '@nutela/models/compensation/loans';
import { LoadCurrenciesDataTransactions, TransactionsActionTypes, NotProcessingTransactions, LoadCurrenciesDataTransactionsSuccess, LoadAwaitingApprovalDataTransactions, LoadAwaitingApprovalDataTransactionsSuccess, LoadApprovedDataTransactions, LoadApprovedDataTransactionsSuccess, LoadLoanTypesDataTransactions, LoadLoanTypesDataTransactionsSuccess, SaveDataTransactionApplication, HideEditorTransactionApply, SaveUpdateDataTransactionApplication, LoadMonthlyDeductionAmountTransaction, LoadMonthlyDeductionAmountTransactionSuccess, LoadDataTransactions, LoadDataTransactionsSuccess, LoadRepaymentsScheduleDataTransaction, LoadRepaymentsScheduleDataTransactionSuccess, NotLoadingTransactions, LoadGenericScheduleDataSuccess, LoadGenericScheduleData, LoadActualScheduleData, LoadActualScheduleDataSuccess, DeleteApprovedLoanTransaction, DeleteAwaitingApprovalLoanTransaction, LoadDocumentTransaction, LoadDocumentTransactionSuccess, LoadInlineDocumentTransaction } from './transactions.actions';
import { ILoanState } from '../root';
import { ToastTypes } from '@nutela/shared/app-global';
import { SaveSuccessDataLoanApplication } from '../applications';

@Injectable()
export class TransactionsEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<ILoanState>) {}



  @Effect()
  loadMonthlyDeductionAmount$: Observable<Action> = this.actions$
    .ofType<LoadMonthlyDeductionAmountTransaction>(
      TransactionsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS
    )
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getMonthlyDeduction}/${
              payload.rate
            }/${payload.period}/${payload.principal}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingTransactions());
                return new LoadMonthlyDeductionAmountTransactionSuccess(<number
                >data.Results[0]);
              } else {
                this.store.dispatch(new NotProcessingTransactions());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingTransactions(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadLoanCurrenciesData$: Observable<Action> = this.actions$
    .ofType<LoadCurrenciesDataTransactions>(TransactionsActionTypes.LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_CURRENCY_DATA_URLs
            .getDefault)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const currencyList = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                this.store.dispatch(new NotProcessingTransactions());
                return new LoadCurrenciesDataTransactionsSuccess(<ISelectOption[]>(
                  currencyList

                ));
              } else {
                this.store.dispatch(new NotProcessingTransactions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingTransactions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


  @Effect()
  loadTransactionsData$: Observable<Action> = this.actions$
    .ofType<LoadDataTransactions>(TransactionsActionTypes.LOAD_DATA_TRANSACTIONS_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs
            .getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTransactions());
                return new LoadDataTransactionsSuccess(<IApprovedLoan[]>(
                  data.Results));

              } else {
                this.store.dispatch(new NotLoadingTransactions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingTransactions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

    @Effect()
    loadGenericSchedules$: Observable<Action> = this.actions$
      .ofType<LoadGenericScheduleData>(
        TransactionsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS
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
                  this.store.dispatch(new NotLoadingTransactions());
                  return new LoadGenericScheduleDataSuccess(<
                    ILoanRepayment[]
                  >data.Results);
                } else {
                  new NotLoadingTransactions()
                  return new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded.',
                    type: ToastTypes.ERROR
                  });
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingTransactions(),
                  new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                )
              )
            );
        })
      );

    @Effect()
    loadRepaymentsSchedule$: Observable<Action> = this.actions$
      .ofType<LoadRepaymentsScheduleDataTransaction>(
        TransactionsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION
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
                  this.store.dispatch(new NotProcessingTransactions());
                  return new LoadRepaymentsScheduleDataTransactionSuccess(<
                    ILoanRepayment[]
                  >data.Results);
                } else {
                  this.store.dispatch(new NotProcessingTransactions());
                  return new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded.',
                    type: ToastTypes.ERROR
                  });
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingTransactions(),
                  new ShowToast({
                    title: 'Data Item Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                )
              )
            );
        })
      );


      @Effect()
      loadPaymentsSchedule$: Observable<Action> = this.actions$
        .ofType<LoadActualScheduleData>(
          TransactionsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS
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
                    this.store.dispatch(new NotProcessingTransactions());
                    return new LoadActualScheduleDataSuccess(<
                      ILoanRepayment[]
                    >data.Results);
                  } else {
                    this.store.dispatch(new NotProcessingTransactions());
                    return new ShowToast({
                      title: 'Data Item Could Not Be Loaded',
                      message:
                        'Something went wrong. Form data could not be loaded.',
                      type: ToastTypes.ERROR
                    });
                  }
                }),
                catchError((error: any) =>
                  of(
                    new NotProcessingTransactions(),
                    new ShowToast({
                      title: 'Data Item Could Not Be Loaded',
                      message:
                        'Something went wrong. Form data could not be loaded. Error occured.',
                      type: ToastTypes.ERROR
                    })
                  )
                )
              );
          })
        );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataTransactions>(TransactionsActionTypes.LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs
            .getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingTransactions());
                return new LoadAwaitingApprovalDataTransactionsSuccess(<IApprovedLoan[]>(
                  data.Results));

              } else {
                this.store.dispatch(new NotProcessingTransactions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingTransactions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataTransactions>(TransactionsActionTypes.LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs
            .getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingTransactions());
                return new LoadApprovedDataTransactionsSuccess(<IApprovedLoan[]>(
                  data.Results

                ));
              } else {
                this.store.dispatch(new NotProcessingTransactions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingTransactions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


    @Effect()
    loadLoanDefinitionData$: Observable<Action> = this.actions$
      .ofType<LoadLoanTypesDataTransactions>(TransactionsActionTypes.LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.LOAN_DEFINITIONS_DATA_URLs
              .getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const transformed = this.utilService.transformToSelectDataList(data.Results, 'loan_id', 'description');
                  this.store.dispatch(new NotProcessingTransactions());
                  return new LoadLoanTypesDataTransactionsSuccess(
                    {
                      data: data.Results,
                      loanTypesTransformed: transformed
                    }

                  );
                } else {
                  this.store.dispatch(new NotProcessingTransactions());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingTransactions(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );



    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveDataTransactionApplication>(TransactionsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.LOAN_TRANSACTIONS_DATA_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingTransactions(),
                    new HideEditorTransactionApply(),
                    new LoadDataTransactions(),
                    new LoadAwaitingApprovalDataTransactions()
                  ]);
                } else {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new NotProcessingTransactions(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new SaveSuccessDataLoanApplication(false),
                  new NotProcessingTransactions(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedLoanTransaction>(TransactionsActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LOAN_TRANSACTIONS_DATA_URLs.delete}/${payload.loanDetailId}?employeeID=${payload.employeeId}`)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataTransactions(),
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );


  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalLoanTransaction>(TransactionsActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.LOAN_TRANSACTIONS_DATA_URLs.delete}/${payload.loanDetailId}?employeeID=${payload.employeeId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadAwaitingApprovalDataTransactions(),
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );


    @Effect()
    saveUpdateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateDataTransactionApplication>(TransactionsActionTypes.SAVE_UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = `${constants.LOAN_TRANSACTIONS_DATA_URLs.update}/${payload.recordId}/${payload.employeeId}`
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingTransactions(),
                    new HideEditorTransactionApply(),
                    new LoadDataTransactions(),
                    new LoadAwaitingApprovalDataTransactions()
                  ]);
                } else {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new NotProcessingTransactions(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new SaveSuccessDataLoanApplication(false),
                  new NotProcessingTransactions(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      loadDocument$: Observable<Action> = this.actions$
        .ofType<LoadDocumentTransaction>(TransactionsActionTypes.LOAD_DOCUMENT)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            const url = payload.isApproved?`${constants.PROXY_APPLICATIONS_DATA_URLs.documentApproved}`: constants.PROXY_APPLICATIONS_DATA_URLs.documentAwaiting;
            return this.apiService
              .read(`${url}/${payload.employeeId}/${payload.loanDetailId}`)
                .pipe(
                  map((data: IApiResult) => {
                    if (data.Success) {
                      let docData = null;

                      if (data.Results && data.Results.length > 0) {
                        const result = data.Results[0];
                        docData = this.utilService.getDocumentData(result.doc_binary, result.doc_extension);
                      }

                      return new LoadDocumentTransactionSuccess(docData);
                    } else {
                      return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                    )
                  )
                );
          })
        );

        @Effect()
        loadInlineDocument$: Observable<Action> = this.actions$
          .ofType<LoadInlineDocumentTransaction>(TransactionsActionTypes.LOAD_INLINE_DOCUMENT)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              const url = payload.isApproved?`${constants.LOAN_TRANSACTIONS_DATA_URLs.documentApproved}`: constants.LOAN_TRANSACTIONS_DATA_URLs.documentAwaiting;
              return this.apiService
                .read(`${url}/${payload.recordId}`)
                  .pipe(
                    map((data: IApiResult) => {
                      if (data.Success) {
                        let docData = null;

                        if (data.Results && data.Results.length > 0) {
                          const result = data.Results[0];
                          docData = this.utilService.getDocumentData(result.doc_binary, result.doc_extension);

                          return new Download(docData);
                        } else {
                          return new Download(null);
                        }
                      } else {
                        return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                      )
                    )
                  );
            })
          );

    }
