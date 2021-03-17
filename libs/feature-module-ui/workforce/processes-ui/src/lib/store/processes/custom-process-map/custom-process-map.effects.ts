import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  CustomProcessMapActionTypes,
  LoadDataCustomProcessMap,
  LoadDataCustomProcessMapSuccess,
  SaveCustomProcessMap,
  NotProcessingCustomProcessMap,
  HideEditorCustomProcessMap,
  DeleteDataCustomProcessMap,
  AddCustomProcessMap,
  LoadRolesCustomProcessMap,
  LoadRolesCustomProcessMapSuccess,
  LoadPermissionsCustomProcessMap,
  LoadPermissionsCustomProcessMapSuccess,
  LoadCustomFormListCustomProcessMap,
  LoadCustomFormListCustomProcessMapSuccess,
} from './custom-process-map.actions';
import { IApiResult, IBasicData } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { ICustomForm, ICustomProcessMap, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class CustomProcessMapEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataCustomProcessMap>(CustomProcessMapActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.CUSTOM_PROCESS_MAP_URLs.getCustomProcessMapData}/${payload.processId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadDataCustomProcessMapSuccess(<ICustomProcessMap[]>(
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
  loadRoles$: Observable<Action> = this.actions$
    .ofType<LoadRolesCustomProcessMap>(CustomProcessMapActionTypes.LOAD_ROLES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.CUSTOM_PROCESS_MAP_URLs.loadRolesList}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadRolesCustomProcessMapSuccess(<IBasicData[]>(
                  [{ id: 0, description: 'EMPLOYEE' }, { id: 1, description: 'HR' }, { id: 2, description: 'MANAGER' }, { id: 3, description: 'BR' }]
                  // data.Results
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
    loadPermissions$: Observable<Action> = this.actions$
      .ofType<LoadPermissionsCustomProcessMap>(CustomProcessMapActionTypes.LOAD_PERMISSIONS)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_PROCESS_MAP_URLs.loadPermissionsList}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadPermissionsCustomProcessMapSuccess(<IBasicData[]>(
                    [{ id: 0, description: 'N/A' }, { id: 1, description: 'can view' }, { id: 2, description: 'no access' }]
                    // data.Results
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
    loadCustomForms$: Observable<Action> = this.actions$
      .ofType<LoadCustomFormListCustomProcessMap>(CustomProcessMapActionTypes.LOAD_PERMISSIONS)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_PROCESS_MAP_URLs.loadCustomFormList}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadCustomFormListCustomProcessMapSuccess(<ICustomForm[]>(
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
    .ofType<AddCustomProcessMap>(CustomProcessMapActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CUSTOM_PROCESS_MAP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingCustomProcessMap(),
                  new HideEditorCustomProcessMap(),
                  new LoadDataCustomProcessMap({processId: payload.processId})
                ]);
              } else {
                return from([
                  new NotProcessingCustomProcessMap(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomProcessMap(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveCustomProcessMap>(CustomProcessMapActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_PROCESS_MAP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingCustomProcessMap(),
                  new HideEditorCustomProcessMap(),
                  new LoadDataCustomProcessMap({processId: payload.processId})
                ]);
              } else {
                return from([
                  new NotProcessingCustomProcessMap(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomProcessMap(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataCustomProcessMap>(CustomProcessMapActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_PROCESS_MAP_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataCustomProcessMap({processId: payload.processId})
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
