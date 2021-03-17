import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import {
  WorkLifeDataActionTypes,
  WorkLifeDataLoadSuccess,
  WorkLifeDataLoadFailure,
  WorkLifeDataLoad,
  WorkLifeDataLoadWorkflowMessages,
  WorkLifeDataLoadWorkflowMessagesSuccess,
  WorkLifeDataLoadWorkflowMessagesFailure,
  WorkLifeDataLoadWorkflowSubmissionsSuccess,
  WorkLifeDataLoadWorkflowSubmissionsFailure,
  NotLoadingWorkLifeData,
  WorkLifeDataLoadSecurityRoles,
  WorkLifeDataLoadSecurityRolesSuccess,
  WorkLifeDataLoadWorkflowSubmissions,
  WorkLifeDataMyAnalysisDetail,
  WorkLifeDataMyAnalysisDetailSuccess
} from './work-life-data.actions';
import { IWorkLifeData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { ISecurityRole, IStructureTree } from '@nutela/models/common';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class WorkLifeDataEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<WorkLifeDataLoad>(WorkLifeDataActionTypes.LOAD),
      switchMap(() => {
        return this.apiService.read(constants.WORK_LIFE_DATA_URLs.getData).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const worklifeData = <IWorkLifeData>(data.Results[0]);
              return from([
                new WorkLifeDataLoadSuccess(worklifeData)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) => of(new WorkLifeDataLoadFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
        )
      }
    )
  );

  @Effect()
  loadWorkflowMessages$: Observable<Action> = this.actions$
    .ofType<WorkLifeDataLoadWorkflowMessages>(WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.WORK_LIFE_DATA_URLs.myWorkflowMessages}/${payload.id}`
        return this.apiService
          .read(url)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new WorkLifeDataLoadWorkflowMessagesSuccess(<IWorkflowMessage[]>(data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  // @Effect()
  // loadWorkflowMessages$: Observable<Action> = this.actions$.pipe(
  //   ofType<WorkLifeDataLoadWorkflowMessages>(WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES),
  //   map(action => action.payload),
  //   switchMap(payload => {
  //     const url = `${constants.WORK_LIFE_DATA_URLs.myWorkflowMessages}/${payload.id}`
  //       return this.apiService.read(url).pipe(
  //         switchMap((data: IApiResult) => {
  //           if (data.Success && data.Results) {
  //             const workflowMessages = <IWorkflowMessage[]>(data.Results);

  //             return from([
  //               new WorkLifeDataLoadWorkflowMessagesSuccess(workflowMessages),
  //               new NotLoadingWorkLifeData()
  //               ]);
  //           } else {
  //             return from([
  //               ]);
  //           }
  //         }),
  //         catchError((error: any) => of(
  //           new WorkLifeDataLoadWorkflowMessagesFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
  //       )
  //     }
  //   )
  // );

  @Effect()
  loadWorkflowSubmissions$: Observable<Action> = this.actions$.pipe(
    ofType<WorkLifeDataLoadWorkflowSubmissions>(WorkLifeDataActionTypes.LOAD_WORKFLOW_SUBMISSIONS),
      switchMap(() => {
        return this.apiService.read(constants.WORK_LIFE_DATA_URLs.myWorkflowSubmissions).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const workflowMessages = <IWorkflowMessage[]>(data.Results);

              return from([
                new WorkLifeDataLoadWorkflowSubmissionsSuccess(workflowMessages),
                new NotLoadingWorkLifeData(),
              ]);
            } else {
              return from([
                new NotLoadingWorkLifeData(),
              ]);
            }
          }),
          catchError((error: any) => of(new NotLoadingWorkLifeData(), new WorkLifeDataLoadWorkflowSubmissionsFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
        )
      }
    )
  );

  @Effect()
  loadSecurityRoles$: Observable<Action> = this.actions$.pipe(
    ofType<WorkLifeDataLoadSecurityRoles>(WorkLifeDataActionTypes.LOAD_SECURITY_ROLES),
      switchMap(() => {
        return this.apiService.read(constants.WORK_LIFE_DATA_URLs.securityRoles).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const roles = <ISecurityRole[]>(data.Results);
              return from([
                new WorkLifeDataLoadSecurityRolesSuccess(roles)
                ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) => of(
            new WorkLifeDataLoadSecurityRolesSuccess([])))
        )
      }
    )
  );

  @Effect()
  loadAnalysisDetail$: Observable<Action> = this.actions$.pipe(
    ofType<WorkLifeDataMyAnalysisDetail>(WorkLifeDataActionTypes.LOAD_ANALYSIS_DETAIL),
      switchMap(() => {
        return this.apiService.read(constants.WORK_LIFE_DATA_URLs.analysisDetails).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const res = <IStructureTree>(data.Results[0]);

              return from([
                new WorkLifeDataMyAnalysisDetailSuccess(res)
                ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) => of(
            new WorkLifeDataMyAnalysisDetailSuccess(null)))
        )
      }
    )
  );

}
