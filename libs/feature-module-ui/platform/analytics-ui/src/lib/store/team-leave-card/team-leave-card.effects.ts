import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';

import { TEAM_LEAVE_DATA_URLs } from '../../constants';
import { TeamLeaveCardActionTypes, LoadDataLeaveTimeline, LoadDataLeaveTimelineSuccess } from './team-leave-card.actions';
import { ILeaveTimeline } from '@nutela/models/workforce/leave';

@Injectable()
export class TeamLeaveCardEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadLeaveTimeline$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataLeaveTimeline>(TeamLeaveCardActionTypes.LOAD_LEAVE_TIMELINE),
    mergeMap(() => {
      return this.apiService
        .read(`${TEAM_LEAVE_DATA_URLs.leaveTimeline}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <ILeaveTimeline[]>data.Results;
              return from([
                new LoadDataLeaveTimelineSuccess(result),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([ ])
          )
        );
    })
  );


}
