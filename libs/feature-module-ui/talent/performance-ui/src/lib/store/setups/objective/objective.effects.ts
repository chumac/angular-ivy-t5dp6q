import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ObjectiveActionTypes,
  LoadDataObjective,
  LoadDataObjectiveSuccess,
  SaveObjective,
  NotProcessingObjective,
  HideEditorObjective,
  DeleteDataObjective,
  LoadDocumentObjective,
  LoadDocumentObjectiveSuccess,
  LoadInlineDocumentObjective,
  RemoveDataObjective,
  AddObjective,
} from './objective.actions';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class ObjectiveEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataObjective>(ObjectiveActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.OBJECTIVE_URLs.getObjectiveData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataObjectiveSuccess(<IObjectiveDto[]>(
                  data.Results
                ));
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddObjective>(ObjectiveActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.OBJECTIVE_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingObjective(),
                  new HideEditorObjective(),
                  new LoadDataObjective()
                ]);
              } else {
                return from([
                  new NotProcessingObjective(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingObjective(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveObjective>(ObjectiveActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.OBJECTIVE_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingObjective(),
                  new HideEditorObjective(),
                  new LoadDataObjective()
                ]);
              } else {
                return from([
                  new NotProcessingObjective(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingObjective(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataObjective>(ObjectiveActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.OBJECTIVE_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataObjective()
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

  // @Effect()
  // loadDocument$: Observable<Action> = this.actions$
  //   .ofType<LoadDocumentObjective>(ObjectiveActionTypes.LOAD_DOCUMENT)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       const url = payload.isApproved?`${constants.OBJECTIVE_URLs.getDocument}`: constants.OBJECTIVE_URLs.documentAwaitingApproval;
  //       return this.apiService
  //         .read(`${url}/${payload.recordId}`)
  //           .pipe(
  //             map((data: IApiResult) => {
  //               if (data.Success) {
  //                 let docData = null;

  //                 if (data.Results && data.Results.length > 0) {
  //                   const result = data.Results[0];
  //                   docData = this.utilService.getDocumentData(result.data, result.extension);
  //                 }

  //                 return new LoadDocumentObjectiveSuccess(docData);
  //               } else {
  //                 return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
  //               }
  //             }),
  //             catchError((error: any) =>
  //               of(
  //                 new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
  //               )
  //             )
  //           );
  //     })
  //   );

  // @Effect()
  // loadInlineDocument$: Observable<Action> = this.actions$
  //   .ofType<LoadInlineDocumentObjective>(ObjectiveActionTypes.LOAD_INLINE_DOCUMENT)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       const url = `${constants.OBJECTIVE_URLs.getInlineDocument}`;
  //       return this.apiService
  //         .read(`${url}/${payload.recordId}`)
  //           .pipe(
  //             map((data: IApiResult) => {
  //               if (data.Success) {
  //                 let docData = null;

  //                 if (data.Results && data.Results.length > 0) {
  //                   const result = data.Results[0];
  //                   docData = this.utilService.getDocumentData(result.data, result.extension);

  //                   return new Download(docData);
  //                 } else {
  //                   return new Download(null);
  //                 }
  //               } else {
  //                 return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
  //               }
  //             }),
  //             catchError((error: any) =>
  //               of(
  //                 new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
  //               )
  //             )
  //           );
  //     })
  //   );

}
