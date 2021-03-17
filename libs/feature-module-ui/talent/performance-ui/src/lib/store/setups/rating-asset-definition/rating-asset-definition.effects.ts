import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RatingAssetDefinitionActionTypes,
  LoadDataRatingAssetDefinition,
  LoadDataRatingAssetDefinitionSuccess,
  SaveRatingAssetDefinition,
  NotProcessingRatingAssetDefinition,
  HideEditorRatingAssetDefinition,
  DeleteDataRatingAssetDefinition,
  LoadDocumentRatingAssetDefinition,
  LoadDocumentRatingAssetDefinitionSuccess,
  LoadInlineDocumentRatingAssetDefinition,
  RemoveDataRatingAssetDefinition,
  AddRatingAssetDefinition,
  LoadPageDataRatingAssetDefinition,
  LoadPageDataRatingAssetDefinitionSuccess,
  LoadPageData360RatingAssetDefinition,
  LoadPageData360RatingAssetDefinitionSuccess,
  NotLoadingRatingAssetDefinition,
} from './rating-asset-definition.actions';
import { IRatingAssetDefinition, IPage } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class RatingAssetDefinitionEffects {
  constructor(private store: Store<IAppState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataRatingAssetDefinition>(RatingAssetDefinitionActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.RATING_ASSET_DEFINITION_URLs.getRatingAssetDefinitionDataByAssetId}/${payload.assetTypeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRatingAssetDefinition());
                return new LoadDataRatingAssetDefinitionSuccess(<IRatingAssetDefinition[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRatingAssetDefinition());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingRatingAssetDefinition(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
  loadPageData$: Observable<Action> = this.actions$
    .ofType<LoadPageDataRatingAssetDefinition>(RatingAssetDefinitionActionTypes.LOAD_PAGE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.RATING_ASSET_DEFINITION_URLs.getPageList}/${payload.pageType}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadPageDataRatingAssetDefinitionSuccess(<IPage[]>(
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
    load360PageData$: Observable<Action> = this.actions$
      .ofType<LoadPageData360RatingAssetDefinition>(RatingAssetDefinitionActionTypes.LOAD_360PAGE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.RATING_ASSET_DEFINITION_URLs.getPageList}/${payload.pageType}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadPageData360RatingAssetDefinitionSuccess(<IPage[]>(
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
    .ofType<AddRatingAssetDefinition>(RatingAssetDefinitionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.RATING_ASSET_DEFINITION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRatingAssetDefinition(),
                  new HideEditorRatingAssetDefinition(),
                  new LoadDataRatingAssetDefinition({assetTypeId: payload.assetTypeId})
                ]);
              } else {
                return from([
                  new NotProcessingRatingAssetDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRatingAssetDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveRatingAssetDefinition>(RatingAssetDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RATING_ASSET_DEFINITION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                console.log('rating asset info: ', payload);
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRatingAssetDefinition(),
                  new HideEditorRatingAssetDefinition(),
                  new LoadDataRatingAssetDefinition({assetTypeId: payload.assetTypeId})
                ]);
              } else {
                return from([
                  new NotProcessingRatingAssetDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRatingAssetDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataRatingAssetDefinition>(RatingAssetDefinitionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.RATING_ASSET_DEFINITION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataRatingAssetDefinition({assetTypeId: payload.assetTypeId})
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


}
