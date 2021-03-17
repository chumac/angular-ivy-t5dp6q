import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LineManagerActionTypes,
  LoadDataLineManager,
  LoadDataLineManagerSuccess,
  SaveLineManager,
  NotProcessingLineManager,
  HideEditorLineManager,
  DeleteDataLineManager,
  LoadDocumentLineManager,
  LoadDocumentLineManagerSuccess,
  LoadInlineDocumentLineManager,
  RemoveDataLineManager,
  AddLineManager,
  LoadPlanListLineManagerSuccess,
  LoadPlanListLineManager,
  LoadEmployeeListLineManager,
  LoadEmployeeListLineManagerSuccess,
  NotProcessingGridLineManager,
} from './line-manager.actions';
import { ILineManager, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class LineManagerEffects {
  constructor(private store: Store<IPerformanceState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataLineManager>(LineManagerActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.LINE_MANAGER_URLs.getLineManagerData}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingGridLineManager());
                return new LoadDataLineManagerSuccess(<ILineManager[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingGridLineManager());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
    loadPlanData$: Observable<Action> = this.actions$
      .ofType<LoadPlanListLineManager>(LineManagerActionTypes.LOAD_PLAN_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.LINE_MANAGER_URLs.getLineManagerPlanList)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadPlanListLineManagerSuccess(<IPlan[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
        })
      );

      @Effect()
      loadEmployeeData$: Observable<Action> = this.actions$
        .ofType<LoadEmployeeListLineManager>(LineManagerActionTypes.LOAD_EMPLOYEE_LIST)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.LINE_MANAGER_URLs.getLineManagerEmployeeList)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadEmployeeListLineManagerSuccess(<IPersonal[]>(
                      data.Results
                    ));
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded.', options: toastOptionsError()});
                  }
                }),
                catchError((error: any) =>
                  of(
                    new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded. Error occured.', options: toastOptionsError()})
                  )
                )
              );
          })
        );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddLineManager>(LineManagerActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.LINE_MANAGER_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingLineManager(),
                  new HideEditorLineManager(),
                  new LoadDataLineManager(payload.data.plan_id)
                ]);
              } else {
                return from([
                  new NotProcessingLineManager(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLineManager(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveLineManager>(LineManagerActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.LINE_MANAGER_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingLineManager(),
                  new HideEditorLineManager(),
                  new LoadDataLineManager(payload.data.plan_id)
                ]);
              } else {
                return from([
                  new NotProcessingLineManager(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLineManager(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataLineManager>(LineManagerActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LINE_MANAGER_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataLineManager(payload.planId)
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
