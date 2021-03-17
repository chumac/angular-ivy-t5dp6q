import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PlanActionTypes,
  LoadDataPlan,
  LoadDataPlanSuccess,
  SavePlan,
  NotProcessingPlan,
  HideEditorPlan,
  DeleteDataPlan,
  LoadDocumentPlan,
  LoadDocumentPlanSuccess,
  LoadInlineDocumentPlan,
  RemoveDataPlan,
  AddPlan,
  PublishPlan,
  ClosePlan,
  LoadCurrentPlan,
  LoadCurrentPlanSuccess,
} from './plan.actions';
import { IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class PlanEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataPlan>(PlanActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PLAN_URLs.getPlanData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPlanSuccess(<IPlan[]>(
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
    .ofType<AddPlan>(PlanActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PLAN_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPlan(),
                  new HideEditorPlan(),
                  new LoadDataPlan()
                ]);
              } else {
                return from([
                  new NotProcessingPlan(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPlan(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePlan>(PlanActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PLAN_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPlan(),
                  new HideEditorPlan(),
                  new LoadDataPlan()
                ]);
              } else {
                return from([
                  new NotProcessingPlan(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPlan(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPlan>(PlanActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PLAN_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataPlan()
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
    publishPlan$: Observable<Action> = this.actions$
      .ofType<PublishPlan>(PlanActionTypes.PUBLISH_PLAN)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.PLAN_URLs.publishPlan}/${payload}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Plan was published successfully.`, options: toastOptionsSuccess()}),
                    new LoadDataPlan()
                  ]);
                } else {
                  return from([
                    new ShowToast({title: 'Plan Could Not Be Published', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Plan Could Not Be Published.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({title: 'Plan Could Not Be Published', message: `Something went wrong. Plan Could Not Be Published.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      closePlan$: Observable<Action> = this.actions$
        .ofType<ClosePlan>(PlanActionTypes.CLOSE_PLAN)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.PLAN_URLs.closePlan}/${payload}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Plan was closed successfully.`, options: toastOptionsSuccess()}),
                      new LoadDataPlan()
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Plan Could Not Be Closed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Plan Could Not Be Closed.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Plan Could Not Be Closed', message: `Something went wrong. Plan Could Not Be Closed.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );
  @Effect()
  loadCurrentPlan$: Observable<Action> = this.actions$
    .ofType<LoadCurrentPlan>(PlanActionTypes.LOAD_CURRENT_PLAN)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PLAN_URLs.getCurrentPlan)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadCurrentPlanSuccess(<IPlan>(data.Results[0]));
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


}
