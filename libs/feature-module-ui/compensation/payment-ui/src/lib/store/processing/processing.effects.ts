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
import { LoadDataProcessingSchedule, ProcessingActionTypes, NotLoadingDataProcessingSchedule, LoadDataProcessingScheduleSuccess, LoadDataAwaitingApproval, LoadDataAwaitingApprovalSuccess, ArchiveProcessingSchedule } from './processing.actions';

@Injectable()
export class ProcessingEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadProcessingData$: Observable<Action> = this.actions$
    .ofType<LoadDataProcessingSchedule>(ProcessingActionTypes.LOAD_PROCESSING_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getProcessing)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataProcessingSchedule());
                return new LoadDataProcessingScheduleSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataProcessingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataProcessingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadDataAwaitingApproval>(ProcessingActionTypes.LOAD_PROCESSING_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.SCHEDULE_DATA_URLs.getAwaiting)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDataProcessingSchedule());
                return new LoadDataAwaitingApprovalSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingDataProcessingSchedule());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDataProcessingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  archiveScheduleData$: Observable<Action> = this.actions$
    .ofType<ArchiveProcessingSchedule>(ProcessingActionTypes.ARCHIVE_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SCHEDULE_DATA_URLs.abandon}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new NotLoadingDataProcessingSchedule(),
                  new ShowToast({ title: null, message: `Record was Archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataAwaitingApproval(),
                  new LoadDataProcessingSchedule(),
                ]);
              } else {
                return from([
                  new NotLoadingDataProcessingSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingDataProcessingSchedule(),
                new ShowToast({ title: 'Data Could Not Be Archived', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


}
