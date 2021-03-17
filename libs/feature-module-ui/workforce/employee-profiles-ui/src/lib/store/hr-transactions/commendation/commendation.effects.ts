import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadApprovedDataCommendation,
  LoadAwaitingApprovalDataCommendationSuccess,
  SaveCommendation,
  NotProcessingCommendation,
  HideEditorCommendation,
  DeleteDataCommendation,
  LoadDocumentCommendation,
  LoadDocumentCommendationSuccess,
  LoadInlineDocumentCommendation,
  AddCommendation,
  CommendationActionTypes,
  LoadApprovedDataCommendationSuccess,
  LoadAwaitingApprovalDataCommendation,
  LoadRoleTypeCommendation,
  LoadRoleTypeCommendationSuccess
} from './commendation.actions';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';

@Injectable()
export class CommendationEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataCommendation>(CommendationActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.COMMENDATIONS_URLs.loadApprovedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataCommendationSuccess(<ICommendationTransaction[]>(
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
    .ofType<LoadAwaitingApprovalDataCommendation>(CommendationActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.COMMENDATIONS_URLs.loadAwaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataCommendationSuccess(<ICommendationTransaction[]>(
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
    loadRoleTypes$: Observable<Action> = this.actions$
      .ofType<LoadRoleTypeCommendation>(CommendationActionTypes.LOAD_ROLE_TYPES)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.COMMENDATIONS_URLs.loadRoleTypes)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadRoleTypeCommendationSuccess(<ISelectOption[]>(
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
    .ofType<AddCommendation>(CommendationActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.COMMENDATIONS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingCommendation(),
                  new HideEditorCommendation(),
                  new LoadApprovedDataCommendation(),
                  new LoadAwaitingApprovalDataCommendation()
                ]);
              } else {
                return from([
                  new NotProcessingCommendation(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCommendation(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured with status: ` + error.status, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveCommendation>(CommendationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.COMMENDATIONS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingCommendation(),
                  new HideEditorCommendation(),
                  new LoadApprovedDataCommendation(),
                  new LoadAwaitingApprovalDataCommendation()
                ]);
              } else {
                return from([
                  new NotProcessingCommendation(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCommendation(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataCommendation>(CommendationActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.COMMENDATIONS_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataCommendation(),
                  new LoadAwaitingApprovalDataCommendation()
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
