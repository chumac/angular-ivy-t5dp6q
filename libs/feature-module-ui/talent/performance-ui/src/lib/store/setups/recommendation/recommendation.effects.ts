import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RecommendationActionTypes,
  LoadDataRecommendation,
  LoadDataRecommendationSuccess,
  SaveRecommendation,
  NotProcessingRecommendation,
  HideEditorRecommendation,
  DeleteDataRecommendation,
  AddRecommendation,
  ActivateRecommendation,
  DeActivateRecommendation,
} from './recommendation.actions';
import { IPerformanceRecommendation, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class RecommendationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataRecommendation>(RecommendationActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.RECOMMENDATION_URLs.getRecommendationData}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataRecommendationSuccess(<IPerformanceRecommendation[]>(
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
    .ofType<AddRecommendation>(RecommendationActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.RECOMMENDATION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRecommendation(),
                  new HideEditorRecommendation(),
                  new LoadDataRecommendation()
                ]);
              } else {
                return from([
                  new NotProcessingRecommendation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRecommendation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveRecommendation>(RecommendationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RECOMMENDATION_URLs.update}?id=${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRecommendation(),
                  new HideEditorRecommendation(),
                  new LoadDataRecommendation()
                ]);
              } else {
                return from([
                  new NotProcessingRecommendation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRecommendation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataRecommendation>(RecommendationActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.RECOMMENDATION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataRecommendation()
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
    activateData$: Observable<Action> = this.actions$
      .ofType<ActivateRecommendation>(RecommendationActionTypes.ACTIVATE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.RECOMMENDATION_URLs.activate}/${payload.recordId}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was activated successfully.`, options: toastOptionsSuccess()}),
                    new LoadDataRecommendation()
                  ]);
                } else {
                  return from([
                    new ShowToast({title: 'Data Could Not Be Activated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not activated.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({title: 'Data Could Not Be Activated', message: `Something went wrong. Record was not activated.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deActivateData$: Observable<Action> = this.actions$
        .ofType<DeActivateRecommendation>(RecommendationActionTypes.DE_ACTIVATE_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.RECOMMENDATION_URLs.deActivate}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was de-activated successfully.`, options: toastOptionsSuccess()}),
                      new LoadDataRecommendation()
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be De-activated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not de-activated.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be De-activated', message: `Something went wrong. Record was not de-activated.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );
  


}
