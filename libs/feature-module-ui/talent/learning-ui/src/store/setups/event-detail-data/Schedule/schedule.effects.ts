import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { DeleteEventSchedule, EventScheduleActionTypes, HideEventScheduleEditor, LoadEventHallData, LoadEventHallDataSuccess, LoadEventScheduleData, LoadEventScheduleDataSuccess, NotLoadingEventSchedule, NotProcessingEventSchedule, SaveEventScheduleData, UpdateEventScheduleData } from './schedule.actions';
import { ILearningState } from '../../../root';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { Router } from '@angular/router';

@Injectable()
export class EventScheduleEffects {
  constructor(private actions$: Actions, 
    private apiService: ApiService,
    public router: Router,
    private store: Store<ILearningState>,
    private utilService: UtilService) {
  }

  @Effect()
  loadScheduleData$: Observable<Action> = this.actions$
    .ofType<LoadEventScheduleData>(EventScheduleActionTypes.LOAD_EVENT_SCHEDULE_DATA)
    .pipe(
      switchMap((payload) => {
        let url = `${constants.EVENT_SCHEDULE_URLs.getEventScheduleData}/${payload.event_id}`;
        if (this.router.url.search('event-view-data') !== -1) {
          url = `${constants.EVENT_SCHEDULE_URLs.getMyEventScheduleData}/${payload.event_id}`;
        } 
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventSchedule());
                return new LoadEventScheduleDataSuccess(<IEventSchedule[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventSchedule());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

    @Effect()
    loadEventHallData$: Observable<Action> = this.actions$
    .ofType<LoadEventHallData>(EventScheduleActionTypes.LOAD_EVENT_HALL_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_SCHEDULE_URLs.getEventHallData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventSchedule());
                return new LoadEventHallDataSuccess(<IEventHall[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventSchedule());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

    @Effect()
    saveEventScheduleData$: Observable<Action> = this.actions$
    .ofType<SaveEventScheduleData>(EventScheduleActionTypes.SAVE_EVENT_SCHEDULE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EVENT_SCHEDULE_URLs.add}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventSchedule(),
                  new HideEventScheduleEditor(),
                  new LoadEventScheduleData(payload.data.event_id)
                ]);
              } else {
                return from([
                  new NotProcessingEventSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventSchedule(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    updateEventScheduleData$: Observable<Action> = this.actions$
    .ofType<UpdateEventScheduleData>(EventScheduleActionTypes.UPDATE_VENT_SCHEDULE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_SCHEDULE_URLs.update}/${payload.schedule_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventSchedule(),
                  new LoadEventScheduleData(payload.data.event_id),
                  new HideEventScheduleEditor()
                ]);
              } else {
                return from([
                  new NotProcessingEventSchedule(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventSchedule(),
                new ShowToast({ title: 'Data Could Not Be Updated', message: `Something went wrong. Form data could not be updated. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    deleteEventSchedule$: Observable<Action> = this.actions$
    .ofType<DeleteEventSchedule>(EventScheduleActionTypes.DELETE_EVENT_SCHEDULE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_SCHEDULE_URLs.delete}/${payload.schedule_id}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new LoadEventScheduleData(payload.eventId),
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );
  
}
