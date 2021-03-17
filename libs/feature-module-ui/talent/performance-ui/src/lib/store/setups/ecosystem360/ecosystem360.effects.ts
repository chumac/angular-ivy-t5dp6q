import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  Ecosystem360ActionTypes,
  LoadDataEcosystem360,
  LoadDataEcosystem360Success,
  SaveEcosystem360,
  NotProcessingEcosystem360,
  HideEditorEcosystem360,
  DeleteDataEcosystem360,
  LoadDocumentEcosystem360,
  LoadDocumentEcosystem360Success,
  LoadInlineDocumentEcosystem360,
  RemoveDataEcosystem360,
  AddEcosystem360,
  LoadPlanListEcosystem360Success,
  LoadPlanListEcosystem360,
  LoadEmployeeListEcosystem360,
  LoadEmployeeListEcosystem360Success,
  NotProcessingGridEcosystem360,
} from './ecosystem360.actions';
import { IEcosystem360, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class Ecosystem360Effects {
  constructor(private store: Store<IPerformanceState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataEcosystem360>(Ecosystem360ActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.ECOSYSTEM360_URLs.getEcosystem360Data}/${payload.employeeId}/${payload.planId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingGridEcosystem360());
                return new LoadDataEcosystem360Success(<IEcosystem360[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingGridEcosystem360());
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
      .ofType<LoadPlanListEcosystem360>(Ecosystem360ActionTypes.LOAD_PLAN_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.ECOSYSTEM360_URLs.getEcosystem360PlanList)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadPlanListEcosystem360Success(<IPlan[]>(
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
        .ofType<LoadEmployeeListEcosystem360>(Ecosystem360ActionTypes.LOAD_EMPLOYEE_LIST)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.ECOSYSTEM360_URLs.getEcosystem360EmployeeList)
              .pipe(
                map((data: any) => {
                  if (data.Success) {
                    return new LoadEmployeeListEcosystem360Success(<IPersonal[]>(
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
    .ofType<AddEcosystem360>(Ecosystem360ActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.ECOSYSTEM360_URLs.add}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingEcosystem360(),
                  new HideEditorEcosystem360(),
                  // new LoadDataEcosystem360()
                ]);
              } else {
                return from([
                  new NotProcessingEcosystem360(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEcosystem360(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveEcosystem360>(Ecosystem360ActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.ECOSYSTEM360_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingEcosystem360(),
                  new HideEditorEcosystem360(),
                  // new LoadDataEcosystem360()
                ]);
              } else {
                return from([
                  new NotProcessingEcosystem360(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEcosystem360(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataEcosystem360>(Ecosystem360ActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.ECOSYSTEM360_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataEcosystem360({ planId: payload.planId, employeeId: payload.employeeId})
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
