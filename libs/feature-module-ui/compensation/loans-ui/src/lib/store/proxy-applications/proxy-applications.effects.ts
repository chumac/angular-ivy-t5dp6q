import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import * as constants from '../../constants';
import { ProxyApplicationsActionTypes, LoadDataProxyApplications, NotProcessingProxyApplications, LoadDataProxyApplicationsSuccess, SaveDataProxyApplication, HideEditorProxyApply, SaveUpdateDataProxyApplication, LoadCurrenciesDataProxyApplications, LoadCurrenciesDataProxyApplicationsSuccess, LoadLoanTypesDataProxyApplications, LoadLoanTypesDataProxyApplicationsSuccess, LoadApprovedDataProxyApplications, LoadApprovedDataProxyApplicationsSuccess, LoadAwaitingApprovalDataProxyApplications, LoadAwaitingApprovalDataProxyApplicationsSuccess, LoadMonthlyDeductionAmountProxyApplication, LoadMonthlyDeductionAmountProxyApplicationSuccess, NotLoadingProxyApplications, LoadRepaymentsScheduleData, LoadRepaymentsScheduleDataSuccess, LoadActualScheduleData, LoadActualScheduleDataSuccess, LoadStandardScheduleData, LoadStandardScheduleDataSuccess, LoadGenericScheduleData, LoadGenericScheduleDataSuccess, DeleteApprovedLoanProxy, DeleteAwaitingApprovalLoanProxy, LoadDocumentProxyApplication, LoadDocumentProxyApplicationSuccess, LoadInlineDocumentProxyApplication } from './proxy-applications.actions';
import { IApprovedLoan, ILoanRepayment, ILoanSchedule } from '@nutela/models/compensation/loans';
import { ILoanState } from '../root';
import { SaveSuccessDataLoanApplication } from '../applications';

