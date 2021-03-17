import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService } from '@nutela/core-services';

import { IApiResult, IToDo, IAnniversary } from '@nutela/models/core-data';
import { LoadDataToDos, ToDoCardActionTypes, LoadDataToDosSuccess, LoadDataAnniversaries, LoadDataAnniversariesSuccess } from './to-do-card.actions';
import { TO_DO_DATA_URLs } from '../../constants';

@Injectable()
export class ToDoCardEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadToDos$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataToDos>(ToDoCardActionTypes.LOAD_TO_DOs),
    mergeMap(() => {
      return this.apiService
        .read(`${TO_DO_DATA_URLs.toDos}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IToDo[]>data.Results;

              console.log('To Dos', result);

              return from([
                new LoadDataToDosSuccess(result),
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

  @Effect()
  loadAnniversaries$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataAnniversaries>(ToDoCardActionTypes.LOAD_ANNIVERSARIES),
    mergeMap(() => {
      return this.apiService
        .read(`${TO_DO_DATA_URLs.anniversaries}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IAnniversary[]>data.Results;

              return from([
                new LoadDataAnniversariesSuccess(result),
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
