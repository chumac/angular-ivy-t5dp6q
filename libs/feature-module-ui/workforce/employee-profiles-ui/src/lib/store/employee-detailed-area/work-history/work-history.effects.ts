import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  HRWorkHistoryActionTypes,
  LoadApprovedDataHRWorkHistory,
  LoadApprovedDataHRWorkHistorySuccess,
  LoadAwaitingApprovalDataHRWorkHistory,
  LoadAwaitingApprovalDataHRWorkHistorySuccess,
  SaveHRWorkHistory,
  NotProcessingHRWorkHistory,
  HideEditorHRWorkHistory,
  DeleteApprovedDataHRWorkHistory,
  DeleteAwaitingApprovalDataHRWorkHistory,
  LoadDocumentHRWorkHistory,
  LoadDocumentHRWorkHistorySuccess,
  LoadInlineDocumentHRWorkHistory,
  LoadDataHRWorkHistory
} from './work-history.actions';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class HRWorkHistoryEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataHRWorkHistory>(HRWorkHistoryActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.WORK_HISTORY.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingHRWorkHistory());
                return new LoadApprovedDataHRWorkHistorySuccess(<IPreviousEmployer[]>(data.Results));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataHRWorkHistory>(
      HRWorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.WORK_HISTORY.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadAwaitingApprovalDataHRWorkHistorySuccess(<IPreviousEmployer[]>(data.Results));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHRWorkHistory>(HRWorkHistoryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode?`${constants.WORK_HISTORY.update}?prevEmployerID=${payload.recordId}&employeeID=${payload.employeeId}`: `${constants.WORK_HISTORY.add}?employeeID=${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHRWorkHistory(),
                  new HideEditorHRWorkHistory(),
                  new LoadApprovedDataHRWorkHistory({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRWorkHistory({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingHRWorkHistory(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHRWorkHistory(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataHRWorkHistory>(HRWorkHistoryActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.WORK_HISTORY.deleteApprovedData}?prevEmployerID=${payload.recordId}&employeeID=${payload.employeeId}`,null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataHRWorkHistory({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRWorkHistory({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );


  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataHRWorkHistory>(HRWorkHistoryActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.WORK_HISTORY.deleteAwaitingApprovalData}/${payload.employeeId}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataHRWorkHistory({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRWorkHistory({employeeId:payload.employeeId}),
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    loadInlineDocument$: Observable<Action> = this.actions$
      .ofType<LoadInlineDocumentHRWorkHistory>(HRWorkHistoryActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.isApproved?`${constants.WORK_HISTORY.documentApproved}`: constants.WORK_HISTORY.documentAwaitingApproval;
          return this.apiService
            .read(`${url}/${payload.employeeId}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success) {
                    let docData = null;
  
                    if (data.Results && data.Results.length > 0) {
                      const result = data.Results[0];
                      docData = this.utilService.getDocumentData(result.data, result.extension);
  
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
