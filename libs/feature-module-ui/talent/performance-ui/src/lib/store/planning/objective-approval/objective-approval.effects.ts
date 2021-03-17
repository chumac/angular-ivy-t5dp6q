import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, take } from 'rxjs/operators';

import * as constants from '../../../constants/';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  NotProcessingObjectiveApproval,
  ObjectiveApprovalActionTypes,
  NotProcessingDataGridObjectiveApproval,
  LoadObjectiveMasterDataObjectiveApproval,
  LoadObjectiveMasterDataObjectiveApprovalSuccess,
  LoadWorkflowDataObjectiveApproval,
  LoadWorkflowDataObjectiveApprovalSuccess,
  LoadPerspectivelistObjectiveApproval,
  LoadPerspectivelistObjectiveApprovalSuccess,
  LoadWeightBalanceObjectiveApproval,
  LoadWeightBalanceObjectiveApprovalSuccess,
  DeleteObjectiveApproval,
  LoadHrObjectiveMasterDataObjectiveApprovalSuccess,
  LoadHrObjectiveMasterDataObjectiveApproval,
} from './objective-approval.actions';
import {
  IObjectiveDto, IPlan, IObjectiveMasterDto
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPerspective } from 'libs/models/talent/performance/src/lib/interfaces/perspective.interface';

@Injectable()
export class ObjectiveApprovalEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }


  @Effect()
  loadObjectiveMaster$: Observable<Action> = this.actions$
    .ofType<LoadObjectiveMasterDataObjectiveApproval>(
      ObjectiveApprovalActionTypes.LOAD_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.OBJECTIVE_APPROVAL_URLs.getObjectiveMasters}/${payload.employee_id}/${payload.plan_id}`).pipe(
          map((data: any) => {
            if (data.Success) {
              return new LoadObjectiveMasterDataObjectiveApprovalSuccess(<IObjectiveMasterDto[]>(
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
    loadHrObjectiveMaster$: Observable<Action> = this.actions$
      .ofType<LoadHrObjectiveMasterDataObjectiveApproval>(
        ObjectiveApprovalActionTypes.LOAD_HR_OBJECTIVE_MASTER_DATA
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.OBJECTIVE_APPROVAL_URLs.getHrObjectiveMasters}/${payload.employee_id}/${payload.plan_id}`).pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadHrObjectiveMasterDataObjectiveApprovalSuccess(<IObjectiveMasterDto[]>(
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
    loadWorkflowData$: Observable<Action> = this.actions$
      .ofType<LoadWorkflowDataObjectiveApproval>(
        ObjectiveApprovalActionTypes.LOAD_WORKFLOW_DATA
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.OBJECTIVE_APPROVAL_URLs.getworkflowdata}/${payload}`).pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadWorkflowDataObjectiveApprovalSuccess(<any>(
                  data.Results[0]
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
      loadPerspectiveList$: Observable<Action> = this.actions$
        .ofType<LoadPerspectivelistObjectiveApproval>(
          ObjectiveApprovalActionTypes.LOAD_PERSPECTIVE_LIST
        )
        .pipe(
          switchMap(() => {
            return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getPerspectives}`).pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadPerspectivelistObjectiveApprovalSuccess(<IPerspective[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: 'Something went wrong. Perspective data could not be loaded.',
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
      loadWeightBalance$: Observable<Action> = this.actions$
        .ofType<LoadWeightBalanceObjectiveApproval>(
          ObjectiveApprovalActionTypes.LOAD_WEIGHT_BALANCE
        )
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService.update(`${constants.MANAGE_OBJECTIVES_URLs.getWeightBalance}/${payload.perspectiveId}/${payload.planId}`, null).pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadWeightBalanceObjectiveApprovalSuccess((
                    data.Results[0]
                  ));
                } else {
                  return new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: 'Something went wrong. Weight balance could not be loaded.',
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
        deleteObjectiveData$: Observable<Action> = this.actions$
          .ofType<DeleteObjectiveApproval>(ObjectiveApprovalActionTypes.DELETE)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              return this.apiService
                .delete(`${constants.MANAGE_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}`)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      return from([
                        new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                        new LoadObjectiveMasterDataObjectiveApproval({plan_id: payload.approvalInfo['plan_id'], employee_id: payload.approvalInfo['employee_id']}),
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
