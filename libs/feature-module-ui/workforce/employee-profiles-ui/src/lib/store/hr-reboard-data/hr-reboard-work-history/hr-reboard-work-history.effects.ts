import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardWorkHistoryActionTypes,
  LoadDataHrReboardWorkHistory,
  LoadDataHrReboardWorkHistorySuccess,
  SaveHrReboardWorkHistory,
  NotProcessingHrReboardWorkHistory,
  HideEditorHrReboardWorkHistory,
  LoadDocumentHrReboardWorkHistory,
  LoadDocumentHrReboardWorkHistorySuccess,
  LoadInlineDocumentHrReboardWorkHistory,
  SaveUpdateHrReboardWorkHistory,
  DeleteDataHrReboardWorkHistory
} from './hr-reboard-work-history.actions';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class HrReboardWorkHistoryEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_WORK_HISTORY_DATA_URLs.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardWorkHistorySuccess(<IPreviousEmployer[]>(data.Results));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_WORK_HISTORY_DATA_URLs.updateAwaitingApprovalData;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardWorkHistory(),
                  new HideEditorHrReboardWorkHistory(),
                  new LoadDataHrReboardWorkHistory({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardWorkHistory(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardWorkHistory(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_WORK_HISTORY_DATA_URLs.updateAwaitingApprovalData}?prevEmployerID=${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardWorkHistory(),
                  new HideEditorHrReboardWorkHistory(),
                  new LoadDataHrReboardWorkHistory({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardWorkHistory(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardWorkHistory(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.WORK_HISTORY.deleteApprovedData}/${payload.recordId}/${payload.employeeId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardWorkHistory({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_WORK_HISTORY_DATA_URLs.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);
                }

                return new LoadDocumentHrReboardWorkHistorySuccess(docData);
              } else {
                return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentHrReboardWorkHistory>(HrReboardWorkHistoryActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_WORK_HISTORY_DATA_URLs.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
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
                return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
}
