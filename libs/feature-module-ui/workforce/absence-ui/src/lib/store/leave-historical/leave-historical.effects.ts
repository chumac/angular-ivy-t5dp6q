import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, formatDate } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { SaveLeaveHistorical, LeaveHistoricalActionTypes, NotProcessingLeaveHistorical, HideEditorLeaveHistorical } from './leave-historical.actions';
import { IPerformanceState } from '@nutela/feature-module-ui/talent/performance-ui';
import { leaveTypes } from '@nutela/store/modules/foundation';

@Injectable()
export class LeaveHistoricalEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IPerformanceState>, private utilService: UtilService) {}

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveHistorical>(LeaveHistoricalActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.LEAVE_URLs.saveHistoricalLeave}`, payload.leaveData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveHistorical(),
                    new HideEditorLeaveHistorical(),
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveHistorical(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveHistorical(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

}
