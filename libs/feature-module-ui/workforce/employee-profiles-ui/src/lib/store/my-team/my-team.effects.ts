import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadDataMyTeam,
  MyTeamActionTypes,
  LoadDataMyTeamSuccess,
  NotLoadingDataMyTeam,
  LoadDataEmployeeTeam,
  LoadDataEmployeeTeamSuccess,
  LoadTeamMemberProfilePicture,
  LoadTeamMemberProfilePictureSuccess
} from './my-team.actions';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { MY_TEAM_DATA_URLs } from '../../constants';

@Injectable()
export class MyTeamEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }

  @Effect()
  loadMyTeam$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataMyTeam>(MyTeamActionTypes.LOAD_MY_TEAM),
    mergeMap(() => {
      return this.apiService
        .read(`${MY_TEAM_DATA_URLs.getMyTeamData}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IPersonal[]>data.Results;

              return from([
                new LoadDataMyTeamSuccess(result),
                new NotLoadingDataMyTeam()
              ]);
            } else {
              return from([
                new NotLoadingDataMyTeam()
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingDataMyTeam(),
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadEmployeeTeam$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataEmployeeTeam>(MyTeamActionTypes.LOAD_EMPLOYEE_TEAM),
    map(action => action.payload),
    mergeMap((payload) => {
      return this.apiService
        .read(`${MY_TEAM_DATA_URLs.getEmployeeTeamData}${payload}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IPersonal[]>data.Results;

              return from([
                new LoadDataEmployeeTeamSuccess(result),
                new NotLoadingDataMyTeam()
              ]);
            } else {
              return from([
                new NotLoadingDataMyTeam()
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingDataMyTeam(),
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            ])
          )
        );
    })
  );


  @Effect()
  loadTeamMemberPic$: Observable<Action> = this.actions$.pipe(
    ofType<LoadTeamMemberProfilePicture>(MyTeamActionTypes.LOAD_TEAM_MEMBERS_PROFILE_PICTURE),
    map(action => action.payload),
    mergeMap((payload) => {
      return this.apiService
        .read(`${MY_TEAM_DATA_URLs.getMembersPic}/${payload}`)
        .pipe(
          mergeMap((profilePic: IApiResult) => {
            if (profilePic.Success && profilePic.Results) {
              const result = profilePic.Results[0];

              return from([
                new LoadTeamMemberProfilePictureSuccess({
                  employeeID: payload,
                  profilePic: result
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Image data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            ])
          )
        );
    })
  );
}
