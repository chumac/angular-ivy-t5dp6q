import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ManageReviewActionTypes, LoadObjectiveMasterManageReview, LoadObjectiveMasterManageReviewSuccess, NotLoadingObjectiveMasterManageReview, LoadObjectivesManageReview, NotLoadingObjectivesManageReview, LoadObjectivesManageReviewSuccess, InitiateReviewManageReview, LoadPreScoredObjectivesManageReview, LoadPreScoredObjectivesManageReviewSuccess } from './manage-review.actions';
import { MANAGE_REVIEW_DATA_URLs, REVIEW_PATHS } from '../../../constants';
import { IObjectiveMaster, IObjective } from '@nutela/models/talent/performance';

import { RetrieveFirstWorkflowProcessStepReviewWorkflowProcess } from '../review-workflow-process';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ManageReviewEffects {
  constructor(private actions$: Actions, private router: Router, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadObjectiveMaster$: Observable<Action> = this.actions$.pipe(
    ofType<LoadObjectiveMasterManageReview>(ManageReviewActionTypes.LOAD_OBJECTIVE_MASTER),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${MANAGE_REVIEW_DATA_URLs.getObjectiveMaster}/${payload.selectedPlan}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IObjectiveMaster>(data.Results[0]);

              return from([
                new NotLoadingObjectiveMasterManageReview(),
                new LoadObjectiveMasterManageReviewSuccess(result)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingObjectiveMasterManageReview(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadObjectives$: Observable<Action> = this.actions$.pipe(
    ofType<LoadObjectivesManageReview>(ManageReviewActionTypes.LOAD_OBJECTIVES),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${MANAGE_REVIEW_DATA_URLs.getObjectives}/${payload.selectedPlan}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IObjective[]>(data.Results);

              return from([
                new NotLoadingObjectivesManageReview(),
                new LoadObjectivesManageReviewSuccess(result)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingObjectivesManageReview(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadPreScoredObjectives$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPreScoredObjectivesManageReview>(ManageReviewActionTypes.LOAD_PRESCORED_OBJECTIVES),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${MANAGE_REVIEW_DATA_URLs.getPreScoredObjectives}/${payload.selectedPlan}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IObjective[]>(data.Results);

              return from([
                new NotLoadingObjectivesManageReview(),
                new LoadPreScoredObjectivesManageReviewSuccess(result)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingObjectivesManageReview(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  initiateReview$: Observable<Action> = this.actions$
    .ofType<InitiateReviewManageReview>(ManageReviewActionTypes.INITIATE_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${MANAGE_REVIEW_DATA_URLs.getInitiateReview}/${payload.selectedPlan}`, {})
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                let status = Number(<string>data.Results[0]);

                if (status === REVIEW_PATHS.processFlow) {
                  this.router.navigate([STANDARD_ROUTES.selfServiceReviewProgress]);
                  return from([]);
                } else if (status === REVIEW_PATHS.SelfReview){
                  return from([new RetrieveFirstWorkflowProcessStepReviewWorkflowProcess({selectedPlan: payload.selectedPlan})]);
                } else {
                  return from([]);
                }
              } else {
                return from([
                  new ShowToast({title: 'Review Could Not Be Initiated', message: data.ErrorMessage, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Review Could Not Be Initiated', message: 'Something went wrong. Review could not be initiated.', type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
