import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as constants from '../../../constants/';
import {
  ApiService,
  toastOptionsError} from '@nutela/core-services';

import { ShowToast } from '@nutela/store/shared';
import {
  LmManageObjectivesActionTypes,
  LoadObjectiveMasterDataLmManageObjectives,
  LoadPlanlistLmManageObjectives,
  LoadPlanlistLmManageObjectivesSuccess,
  LoadEmployeelistLmManageObjectives,
  LoadEmployeelistLmManageObjectivesSuccess,
  LoadObjectiveMasterDataLmManageObjectivesSuccess,
  NotProcessingLmManageObjectives,
  LoadPreScoredObjectiveMasterDataLmManageObjectives,
  LoadPreScoredObjectiveMasterDataLmManageObjectivesSuccess,
} from './lm-manage-objectives.actions';
import {
  IObjectiveMasterDto, IPlan
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class LmManageObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService  ) { }

    @Effect()
  loadPlanList$: Observable<Action> = this.actions$
    .ofType<LoadPlanlistLmManageObjectives>(
      LmManageObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getplans}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadPlanlistLmManageObjectivesSuccess(<IPlan[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

    @Effect()
    loadEmployeeList$: Observable<Action> = this.actions$
      .ofType<LoadEmployeelistLmManageObjectives>(
        LmManageObjectivesActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getLmEmployees}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadEmployeelistLmManageObjectivesSuccess(<IPersonal[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );

  @Effect()
  loadLmObjectiveMasterData$: Observable<Action> = this.actions$
    .ofType<LoadObjectiveMasterDataLmManageObjectives>(
      LmManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getLmObjectiveMasters}/${payload.planId}/${payload.employeeId}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingLmManageObjectives());
              return new LoadObjectiveMasterDataLmManageObjectivesSuccess(data.Results);
            } else {
              this.store.dispatch(new NotProcessingLmManageObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError(() => {
            this.store.dispatch(new NotProcessingLmManageObjectives());
            return from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
            ]);
          })
        );
      })
    );

    @Effect()
    loadLmPreScoredObjectiveMasterData$: Observable<Action> = this.actions$
      .ofType<LoadPreScoredObjectiveMasterDataLmManageObjectives>(
        LmManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getPreScoredLmObjectiveMasters}/${payload.planId}/${payload.employeeId}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLmManageObjectives());
                return new LoadPreScoredObjectiveMasterDataLmManageObjectivesSuccess(data.Results);
              } else {
                this.store.dispatch(new NotProcessingLmManageObjectives());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotProcessingLmManageObjectives());
              return from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                }),
              ]);
            })
          );
        })
      );

}
