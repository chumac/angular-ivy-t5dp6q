import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LeaveDaysActionTypes,
  LoadLeaveDaysData,
  LoadLeaveDaysDataSuccess,
  SaveLeaveDays,
  DeleteLeaveDays,
  NotProcessingLeaveDays,
  HideEditorLeaveDays,

} from './leave-days.actions';
import {  ILeaveDays} from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IAbsenceState } from '../../root';

@Injectable()
export class LeaveDaysEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAbsenceState>) {}

  @Effect()
  loadLeaveDays$: Observable<Action> = this.actions$
    .ofType<LoadLeaveDaysData>(LeaveDaysActionTypes.LOAD_DAYS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_DAYS_URLs.daysData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingLeaveDays());
                return new LoadLeaveDaysDataSuccess(<ILeaveDays[]>(
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
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveDays>(LeaveDaysActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url= `${constants.LEAVE_DAYS_URLs.update}/${payload.days}/${payload.recordId}`
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveDays(),
                    new LoadLeaveDaysData(),
                    new HideEditorLeaveDays()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveDays(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveDays(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );
}

