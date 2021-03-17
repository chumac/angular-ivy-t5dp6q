import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadDeploymentDataTeamDeployment,
  LoadDeploymentDataTeamDeploymentSuccess,
  SaveTeamDeployment,
  NotProcessingTeamDeployment,
  HideEditorTeamDeployment,
  DeleteDataTeamDeployment,
  TeamDeploymentActionTypes,
  LoadTransactionsDataTeamDeployment,
  LoadTransactionsDataTeamDeploymentSuccess,
  LoadTeamMembersTeamDeployment,
  LoadTeamMembersTeamDeploymentSuccess,
  DeloySelfTeamDeployment,
  DeployTeamMemberTeamDeployment,
  LoadPositionListTeamDeployment,
  LoadPositionListTeamDeploymentSuccess,
  NotLoadingTeamDeployment,
  LoadSuggestedSupervisorTeamDeployment,
  LoadSuggestedSupervisorTeamDeploymentSuccess,
  NotLoadingSuggestionTeamDeployment,
} from './team-deployment.actions';
import { ITeamDeployment, ITeamDeploymentTransaction, IPersonal } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../constants';
import { IAppState } from '@nutela/store/app-state';
import { IPosition } from '@nutela/models/workforce/personnel';

@Injectable()
export class TeamDeploymentEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAppState>,
  ) { }

  @Effect()
  loadDeploymentData$: Observable<Action> = this.actions$
    .ofType<LoadDeploymentDataTeamDeployment>(TeamDeploymentActionTypes.LOAD_DEPLOYMENT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.TEAM_DEPLOYMENTS_URLs.loadDeploymentData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              this.store.dispatch(new NotLoadingTeamDeployment());
              if (data.Success && data.Results) {
                return new LoadDeploymentDataTeamDeploymentSuccess(<ITeamDeployment[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTeamDeployment());
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
  loadTransactionsData$: Observable<Action> = this.actions$
    .ofType<LoadTransactionsDataTeamDeployment>(TeamDeploymentActionTypes.LOAD_TRANSACTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.TEAM_DEPLOYMENTS_URLs.loadTransactionData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTeamDeployment());
                return new LoadTransactionsDataTeamDeploymentSuccess(<ITeamDeploymentTransaction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTeamDeployment());
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
  loadTeamMemberData$: Observable<Action> = this.actions$
    .ofType<LoadTeamMembersTeamDeployment>(TeamDeploymentActionTypes.LOAD_TEAM_MEMBERS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TEAM_DEPLOYMENTS_URLs.loadTeamList)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                // const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadTeamMembersTeamDeploymentSuccess(<IPersonal[]>(
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
    loadPositionListData$: Observable<Action> = this.actions$
      .ofType<LoadPositionListTeamDeployment>(TeamDeploymentActionTypes.LOAD_POSITION_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.TEAM_DEPLOYMENTS_URLs.loadPositionList)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  // const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadPositionListTeamDeploymentSuccess(<IPosition[]>(
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
      loadSuggestedSupervisor$: Observable<Action> = this.actions$
        .ofType<LoadSuggestedSupervisorTeamDeployment>(TeamDeploymentActionTypes.LOAD_SUPERVISOR_SUGGESTION)
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.TEAM_DEPLOYMENTS_URLs.loadSuggestedSupervisor}/${payload.employeeId}/${payload.structureDetailId}/${payload.positionId}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    this.store.dispatch(new NotLoadingSuggestionTeamDeployment());
                    return new LoadSuggestedSupervisorTeamDeploymentSuccess(<number>(
                      +data.Results[0]
                    ));
                  } else {
                    this.store.dispatch(new NotLoadingSuggestionTeamDeployment());
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
  deploySelf$: Observable<Action> = this.actions$
    .ofType<DeloySelfTeamDeployment>(TeamDeploymentActionTypes.DEPLOY_SELF)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.TEAM_DEPLOYMENTS_URLs.selfDeploy, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTeamDeployment(),
                  new HideEditorTeamDeployment(),
                  new LoadDeploymentDataTeamDeployment({employeeId: payload.data.employee_id}),
                  new LoadTransactionsDataTeamDeployment({employeeId: payload.data.employee_id})
                ]);
              } else {
                return from([
                  new NotProcessingTeamDeployment(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTeamDeployment(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

    @Effect()
    deployTeamMembers$: Observable<Action> = this.actions$
      .ofType<DeployTeamMemberTeamDeployment>(TeamDeploymentActionTypes.DEPLOY_TEAM_MEMBER)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.TEAM_DEPLOYMENTS_URLs.teamDeploy, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                    new NotProcessingTeamDeployment(),
                    new HideEditorTeamDeployment(),
                    new LoadDeploymentDataTeamDeployment({employeeId: payload.data.employee_id}),
                    new LoadTransactionsDataTeamDeployment({employeeId: payload.data.employee_id})
                  ]);
                } else {
                  return from([
                    new NotProcessingTeamDeployment(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingTeamDeployment(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                ])
              )
            );
        })
      );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataTeamDeployment>(TeamDeploymentActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TEAM_DEPLOYMENTS_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  // new LoadDeploymentDataTeamDeployment(),
                  // new LoadTransactionsDataTeamDeployment()
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
