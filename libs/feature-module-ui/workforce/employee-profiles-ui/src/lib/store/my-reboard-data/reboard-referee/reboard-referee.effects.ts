import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  ReboardRefereeActionTypes,
  LoadDataReboardReferee,
  LoadDataReboardRefereeSuccess,
  SaveReboardReferee,
  NotProcessingReboardReferee,
  HideEditorReboardReferee,
  LoadDocumentReboardReferee,
  LoadDocumentReboardRefereeSuccess,
  LoadInlineDocumentReboardReferee,
  LoadPhotoReboardReferee,
  LoadPhotoReboardRefereeSuccess,
  SaveUpdateReboardReferee,
  DeleteDataReboardReferee
} from './reboard-referee.actions';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardRefereeEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardReferee>(ReboardRefereeActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_REFEREES_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardRefereeSuccess(<IReferee[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardReferee>(ReboardRefereeActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_REFEREES_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardReferee(),
                  new HideEditorReboardReferee(),
                  new LoadDataReboardReferee(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardReferee(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardReferee(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardReferee>(ReboardRefereeActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_REFEREES_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardReferee(),
                  new HideEditorReboardReferee(),
                  new LoadDataReboardReferee(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardReferee(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardReferee(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardReferee>(ReboardRefereeActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.REBOARD_REFEREES_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataReboardReferee(),
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
    .ofType<LoadDocumentReboardReferee>(ReboardRefereeActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_REFEREES_DATA_URLs.document;
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

                  return new LoadDocumentReboardRefereeSuccess(docData);
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
    .ofType<LoadInlineDocumentReboardReferee>(ReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_REFEREES_DATA_URLs.document;
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
    loadPhoto$: Observable<Action> = this.actions$
      .ofType<LoadPhotoReboardReferee>(ReboardRefereeActionTypes.LOAD_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.REBOARD_REFEREES_DATA_URLs.image}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadPhotoReboardRefereeSuccess(photo);
                } else {
                  return new LoadPhotoReboardRefereeSuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Approved Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
                )
              )
            );
        })
      );
}
