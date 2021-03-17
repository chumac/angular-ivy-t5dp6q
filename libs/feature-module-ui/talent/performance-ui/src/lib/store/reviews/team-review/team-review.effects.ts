import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  TEAM_REVIEW_DATA_URLs
} from '../../../constants';

import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import {
  LoadDataTeamReview,
  TeamReviewActionTypes,
  LoadDataTeamReviewSuccess,
  NotLoadingDataTeamReview
} from './team-review.actions';

@Injectable()
export class TeamReviewEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private apiService: ApiService
  ) {}

  @Effect()
  loadTeamReview$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataTeamReview>(TeamReviewActionTypes.LOAD_TEAM_REVIEW),
    map(action => action.payload),
    mergeMap(payload => {
      return this.apiService
        .read(`${TEAM_REVIEW_DATA_URLs.getData}/${payload}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IReviewWorkflowProcess[]>data.Results;

              // console.log('IReviewWorkflowProcess', result);

              return from([
                new LoadDataTeamReviewSuccess(result),
                new NotLoadingDataTeamReview()
              ]);
            } else {
              return from([
                new NotLoadingDataTeamReview()
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingDataTeamReview(),
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
}
