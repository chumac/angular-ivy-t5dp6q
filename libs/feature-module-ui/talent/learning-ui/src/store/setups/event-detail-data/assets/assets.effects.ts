import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddAssets,
  AssetsActionTypes,
  DeleteDataAssets,
  LoadDataAssets,
  LoadDataAssetsSuccess,
  NotProcessingAssets,
  HideEditorAssets,
  LoadDataAvailableAssets,
  LoadDataAvailableAssetsSuccess,
  LoadDataAssetsType,
  LoadDataAssetsTypeSuccess,
  SaveAssets,
  LoadDocumentAssets,
  LoadDocumentAssetsSuccess
} from './assets.actions';
import { IEventDetailAssetAvaiability,IEventDetailAssetType, IEventDetailAssets } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class AssetsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadAssetsData$: Observable<Action> = this.actions$
    .ofType<LoadDataAssets>(AssetsActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_ASSETS_URLs.getEventDetailAssetsData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataAssetsSuccess(<IEventDetailAssets[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
  loadAssetsDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentAssets>(AssetsActionTypes.LOAD_ASSETS_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_ASSETS_URLs.getEventDetailAssetsDocument}/?docGuid=${payload.docGuid}`)
          .pipe(
            map((data: any) => {
              let docData = null;
              if (data.Success && data.Results) {
                docData = this.utilService.getDocumentData(data.Results[0], payload.docExt);
                return new LoadDocumentAssetsSuccess(docData);
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
    .ofType<AddAssets>(AssetsActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.EVENT_DETAIL_ASSETS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingAssets(),
                  new HideEditorAssets(),
                  new LoadDataAssets({ recordId: payload.eventDetailId })
                ]);
              } else {
                return from([
                  new NotProcessingAssets(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingAssets(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveAssets>(AssetsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_ASSETS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingAssets(),
                  new HideEditorAssets(),
                  new LoadDataAssets({ recordId: payload.eventDetailId })
                ]);
              } else {
                return from([
                  new NotProcessingAssets(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingAssets(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataAssets>(AssetsActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.EVENT_DETAIL_ASSETS_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataAssets({ recordId: payload.eventDetailId })
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

  @Effect()
  loadAssetsAvailability$: Observable<Action> = this.actions$
    .ofType<LoadDataAvailableAssets>(AssetsActionTypes.LOAD_DATA_AVAILABLE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_ASSETS_URLs.getAvailability)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataAvailableAssetsSuccess(<IEventDetailAssetAvaiability[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
  loadAssetsType$: Observable<Action> = this.actions$
    .ofType<LoadDataAssetsType>(AssetsActionTypes.LOAD_DATA_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_ASSETS_URLs.getAssetsType)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataAssetsTypeSuccess(<IEventDetailAssetType[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
}
