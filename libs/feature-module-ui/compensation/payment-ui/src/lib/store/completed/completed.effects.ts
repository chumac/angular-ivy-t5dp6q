import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../constants';
import { IRootState } from '../root';
import { CompletedActionTypes, NotLoadingDataCompletedSchedule, LoadDataCompletedSchedule, LoadDataCompletedScheduleSuccess, ArchiveCompletedSchedule } from './completed.actions';

@Injectable()
export class CompletedEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadCompletedData$: Observable<Action> = this.actions$
    .ofType<LoadDataCompletedSchedule>(CompletedActionTypes.LOAD_COMPLETED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getCompleted)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataCompletedSchedule());
                return new LoadDataCompletedScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataCompletedSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataCompletedSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  archiveScheduleData$: Observable<Action> = this.actions$
    .ofType<ArchiveCompletedSchedule>(CompletedActionTypes.ARCHIVE_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DATA_URLs.abandon}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new NotLoadingDataCompletedSchedule(),
                  new ShowToast({ title: null, message: `Record was Archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataCompletedSchedule(),
                ]);
              } else {
                return from([
                  new NotLoadingDataCompletedSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingDataCompletedSchedule(),
                new ShowToast({ title: 'Data Could Not Be Archived', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}
