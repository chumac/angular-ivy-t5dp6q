import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadApprovedDataConfirmation,
  LoadAwaitingApprovalDataConfirmationSuccess,
  SaveConfirmation,
  NotProcessingConfirmation,
  HideEditorConfirmation,
  DeleteDataConfirmation,
  LoadDocumentConfirmation,
  LoadDocumentConfirmationSuccess,
  LoadInlineDocumentConfirmation,
  AddConfirmation,
  ConfirmationActionTypes,
  LoadApprovedDataConfirmationSuccess,
  LoadAwaitingApprovalDataConfirmation,
  LoadTransactionTypeConfirmation,
  LoadTransactionTypeConfirmationSuccess
} from './confirmation.actions';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';

@Injectable()
export class ConfirmationEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataConfirmation>(ConfirmationActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CONFIRMATIONS_URLs.loadApprovedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataConfirmationSuccess(<IConfirmationTransaction[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataConfirmation>(ConfirmationActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CONFIRMATIONS_URLs.loadAwaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataConfirmationSuccess(<IConfirmationTransaction[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

    @Effect()
    loadTransactionTypes$: Observable<Action> = this.actions$
      .ofType<LoadTransactionTypeConfirmation>(ConfirmationActionTypes.LOAD_TRANSACTION_TYPES)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.CONFIRMATIONS_URLs.loadTransactionTypes)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadTransactionTypeConfirmationSuccess(<ISelectOption[]>(
                    resultset
                  ));
                } else {
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddConfirmation>(ConfirmationActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CONFIRMATIONS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingConfirmation(),
                  new HideEditorConfirmation(),
                  new LoadApprovedDataConfirmation(),
                  new LoadAwaitingApprovalDataConfirmation()
                ]);
              } else {
                return from([
                  new NotProcessingConfirmation(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingConfirmation(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveConfirmation>(ConfirmationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CONFIRMATIONS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingConfirmation(),
                  new HideEditorConfirmation(),
                  new LoadApprovedDataConfirmation(),
                  new LoadAwaitingApprovalDataConfirmation()
                ]);
              } else {
                return from([
                  new NotProcessingConfirmation(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingConfirmation(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataConfirmation>(ConfirmationActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CONFIRMATIONS_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataConfirmation(),
                  new LoadAwaitingApprovalDataConfirmation()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

    mockData = [
      {
        id: 1,
        employee_id: 1,
        transaction_type: '2',
        appraisal_score: 58,
        appraisal_period: '2019 Financial Year',
        effective_date: new Date(), 
        defer_time: 2,
        proposed_confirm_date: new Date(),
        EmployeeInfo: {
          employee_number: "X365-V2_01",
          employee_surname: "Obasi",
          employee_midname: "David",
          employee_firstname: "Duke"
        },
        transaction_date: new Date(),
        AppraisalPeriodInfo: null,
      },
      {
        id: 2,
        employee_id: 2,
        transaction_type: '2',
        appraisal_score: 58,
        appraisal_period: '2019 Monetary Policy Year',
        effective_date: new Date(), 
        defer_time: 21,
        proposed_confirm_date: new Date(),
        EmployeeInfo: {
          employee_number: "X365-V2_01",
          employee_surname: "Ohu",
          employee_midname: "Samuel",
          employee_firstname: "Oluwasegun"
        },
        transaction_date: new Date(),
        AppraisalPeriodInfo: null,
      },
      {
        id: 1,
        employee_id: 1,
        transaction_type: '2',
        appraisal_score: 58,
        appraisal_period: 'Health & Insurance Year',
        effective_date: new Date(), 
        defer_time: 2,
        proposed_confirm_date: new Date(),
        EmployeeInfo: {
          employee_number: "X365-V2_02",
          employee_surname: "Ossai",
          employee_midname: "Isiewu",
          employee_firstname: "Chukwudi"
        },
        transaction_date: new Date(),
        AppraisalPeriodInfo: null,
      },
      {
        id: 1,
        employee_id: 1,
        transaction_type: '2',
        appraisal_score: 90,
        appraisal_period: 'Flexing and holidays',
        effective_date: new Date(), 
        defer_time: 2,
        proposed_confirm_date: new Date(),
        EmployeeInfo: {
          employee_number: "X365-V2_03",
          employee_surname: "Obasi",
          employee_midname: "David",
          employee_firstname: "Duke"
        },
        transaction_date: new Date(),
        AppraisalPeriodInfo: null,
      },
    ];

}
