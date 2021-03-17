import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadApprovedDataCustomUserGroup,
  LoadAwaitingApprovalDataCustomUserGroupSuccess,
  SaveCustomUserGroup,
  NotProcessingCustomUserGroup,
  HideEditorCustomUserGroup,
  DeleteDataCustomUserGroup,
  LoadDocumentCustomUserGroup,
  LoadDocumentCustomUserGroupSuccess,
  LoadInlineDocumentCustomUserGroup,
  AddCustomUserGroup,
  CustomUserGroupActionTypes,
  LoadApprovedDataCustomUserGroupSuccess,
  LoadAwaitingApprovalDataCustomUserGroup,
  LoadCustomGroupsCustomUserGroup,
  LoadCustomGroupsCustomUserGroupSuccess,
  LoadValuesCustomUserGroup,
  LoadValuesCustomUserGroupSuccess
} from './custom-user-group.actions';
import { ICustomUserGroup, ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class CustomUserGroupEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAppState>, 
  ) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataCustomUserGroup>(CustomUserGroupActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.CUSTOM_USER_GROUPS_URLs.loadDataByGroupId}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              this.store.dispatch(new NotProcessingCustomUserGroup());
              if (data.Success && data.Results) {
                return new LoadApprovedDataCustomUserGroupSuccess(<ICustomUserGroup[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataCustomUserGroup>(CustomUserGroupActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CUSTOM_USER_GROUPS_URLs.loadAwaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataCustomUserGroupSuccess(<ICustomUserGroup[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
    loadCustomGroup$: Observable<Action> = this.actions$
      .ofType<LoadCustomGroupsCustomUserGroup>(CustomUserGroupActionTypes.LOAD_CUSTOM_GROUPS)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.CUSTOM_USER_GROUPS_URLs.loadCustomGroup)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  // const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadCustomGroupsCustomUserGroupSuccess(<ICustomUserGroupSetup[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
      loadValues$: Observable<Action> = this.actions$
        .ofType<LoadValuesCustomUserGroup>(CustomUserGroupActionTypes.LOAD_VALUES)
        .pipe(
          map(action =>action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.CUSTOM_USER_GROUPS_URLs.loadValues}/${payload.groupId}`)
              .pipe(
                map((data: any) => {
                  if (data.Success) {
                    const resultset = this.utilService.transformToSelectDataList(data.Results, 'l_value', 'description');
                    return new LoadValuesCustomUserGroupSuccess(<ISelectOption[]>(
                      resultset
                    ));
                  } else {
                    return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
    .ofType<AddCustomUserGroup>(CustomUserGroupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CUSTOM_USER_GROUPS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingCustomUserGroup(),
                  new HideEditorCustomUserGroup(),
                  new LoadApprovedDataCustomUserGroup({recordId: payload.data.custom_group_id}),
                  // new LoadAwaitingApprovalDataCustomUserGroup()
                ]);
              } else {
                return from([
                  new NotProcessingCustomUserGroup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomUserGroup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveCustomUserGroup>(CustomUserGroupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_USER_GROUPS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingCustomUserGroup(),
                  new HideEditorCustomUserGroup(),
                  new LoadApprovedDataCustomUserGroup({recordId: payload.data.custom_group_id}),
                  // new LoadAwaitingApprovalDataCustomUserGroup()
                ]);
              } else {
                return from([
                  new NotProcessingCustomUserGroup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomUserGroup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataCustomUserGroup>(CustomUserGroupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CUSTOM_USER_GROUPS_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataCustomUserGroup({recordId: payload.groupId}),
                  // new LoadAwaitingApprovalDataCustomUserGroup()
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

}
