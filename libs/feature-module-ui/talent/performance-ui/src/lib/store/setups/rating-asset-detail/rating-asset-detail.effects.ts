import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RatingAssetDetailActionTypes,
  LoadDataRatingAssetDetail,
  LoadDataRatingAssetDetailSuccess,
  SaveRatingAssetDetail,
  NotProcessingRatingAssetDetail,
  HideEditorRatingAssetDetail,
  DeleteDataRatingAssetDetail,
  LoadDocumentRatingAssetDetail,
  LoadDocumentRatingAssetDetailSuccess,
  LoadInlineDocumentRatingAssetDetail,
  RemoveDataRatingAssetDetail,
  AddRatingAssetDetail,
  LoadRatingTableRatingAssetDetail,
  LoadRatingTableRatingAssetDetailSuccess,
} from './rating-asset-detail.actions';
import { IRatingAssetDetail, IRatingAssetDefinition } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class RatingAssetDetailEffects {
  constructor(private store: Store<IAppState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataRatingAssetDetail>(RatingAssetDetailActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.RATING_ASSET_DETAIL_URLs.getRatingAssetDetailData}/${payload.ratingDefId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingRatingAssetDetail());
                return new LoadDataRatingAssetDetailSuccess(<IRatingAssetDetail[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingRatingAssetDetail());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) => {
              this.store.dispatch(new NotProcessingRatingAssetDetail());
              return of(
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              })
            );
       })
    );

    @Effect()
    loadTableData$: Observable<Action> = this.actions$
      .ofType<LoadRatingTableRatingAssetDetail>(RatingAssetDetailActionTypes.LOAD_RATING_TABLE_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.RATING_ASSET_DETAIL_URLs.getRatingAssetTableData)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadRatingTableRatingAssetDetailSuccess(<IRatingAssetDefinition[]>(
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
    .ofType<AddRatingAssetDetail>(RatingAssetDetailActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.RATING_ASSET_DETAIL_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRatingAssetDetail(),
                  new HideEditorRatingAssetDetail(),
                  new LoadDataRatingAssetDetail({ratingDefId: payload.ratingDefId})
                ]);
              } else {
                return from([
                  new NotProcessingRatingAssetDetail(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRatingAssetDetail(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveRatingAssetDetail>(RatingAssetDetailActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RATING_ASSET_DETAIL_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRatingAssetDetail(),
                  new HideEditorRatingAssetDetail(),
                  new LoadDataRatingAssetDetail({ratingDefId: payload.ratingDefId})
                ]);
              } else {
                return from([
                  new NotProcessingRatingAssetDetail(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRatingAssetDetail(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataRatingAssetDetail>(RatingAssetDetailActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.RATING_ASSET_DETAIL_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataRatingAssetDetail({ratingDefId: payload.assetDefId})
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
