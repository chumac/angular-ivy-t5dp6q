import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';
import { ILearningState } from '../../../root';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeleteEventParticipant, EventParticipantsActionTypes, HideEventParticipantCriteria, HideEventParticipantsEditor, LoadEventParticipantCriteriaEmployeeData, LoadEventParticipantCriteriaEmployeeDataSuccess, LoadEventParticipantCriteriaKeyData, LoadEventParticipantCriteriaKeyDataSuccess, LoadEventParticipantCriteriaKeyItemsData, LoadEventParticipantCriteriaKeyItemsDataSuccess, LoadEventParticipantEmployee, LoadEventParticipantEmployeeSuccess, LoadEventParticipantGradeData, LoadEventParticipantGradeDataSuccess, LoadEventParticipantSchedule, LoadEventParticipantScheduleSuccess, LoadEventParticipantsData, LoadEventParticipantsDataSuccess, LoadEventParticipantSource, LoadEventParticipantSourceSuccess, LoadEventParticipantStructureTypeData, LoadEventParticipantStructureTypeDataSuccess, NotLoadingEventParticipants, NotProcessingEventParticipants, SaveEventParticipantData, UpdateEventParticipantData } from './participants.actions';
import { IEventParticiantCriteriaEmployee, IEventParticiantCriteriaKey, IEventParticiantCriteriaKeyItems, IEventParticiantEmployee, IEventParticiantGrade, IEventParticiantSchedule, IEventParticiantSource, IEventParticiantStructureType, IEventParticipants } from '@nutela/models/talent/learning';
import { IApiResult } from '@nutela/models/core-data';
import { Router } from '@angular/router';

@Injectable()
export class EventParticipantsEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    public router: Router,
    private store: Store<ILearningState>,
    private utilService: UtilService) {
  }

  @Effect()
  loadEventParticipantsData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantsData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_DATA)
    .pipe(
      switchMap((payload) => {
        let url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantsData}/${payload.event_id}`;
        if (this.router.url.search('event-view-data') !== -1) {
          url = `${constants.EVENT_PARTICIPANTS_URLs.getMyEventParticipantsData}/${payload.event_id}`;
        }
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantsDataSuccess(<IEventParticipants[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantSource$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantSource>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SOURCE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantSourceData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantSourceSuccess(<IEventParticiantSource[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantEmployee$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantEmployee>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantEmployeeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantEmployeeSuccess(<IEventParticiantEmployee[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantSchedule$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantSchedule>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantScheduleData}/${payload.event_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantScheduleSuccess(<IEventParticiantSchedule[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  saveEventParticipantData$: Observable<Action> = this.actions$
    .ofType<SaveEventParticipantData>(EventParticipantsActionTypes.SAVE_EVENT_PARTICIPANT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EVENT_PARTICIPANTS_URLs.add}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventParticipants(),
                  new HideEventParticipantsEditor(),
                  new HideEventParticipantCriteria(),
                  new LoadEventParticipantsData(payload.data.event_id)
                ]);
              } else {
                return from([
                  new NotProcessingEventParticipants(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventParticipants(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  UpdateEventParticipantData$: Observable<Action> = this.actions$
    .ofType<UpdateEventParticipantData>(EventParticipantsActionTypes.UPDATE_EVENT_PARTICIPANT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_PARTICIPANTS_URLs.update}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventParticipants(),
                  new HideEventParticipantsEditor(),
                  new LoadEventParticipantsData(payload.data.event_id)
                ]);
              } else {
                return from([
                  new NotProcessingEventParticipants(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventParticipants(),
                new ShowToast({ title: 'Data Could Not Be Updated', message: `Something went wrong. Form data could not be updated. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteEventParticipant$: Observable<Action> = this.actions$
    .ofType<DeleteEventParticipant>(EventParticipantsActionTypes.DELETE_EVENT_PARTICIPANTS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.EVENT_PARTICIPANTS_URLs.delete}/${payload.id}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new LoadEventParticipantsData(payload.eventId),
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

  @Effect()
  loadEventParticipantGradeData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantGradeData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_GRADE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantGradeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantGradeDataSuccess(<IEventParticiantGrade[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantStructureTypeData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantStructureTypeData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantStructureTypeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantStructureTypeDataSuccess(<IEventParticiantStructureType[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantCriteriaEmployeeData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantCriteriaEmployeeData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantCriteriaEmployee}/${payload.criteria_text}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantCriteriaEmployeeDataSuccess(<IEventParticiantCriteriaEmployee[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantCriteriaKeyData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantCriteriaKeyData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantCriteriaKey}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantCriteriaKeyDataSuccess(<IEventParticiantCriteriaKey[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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
  loadEventParticipantCriteriaKeyItemsData$: Observable<Action> = this.actions$
    .ofType<LoadEventParticipantCriteriaKeyItemsData>(EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EVENT_PARTICIPANTS_URLs.getEventParticipantCriteriaItems}/${payload.keyword}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEventParticipants());
                return new LoadEventParticipantCriteriaKeyItemsDataSuccess(<IEventParticiantCriteriaKeyItems[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingEventParticipants());
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

}