@Injectable()
export class ProxyApplicationsEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<ILoanState>) {}


  @Effect()
  loadProxyApplications$: Observable<Action> = this.actions$
    .ofType<LoadDataProxyApplications>(ProxyApplicationsActionTypes.LOAD_DATA_PROXY_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_TRANSACTIONS_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProxyApplications());
                return new LoadDataProxyApplicationsSuccess(<IApprovedLoan[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingProxyApplications());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProxyApplications(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadLoanCurrenciesData$: Observable<Action> = this.actions$
    .ofType<LoadCurrenciesDataProxyApplications>(ProxyApplicationsActionTypes.LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_CURRENCY_DATA_URLs
            .getDefault)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const currencyList = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                this.store.dispatch(new NotProcessingProxyApplications());
                return new LoadCurrenciesDataProxyApplicationsSuccess(<ISelectOption[]>(
                  currencyList

                ));
              } else {
                this.store.dispatch(new NotProcessingProxyApplications());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingProxyApplications(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataProxyApplications>(ProxyApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PROXY_APPLICATIONS_DATA_URLs
            .getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingProxyApplications());
                return new LoadAwaitingApprovalDataProxyApplicationsSuccess(<IApprovedLoan[]>(
                  data.Results));

              } else {
                this.store.dispatch(new NotProcessingProxyApplications());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingProxyApplications(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataProxyApplications>(ProxyApplicationsActionTypes.LOAD_APPROVED_DATA_PROXY_APPLICATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_APPLICATIONS_DATA_URLs
            .getApproved)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProxyApplications());
                return new LoadApprovedDataProxyApplicationsSuccess(<IApprovedLoan[]>(
                  data.Results

                ));
              } else {
                this.store.dispatch(new NotLoadingProxyApplications());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProxyApplications(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


    @Effect()
    loadLoanDefinitionData$: Observable<Action> = this.actions$
      .ofType<LoadLoanTypesDataProxyApplications>(ProxyApplicationsActionTypes.LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.LOAN_DEFINITIONS_DATA_URLs
              .getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const transformed = this.utilService.transformToSelectDataList(data.Results, 'loan_id', 'description');
                  this.store.dispatch(new NotProcessingProxyApplications());
                  return new LoadLoanTypesDataProxyApplicationsSuccess({
                    data: data.Results,
                    loanTypesTransformed: transformed
                  });
                } else {
                  this.store.dispatch(new NotProcessingProxyApplications());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingProxyApplications(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
        })
      );


      @Effect()
      loadMonthlyDeductionAmount$: Observable<Action> = this.actions$
        .ofType<LoadMonthlyDeductionAmountProxyApplication>(
          ProxyApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS
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
                    this.store.dispatch(new NotProcessingProxyApplications());
                    return new LoadMonthlyDeductionAmountProxyApplicationSuccess(<number
                    >data.Results[0]);
                  } else {
                    this.store.dispatch(new NotProcessingProxyApplications());
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
                    new NotProcessingProxyApplications(),
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
            ProxyApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION
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
                      this.store.dispatch(new NotProcessingProxyApplications());
                      return new LoadRepaymentsScheduleDataSuccess(<
                        ILoanRepayment[]
                      >data.Results);
                    } else {
                      this.store.dispatch(new NotProcessingProxyApplications());
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
                      new NotProcessingProxyApplications(),
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
        loadPaymentsSchedule$: Observable<Action> = this.actions$
          .ofType<LoadActualScheduleData>(
            ProxyApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION
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
                      this.store.dispatch(new NotProcessingProxyApplications());
                      return new LoadActualScheduleDataSuccess(<
                        ILoanRepayment[]
                      >data.Results);
                    } else {
                      this.store.dispatch(new NotProcessingProxyApplications());
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
                      new NotProcessingProxyApplications(),
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
        loadLoansSchedules$: Observable<Action> = this.actions$
          .ofType<LoadStandardScheduleData>(
            ProxyApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION
          )
          .pipe(
            map(action => action.payload),
            mergeMap(payload => {
              return this.apiService
                .read(
                  `${constants.LOAN_APPLICATIONS_DATA_URLs.getSchedule}/${
                    payload.recordId
                  }`
                )
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      this.store.dispatch(new NotProcessingProxyApplications());
                      return new LoadStandardScheduleDataSuccess(<
                        ILoanSchedule[]
                      >data.Results);
                    } else {
                      new NotProcessingProxyApplications()
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
                      new NotProcessingProxyApplications(),
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
            ProxyApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION
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
                      this.store.dispatch(new NotProcessingProxyApplications());
                      return new LoadGenericScheduleDataSuccess(<
                        ILoanRepayment[]
                      >data.Results);
                    } else {
                      new NotProcessingProxyApplications()
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
                      new NotProcessingProxyApplications(),
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

        // @Effect()
        // loadDocumentProxy$: Observable<Action> = this.actions$
        //   .ofType<LoadDocumentProxyApplication>(ProxyApplicationsActionTypes.LOAD_DOCUMENT)
        //   .pipe(
        //     map(action => action.payload),
        //     mergeMap(payload => {
        //       return this.apiService
        //         .read(
        //           `${constants.LOAN_APPLICATIONS_DATA_URLs.getGenericSchedule}/${
        //             payload.loanId
        //           }/${payload.loanAmount}/${payload.interestRate}/${payload.tenor}?effective_date=${payload.effectiveDate}`
        //         )
        //         .pipe(
        //           map((data: any) => {
        //             if (data.Success && data.Results) {
        //               this.store.dispatch(new NotProcessingProxyApplications());
        //               return new LoadGenericScheduleDataSuccess(<
        //                 ILoanRepayment[]
        //               >data.Results);
        //             } else {
        //               new NotProcessingProxyApplications()
        //               return new ShowToast({
        //                 title: 'Data Item Could Not Be Loaded',
        //                 message:
        //                   'Something went wrong. Form data could not be loaded.',
        //                 options: toastOptionsError()
        //               });
        //             }
        //           }),
        //           catchError((error: any) =>
        //             of(
        //               new NotProcessingProxyApplications(),
        //               new ShowToast({
        //                 title: 'Data Item Could Not Be Loaded',
        //                 message:
        //                   'Something went wrong. Form data could not be loaded. Error occured.',
        //                 options: toastOptionsError()
        //               })
        //             )
        //           )
        //         );
        //     })
        //   );

          @Effect()
          deleteApprovedData$: Observable<Action> = this.actions$
            .ofType<DeleteApprovedLoanProxy>(ProxyApplicationsActionTypes.DELETE_APPROVED_DATA)
            .pipe(
              map(action => action.payload),
              switchMap(payload => {
                return this.apiService
                  .delete(`${constants.PROXY_APPLICATIONS_DATA_URLs.delete}/${payload.loanDetailId}?employeeID=${payload.employeeId}`)
                  .pipe(
                    switchMap((data: IApiResult) => {

                      if (data.Success) {
                        return from([
                          new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                          new LoadApprovedDataProxyApplications(),
                        ]);
                      } else {
                        return from([
                          new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                        ]);
                      }
                    }),
                    catchError((error: any) =>
                      from([
                        new ShowToast({title: 'Data Could Not Be Deleted', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                      ])
                    )
                  );
              })
            );


          @Effect()
          deleteAwaitingApprovalData$: Observable<Action> = this.actions$
            .ofType<DeleteAwaitingApprovalLoanProxy>(ProxyApplicationsActionTypes.DELETE_AWAITING_APPROVAL_DATA)
            .pipe(
              map(action => action.payload),
              switchMap(payload => {
                return this.apiService
                .delete(`${constants.PROXY_APPLICATIONS_DATA_URLs.delete}/${payload.loanDetailId}?employeeID=${payload.employeeId}`)
                  .pipe(
                    switchMap((data: IApiResult) => {
                      if (data.Success) {
                        return from([
                          new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                          new LoadAwaitingApprovalDataProxyApplications(),
                        ]);
                      } else {
                        return from([
                          new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                        ]);
                      }
                    }),
                    catchError((error: any) =>
                      from([
                        new ShowToast({title: 'Data Could Not Be Deleted', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                      ])
                    )
                  );
              })
            );


    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveDataProxyApplication>(ProxyApplicationsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.PROXY_APPLICATIONS_DATA_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingProxyApplications(),
                    new HideEditorProxyApply(),
                    new LoadDataProxyApplications(),
                    new LoadAwaitingApprovalDataProxyApplications()
                  ]);
                } else {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new NotProcessingProxyApplications(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new SaveSuccessDataLoanApplication(false),
                  new NotProcessingProxyApplications(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

    @Effect()
    saveUpdateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateDataProxyApplication>(ProxyApplicationsActionTypes.SAVE_UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = `${constants.PROXY_APPLICATIONS_DATA_URLs.update}/${payload.recordId}`
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingProxyApplications(),
                    new HideEditorProxyApply(),
                    new LoadDataProxyApplications(),
                    new LoadAwaitingApprovalDataProxyApplications()
                  ]);
                } else {
                  return from([
                    new SaveSuccessDataLoanApplication(data.Success),
                    new NotProcessingProxyApplications(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new SaveSuccessDataLoanApplication(false),
                  new NotProcessingProxyApplications(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      loadDocument$: Observable<Action> = this.actions$
        .ofType<LoadDocumentProxyApplication>(ProxyApplicationsActionTypes.LOAD_DOCUMENT)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            const url = payload.isApproved?`${constants.PROXY_APPLICATIONS_DATA_URLs.documentApproved}`: `${constants.PROXY_APPLICATIONS_DATA_URLs.documentAwaiting}`;
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

                      return new LoadDocumentProxyApplicationSuccess(docData);
                    } else {
                      return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured. ' + JSON.stringify(error), options: toastOptionsError()})
                    )
                  )
                );
          })
        );


        @Effect()
        loadInlineDocument$: Observable<Action> = this.actions$
          .ofType<LoadInlineDocumentProxyApplication>(ProxyApplicationsActionTypes.LOAD_INLINE_DOCUMENT)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              const url = payload.isApproved?`${constants.PROXY_APPLICATIONS_DATA_URLs.documentApproved}`: constants.PROXY_APPLICATIONS_DATA_URLs.documentAwaiting;
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
                        return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                      )
                    )
                  );
            })
          );
    }
