import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService } from '@nutela/core-services';

import { IApiResult, IAnnouncement } from '@nutela/models/core-data';
import { NoticeBoardCardActionTypes, LoadDataAnnouncements, LoadDataAnnouncementsSuccess } from './notice-board-card.actions';
import { NOTICE_BOARD_DATA_URLs } from '../../constants';

@Injectable()
export class NoticeBoardCardEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadAnnouncements$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataAnnouncements>(NoticeBoardCardActionTypes.LOAD_ANNOUNCEMENTS),
    mergeMap(() => {
      return this.apiService
        .read(`${NOTICE_BOARD_DATA_URLs.getAnnouncements}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IAnnouncement[]>data.Results;

              return from([
                new LoadDataAnnouncementsSuccess(result),
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
