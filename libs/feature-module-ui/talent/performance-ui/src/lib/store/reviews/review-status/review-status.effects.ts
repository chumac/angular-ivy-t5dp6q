import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, UtilService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ReviewStatusActionTypes, LoadObjectiveMasterReviewStatus, LoadObjectiveMasterReviewStatusSuccess, NotLoadingObjectiveMasterReviewStatus } from './review-status.actions';
import { REVIEW_STATUS_DATA_URLs } from '../../../constants';
import { IObjectiveMaster } from '@nutela/models/talent/performance';

@Injectable()
export class ReviewStatusEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadObjectiveMaster$: Observable<Action> = this.actions$.pipe(
    ofType<LoadObjectiveMasterReviewStatus>(ReviewStatusActionTypes.LOAD_OBJECTIVE_MASTER),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${REVIEW_STATUS_DATA_URLs.getObjectiveMaster}/${payload.selectedPlan}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IObjectiveMaster>(data.Results[0]);

              return from([
                new NotLoadingObjectiveMasterReviewStatus(),
                new LoadObjectiveMasterReviewStatusSuccess(result)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingObjectiveMasterReviewStatus(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );




}
