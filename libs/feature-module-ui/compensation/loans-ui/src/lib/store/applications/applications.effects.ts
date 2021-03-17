import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  ApiService,
  UtilService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import {
  ApplicationsActionTypes,
  LoadApprovedDataApplication,
  LoadApprovedDataApplicationSuccess,
  LoadAwaitingApprovalDataApplication,
  LoadAwaitingApprovalDataApplicationSuccess,
  NotProcessingApplication,
  SaveDataLoanApplication,
  HideEditorApply,
  LoadLoanDefinitionDataApplication,
  LoadLoanDefinitionDataApplicationSuccess,
  LoadLoanCurrencyDataApplication,
  LoadLoanCurrencyDataApplicationSuccess,
  LoadRepaymentsScheduleData,
  LoadRepaymentsScheduleDataSuccess,
  LoadActualScheduleData,
  LoadActualScheduleDataSuccess,
  LoadAllDataApplication,
  LoadAllDataApplicationSuccess,
  LoadStandardScheduleData,
  LoadStandardScheduleDataSuccess,
  LoadMonthlyDeductionAmount,
  LoadMonthlyDeductionAmountSuccess,
  NotLoadingApplication,
  LoadGenericScheduleData,
  LoadGenericScheduleDataSuccess,
  LoadDocumentApplication,
  LoadDocumentApplicationSuccess,
  LoadInlineDocumentApplication,
  SaveSuccessDataLoanApplication
} from './applications.actions';
import * as constants from '../../constants';
import {
  ILoanRepayment,
  ILoanSchedule,
  ILoanDefinition
} from '@nutela/models/compensation/loans';
import { ILoanState } from '../root';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILoanState>
  ) {}

  @Effect()
  loadAllApplicationsData$: Observable<Action> = this.actions$
    .ofType<LoadAllDataApplication>(
      ApplicationsActionTypes.LOAD_ALL_DATA_APPLICATION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_APPLICATIONS_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingApplication());
                return new LoadAllDataApplicationSuccess(<any[]>data.Results);
              } else {
                this.store.dispatch(new NotLoadingApplication());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingApplication(),
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
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataApplication>(
      ApplicationsActionTypes.LOAD_APPROVED_DATA_APPLICATION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_APPLICATIONS_DATA_URLs.getApproved)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingApplication());
                return new LoadApprovedDataApplicationSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingApplication());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingApplication(),
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
  loadAwaitingapprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataApplication>(
      ApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_APPLICATION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_APPLICATIONS_DATA_URLs.getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingApplication());
                return new LoadAwaitingApprovalDataApplicationSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingApplication());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingApplication(),
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
  loadLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadLoanDefinitionDataApplication>(
      ApplicationsActionTypes.LOAD_LOAN_DEFINITION_DATA_APPLICATION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const loanTypesTransformed = this.utilService.transformToSelectDataList(
                  data.Results,
                  'loan_id',
                  'description'
                );
                this.store.dispatch(new NotProcessingApplication());
                return new LoadLoanDefinitionDataApplicationSuccess({
                  data: <ILoanDefinition[]>data.Results,
                  loanTypesSelect: loanTypesTransformed
                });
              } else {
                this.store.dispatch(new NotProcessingApplication());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingApplication(),
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
  loadRepaymentsSchedule$: Observable<Action> = this.actions$
    .ofType<LoadRepaymentsScheduleData>(
      ApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_REPAYMENTS_DATA_URLs.getByDetailId}/${
              payload.recordId
            }`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingApplication());
                return new LoadRepaymentsScheduleDataSuccess(<ILoanRepayment[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingApplication());
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
                new NotProcessingApplication(),
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
      ApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getPaymentsSchedule}/${
              payload.recordId
            }`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingApplication());
                return new LoadActualScheduleDataSuccess(<ILoanRepayment[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingApplication());
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
                new NotProcessingApplication(),
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
      ApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_APPLICATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getSchedule}/${
              payload.recordId
            }`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingApplication());
                return new LoadStandardScheduleDataSuccess(<ILoanSchedule[]>(
                  data.Results
                ));
              } else {
                new NotProcessingApplication();
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
                new NotProcessingApplication(),
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
      ApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_APPLICATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getGenericSchedule}/${
              payload.loanId
            }/${payload.loanAmount}/${payload.interestRate}/${
              payload.tenor
            }?effective_date=${payload.effectiveDate}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingApplication());
                return new LoadGenericScheduleDataSuccess(<ILoanRepayment[]>(
                  data.Results
                ));
              } else {
                new NotProcessingApplication();
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
                new NotProcessingApplication(),
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
  loadMonthlyDeductionAmount$: Observable<Action> = this.actions$
    .ofType<LoadMonthlyDeductionAmount>(
      ApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_APPLICATIONS_DATA_URLs.getMonthlyDeduction}/${
              payload.rate
            }/${payload.period}/${payload.principal}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingApplication());
                return new LoadMonthlyDeductionAmountSuccess(<number>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotProcessingApplication());
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
                new NotProcessingApplication(),
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
  loadLoanCurrencyData$: Observable<Action> = this.actions$
    .ofType<LoadLoanCurrencyDataApplication>(
      ApplicationsActionTypes.LOAD_LOAN_CURRENCY_DATA_APPLICATION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_CURRENCY_DATA_URLs.getDefault)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const currencyList = this.utilService.transformToSelectDataList(
                  data.Results,
                  'currency_id',
                  'currency_name'
                );
                this.store.dispatch(new NotProcessingApplication());
                return new LoadLoanCurrencyDataApplicationSuccess(<
                  ISelectOption[]
                >currencyList);
              } else {
                this.store.dispatch(new NotProcessingApplication());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingApplication(),
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
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentApplication>(ApplicationsActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved
          ? `${constants.LOAN_APPLICATIONS_DATA_URLs.documentApproved}`
          : constants.LOAN_APPLICATIONS_DATA_URLs.documentAwaiting;
        return this.apiService.read(`${url}/${payload.loanDetailId}`).pipe(
          map((data: IApiResult) => {
            if (data.Success) {
              let docData = null;

              if (data.Results && data.Results.length > 0) {
                const result = data.Results[0];
                docData = this.utilService.getDocumentData(
                  result.doc_binary,
                  result.doc_extension
                );
              }

              return new LoadDocumentApplicationSuccess(docData);
            } else {
              return new ShowToast({
                title: 'Document Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Document Could Not Be Loaded',
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
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentApplication>(
      ApplicationsActionTypes.LOAD_INLINE_DOCUMENT
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved
          ? `${constants.LOAN_APPLICATIONS_DATA_URLs.documentApproved}`
          : constants.LOAN_APPLICATIONS_DATA_URLs.documentAwaiting;
        return this.apiService.read(`${url}/${payload.recordId}`).pipe(
          map((data: IApiResult) => {
            if (data.Success) {
              let docData = null;

              if (data.Results && data.Results.length > 0) {
                const result = data.Results[0];
                docData = this.utilService.getDocumentData(
                  result.doc_binary,
                  result.doc_extension
                );

                return new Download(docData);
              } else {
                return new Download(null);
              }
            } else {
              return new ShowToast({
                title: 'Document Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Document Could Not Be Loaded',
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
    .ofType<SaveDataLoanApplication>(ApplicationsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.LOAN_APPLICATIONS_DATA_URLs.apply;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new SaveSuccessDataLoanApplication(data.Success),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  options: toastOptionsSuccess()
                }),
                new NotProcessingApplication(),
                new HideEditorApply(),
                new LoadApprovedDataApplication(),
                new LoadAwaitingApprovalDataApplication()
              ]);
            } else {
              return from([
                new SaveSuccessDataLoanApplication(data.Success),
                new NotProcessingApplication(),
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
              new SaveSuccessDataLoanApplication(false),
              new NotProcessingApplication(),
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
}
