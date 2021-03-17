import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import {
  ApiService,
  UtilService
} from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import {
  NotProcessingHRProcessData,
  LoadEmployeeSubmittedLetter,
  LoadEmployeeSubmittedLetterSuccess,
  HrProcessActionTypes,
  LoadEmployeeProcessListData,
  LoadEmployeeProcessListDataSuccess,
  NotLoadingEmployeeProcessData,
  LoadDataFinalizeWorkflow,
  LoadDataFinalizeWorkflowSuccess,
  LoadEmployeeLetterDocumentSuccess,
  LoadChecklistTransactionsHR,
  LoadChecklistTransactionsHRSuccess,
  SubmitChecklistTransactionHR,
  SubmitChecklistTransactionHRSuccess,
  SubmitExitSeparationTransaction,
  ShowSeparationEditor,
} from './hr-process.actions';
import { ToastTypes } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { IResignationLetter, IProcessStep } from '../../interfaces';
import { NotProcessingSeparationTransaction } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/hr-transactions/separation';
import { CHECKLIST_ACTIONS } from '../../constants';
import { ProcessingRedirectData, ProcessingSaveData } from '../process';
import { MatDialogRef } from '@angular/material';
import { EmployeeSelectorComponent } from '../../components/employee-selector/employee-selector.component';

@Injectable()
export class HrProcessEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService,
    private location: Location,
    public dialogRef: MatDialogRef<EmployeeSelectorComponent>,
  ) { }

  @Effect()
  loadEmployeeSubmittedLetter$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeSubmittedLetter>(
      HrProcessActionTypes.LOAD_EMPLOYEE_SUBMITTED_LETTER
    )
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_EXIT_DATA_URLs.getEmployeeLetter}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                if (data.Results[0] && data.Results[0].doc_binary) {
                  const result = data.Results[0];
                  const docData = this.utilService.getDocumentData(
                    result.doc_binary,
                    result.doc_extension
                  );

                  this.store.dispatch(new LoadEmployeeLetterDocumentSuccess(docData));
                }

                return new LoadEmployeeSubmittedLetterSuccess(<
                  IResignationLetter
                  >data.Results[0]);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured. SUBMITTED LETTER',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadEmployeeProcessListData$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeProcessListData>(
      HrProcessActionTypes.LOAD_EMPLOYEE_PROCESS_DATA
    )
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.HR_EXIT_DATA_URLs.getEmployeeProcess}/${payload.employeeId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeProcessData());
                return new LoadEmployeeProcessListDataSuccess(<IProcessStep[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEmployeeProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingEmployeeProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured. PROCESS LIST',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );


  @Effect()
  loadChecklistTransactions$: Observable<Action> = this.actions$
    .ofType<LoadChecklistTransactionsHR>(HrProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_EXIT_DATA_URLs.getChecklistTransactions}/${payload.resignationId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeProcessData());
                return new LoadChecklistTransactionsHRSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingEmployeeProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingEmployeeProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
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
  submitChecklistTransaction$: Observable<Action> = this.actions$
    .ofType<SubmitChecklistTransactionHR>(HrProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_EXIT_DATA_URLs.submitChecklistTransaction}/${payload.employeeId}/${payload.resignationId}`;
        return this.apiService.update(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              this.store.dispatch(new LoadChecklistTransactionsHR({ resignationId: payload.resignationId, employeeId: payload.employeeId }));
              this.store.dispatch(new SubmitChecklistTransactionHRSuccess(data.Success));

              switch (payload.requestType) {
                case CHECKLIST_ACTIONS.submit:
                  this.store.dispatch(new NotProcessingHRProcessData());
                  this.location.back();
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was submitted successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                case CHECKLIST_ACTIONS.save:
                  this.store.dispatch(new ProcessingSaveData(false));
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was saved successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                case CHECKLIST_ACTIONS.redirect:
                  this.store.dispatch(new ProcessingRedirectData(false));
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was Redirected successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                default:
                  break;
              }
            } else {
              this.store.dispatch(new SubmitChecklistTransactionHRSuccess(data.Success));
              this.store.dispatch(new ProcessingSaveData(false));
              this.store.dispatch(new ProcessingRedirectData(false));
              return from([
                new NotProcessingHRProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingHRProcessData(),
              new ProcessingSaveData(false),
              new ProcessingRedirectData(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  error.status == 401
                    ? error.error.ErrorMessage
                    : `Something went wrong. Form data could not be saved. Error occured.`,
                type: ToastTypes.ERROR
              })
            ])
          )
        );
      })
    );

  @Effect()
  submitSeparationTransaction$: Observable<Action> = this.actions$
      .ofType<SubmitExitSeparationTransaction>(HrProcessActionTypes.SUBMIT_EXIT_SEPARATION_TRANSACTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_EXIT_DATA_URLs.creatSeparationTransaction}`;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              this.store.dispatch(new NotProcessingSeparationTransaction());
              this.store.dispatch(new LoadEmployeeSubmittedLetter({ employeeId: payload.data.employee_id }));
              this.store.dispatch(new LoadEmployeeProcessListData({ employeeId: payload.data.employee_id }));
              this.store.dispatch(new ShowSeparationEditor(false));
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              this.store.dispatch(new NotProcessingSeparationTransaction());
              return from([
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingSeparationTransaction(),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  error.status == 401
                    ? error.error.ErrorMessage
                    : `Something went wrong. Form data could not be saved. Error occured.`,
                type: ToastTypes.ERROR
              })
            ])
          )
        );
      })
    );


  @Effect()
  loadFinalizeWorkflow$: Observable<Action> = this.actions$
    .ofType<LoadDataFinalizeWorkflow>(
      HrProcessActionTypes.LOAD_DATA_FINALIZE_WORKFLOW
    )
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.HR_EXIT_DATA_URLs.getFinalizeWorkflow}/${payload.msgId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFinalizeWorkflowSuccess(<boolean>(data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );
}
