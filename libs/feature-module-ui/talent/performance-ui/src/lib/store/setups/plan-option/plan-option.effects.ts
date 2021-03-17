import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PlanOptionActionTypes,
  LoadDataPlanOption,
  LoadDataPlanOptionSuccess,
  SavePlanOption,
  NotProcessingPlanOption,
  HideEditorPlanOption,
  DeleteDataPlanOption,
  LoadDocumentPlanOption,
  LoadDocumentPlanOptionSuccess,
  LoadInlineDocumentPlanOption,
  RemoveDataPlanOption,
  AddPlanOption,
  LoadPlanListPlanOption,
  LoadPlanListPlanOptionSuccess,
} from './plan-option.actions';
import { IPlanOption, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class PlanOptionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataPlanOption>(PlanOptionActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PLAN_OPTION_URLs.getPlanOptionData}/${payload.planId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPlanOptionSuccess(<IPlanOption[]>(
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
  loadPlanList$: Observable<Action> = this.actions$
    .ofType<LoadPlanListPlanOption>(PlanOptionActionTypes.LOAD_PLAN_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PLAN_OPTION_URLs.getPlanList)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const planList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadPlanListPlanOptionSuccess(<ISelectOption[]>(
                  planList
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddPlanOption>(PlanOptionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PLAN_OPTION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPlanOption(),
                  new HideEditorPlanOption(),
                  new LoadDataPlanOption({planId: payload.data.plan_id})
                ]);
              } else {
                return from([
                  new NotProcessingPlanOption(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPlanOption(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePlanOption>(PlanOptionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PLAN_OPTION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPlanOption(),
                  new HideEditorPlanOption(),
                  new LoadDataPlanOption({planId: payload.data.plan_id})
                ]);
              } else {
                return from([
                  new NotProcessingPlanOption(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPlanOption(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPlanOption>(PlanOptionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PLAN_OPTION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataPlanOption({planId: payload.planId})
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
