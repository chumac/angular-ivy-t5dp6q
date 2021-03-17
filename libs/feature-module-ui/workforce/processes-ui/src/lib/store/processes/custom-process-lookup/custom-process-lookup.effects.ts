import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess,
  UtilService
} from '@nutela/core-services';

import {
  CustomProcessLookupActionTypes,
  LoadDataCustomProcessLookup,
  LoadDataCustomProcessLookupSuccess,
  SaveCustomProcessLookup,
  NotProcessingCustomProcessLookup,
  HideEditorCustomProcessLookup,
  DeleteDataCustomProcessLookup,
  AddCustomProcessLookup,
  InitiateProcessCustomProcessLookup,
  InitiateProcessCustomProcessLookupSuccess,
  NotInitiatingCustomProcessLookup, LoadTeamMembersCustomProcessLookup, LoadTeamMembersCustomProcessLookupSuccess
} from './custom-process-lookup.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IPersonal, IProcessFormDefinition } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class CustomProcessLookupEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataCustomProcessLookup>(
      CustomProcessLookupActionTypes.LOAD_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((paylaod) => {
        return this.apiService
          .read(
            `${constants.CUSTOM_PROCESS_LOOKUP_URLs.getCustomProcessLookupData}/${paylaod.roleId}`
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new LoadDataCustomProcessLookupSuccess(<
                    IProcessFormDefinition[]
                  >data.Results),
                  new NotProcessingCustomProcessLookup()
                ]);
              } else {
                return from([
                  new NotProcessingCustomProcessLookup()
                  // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomProcessLookup()
                // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    loadTeamMembers$: Observable<Action> = this.actions$
      .ofType<LoadTeamMembersCustomProcessLookup>(
        CustomProcessLookupActionTypes.LOAD_TEAM_MEMBERS
      )
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(
              `${constants.CUSTOM_PROCESS_LOOKUP_URLs.getTeamMembers}`
            )
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new LoadTeamMembersCustomProcessLookupSuccess(<IPersonal[]>data.Results),
                    new NotProcessingCustomProcessLookup()
                  ]);
                } else {
                  return from([
                    new NotProcessingCustomProcessLookup()
                    // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingCustomProcessLookup()
                  // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                ])
              )
            );
        })
      );

  @Effect()
  initiateProcess$: Observable<Action> = this.actions$
    .ofType<InitiateProcessCustomProcessLookup>(
      CustomProcessLookupActionTypes.INITIATE_PROCESS
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.CUSTOM_PROCESS_LOOKUP_URLs.initiateProcess}/${
              payload.processId
            }/${payload.employeeId}`
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new InitiateProcessCustomProcessLookupSuccess({
                    masterId: data.Results[0]
                  }),
                  new NotInitiatingCustomProcessLookup()
                ]);
              } else {
                return from([
                  new NotInitiatingCustomProcessLookup()
                  // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotInitiatingCustomProcessLookup()
                // new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              ])
            )
          );
      })
    );
}
