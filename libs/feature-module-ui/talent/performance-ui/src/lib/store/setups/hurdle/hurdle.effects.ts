import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  HurdleActionTypes,
  LoadDataHurdle,
  LoadDataHurdleSuccess,
  SaveHurdle,
  NotProcessingHurdle,
  HideEditorHurdle,
  DeleteDataHurdle,
  LoadDocumentHurdle,
  LoadDocumentHurdleSuccess,
  LoadInlineDocumentHurdle,
  RemoveDataHurdle,
  AddHurdle,
} from './hurdle.actions';
import { IHurdle } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class HurdleEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHurdle>(HurdleActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HURDLE_URLs.getHurdleData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHurdleSuccess(<IHurdle[]>(
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
    .ofType<AddHurdle>(HurdleActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.HURDLE_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHurdle(),
                  new HideEditorHurdle(),
                  new LoadDataHurdle()
                ]);
              } else {
                return from([
                  new NotProcessingHurdle(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHurdle(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveHurdle>(HurdleActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HURDLE_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHurdle(),
                  new HideEditorHurdle(),
                  new LoadDataHurdle()
                ]);
              } else {
                return from([
                  new NotProcessingHurdle(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHurdle(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHurdle>(HurdleActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.HURDLE_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataHurdle()
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
  //   .ofType<LoadDocumentHurdle>(HurdleActionTypes.LOAD_DOCUMENT)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       const url = payload.isApproved?`${constants.HURDLE_URLs.getDocument}`: constants.HURDLE_URLs.documentAwaitingApproval;
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

  //                 return new LoadDocumentHurdleSuccess(docData);
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
  //   .ofType<LoadInlineDocumentHurdle>(HurdleActionTypes.LOAD_INLINE_DOCUMENT)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       const url = `${constants.HURDLE_URLs.getInlineDocument}`;
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
