import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PerformanceDashboardActionTypes,
  LoadCurrentPlanPerformanceDashboard,
  LoadCurrentPlanPerformanceDashboardSuccess,
  LoadMastersPerformanceDashboard,
  LoadMastersPerformanceDashboardSuccess,
  LoadObjectivesPerformanceDashboard,
  LoadObjectivesPerformanceDashboardSuccess,
  LoadTeamMastersPerformanceDashboard,
  LoadTeamMastersPerformanceDashboardSuccess,
  LoadTeamObjectivesPerformanceDashboard,
  LoadTeamObjectivesPerformanceDashboardSuccess,
} from './performance-dashboard.actions';
import { IPerfDashboardMasters, IPerfDashboardObjectives, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class PerformanceDashboardEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadMasters$: Observable<Action> = this.actions$
    .ofType<LoadMastersPerformanceDashboard>(PerformanceDashboardActionTypes.LOAD_DASH_MASTERS)
    .pipe(
      map(action=>action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PERFORMANCE_DASHBOARD_URLs.getMasters}/${payload.planId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadMastersPerformanceDashboardSuccess(<IPerfDashboardMasters>(
                  data.Results[0]
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
    loadObjectives$: Observable<Action> = this.actions$
      .ofType<LoadObjectivesPerformanceDashboard>(PerformanceDashboardActionTypes.LOAD_DASH_OBJECTIVES)
      .pipe(
        map(action=>action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.PERFORMANCE_DASHBOARD_URLs.getObjectives}/${payload.planId}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadObjectivesPerformanceDashboardSuccess(<IPerfDashboardObjectives[]>(
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
      loadTeamMasters$: Observable<Action> = this.actions$
        .ofType<LoadTeamMastersPerformanceDashboard>(PerformanceDashboardActionTypes.LOAD_DASH_TEAM_MASTERS)
        .pipe(
          map(action=>action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.PERFORMANCE_DASHBOARD_URLs.getTeamMasters}/${payload.employeeId}/${payload.planId}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadTeamMastersPerformanceDashboardSuccess(<IPerfDashboardMasters>(
                      data.Results[0]
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
        loadTeamObjectives$: Observable<Action> = this.actions$
          .ofType<LoadTeamObjectivesPerformanceDashboard>(PerformanceDashboardActionTypes.LOAD_DASH_TEAM_OBJECTIVES)
          .pipe(
            map(action=>action.payload),
            switchMap((payload) => {
              return this.apiService
                .read(`${constants.PERFORMANCE_DASHBOARD_URLs.getTeamObjectives}/${payload.employeeId}/${payload.planId}`)
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      return new LoadTeamObjectivesPerformanceDashboardSuccess(<IPerfDashboardObjectives[]>(
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
    loadCurrentPlan$: Observable<Action> = this.actions$
    .ofType<LoadCurrentPlanPerformanceDashboard>(PerformanceDashboardActionTypes.LOAD_CURR_PLAN)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PERFORMANCE_DASHBOARD_URLs.getCurrentPlan}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadCurrentPlanPerformanceDashboardSuccess(<IPlan>(
                  data.Results[0]
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

}
