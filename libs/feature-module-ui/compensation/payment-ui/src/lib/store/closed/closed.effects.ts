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
import { LoadDataClosedSchedule, ClosedActionTypes, NotLoadingDataClosedSchedule, LoadDataClosedScheduleSuccess, ArchiveClosedSchedule } from './closed.actions';

@Injectable()
export class ClosedEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadClosedData$: Observable<Action> = this.actions$
    .ofType<LoadDataClosedSchedule>(ClosedActionTypes.LOAD_CLOSED_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getClosed)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataClosedSchedule());
                return new LoadDataClosedScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataClosedSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataClosedSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  archiveScheduleData$: Observable<Action> = this.actions$
    .ofType<ArchiveClosedSchedule>(ClosedActionTypes.ARCHIVE_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DATA_URLs.abandon}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new NotLoadingDataClosedSchedule(),
                  new ShowToast({ title: null, message: `Record was Archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataClosedSchedule(),
                ]);
              } else {
                return from([
                  new NotLoadingDataClosedSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingDataClosedSchedule(),
                new ShowToast({ title: 'Data Could Not Be Archived', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


}
