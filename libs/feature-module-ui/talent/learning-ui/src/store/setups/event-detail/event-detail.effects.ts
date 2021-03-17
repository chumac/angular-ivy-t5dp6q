import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddEventDetail,
  EventDetailActionTypes,
  DeleteDataEventDetail,
  LoadDataEventDetail,
  LoadDataEventDetailSuccess,
  NotProcessingEventDetail,
  HideEditorEventDetail,
  GetDataEventDetail,
  GetDataEventDetailSuccess,
  GetEventDetailType,
  GetEventDetailTypeSuccess,
  SaveEventDetail,
  GetEventDetailFaculty,
  GetEventDetailFacultySuccess,
  PublishDataEventDetail,
  UnPublishDataEventDetail,
  GetEventParticipants,
  GetEventParticipantsSuccess,
  HideCloseEditorEvent,
  CloseLearningEvent,
  GetEventEmployee,
  NominationLearningEvent,
  HideNominationEditorEvent,
  GetEventEmployeeSuccess
} from './event-detail.actions';
import { IEventDetail, IEventDetailData, IEventDetailFaculty, IEventDetailType, IEventEmployee } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';
import { IEventAllParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-detail-participants.interface';

@Injectable()
export class EventDetailEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadEventDetailData$: Observable<Action> = this.actions$
    .ofType<LoadDataEventDetail>(EventDetailActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_URLs.getEventDetailData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataEventDetailSuccess(<IEventDetail[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  getEventData$: Observable<Action> = this.actions$
    .ofType<GetDataEventDetail>(EventDetailActionTypes.GET_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_URLs.getEventData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GetDataEventDetailSuccess(<IEventDetailData[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddEventDetail>(EventDetailActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.EVENT_DETAIL_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventDetail(),
                  new HideEditorEventDetail(),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new NotProcessingEventDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveEventDetail>(EventDetailActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventDetail(),
                  new HideEditorEventDetail(),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new NotProcessingEventDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataEventDetail>(EventDetailActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_URLs.deleteData}/${payload.recordId}`, payload.recordId)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataEventDetail()
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
  getEventType$: Observable<Action> = this.actions$
    .ofType<GetEventDetailType>(EventDetailActionTypes.GET_EVENT_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_URLs.getEventType)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GetEventDetailTypeSuccess(<IEventDetailType[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  getEventFaculty$: Observable<Action> = this.actions$
    .ofType<GetEventDetailFaculty>(EventDetailActionTypes.GET_EVENT_FACULTY)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_URLs.getEventFaculty}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GetEventDetailFacultySuccess(<IEventDetailFaculty[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  publishData$: Observable<Action> = this.actions$
    .ofType<PublishDataEventDetail>(EventDetailActionTypes.PUBLISH_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_URLs.publishData}?event_id=${payload.recordId}`, payload.recordId)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was published successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Published', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not published.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be UnPublished', message: `Something went wrong. Record was not published.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  unPublishData$: Observable<Action> = this.actions$
    .ofType<UnPublishDataEventDetail>(EventDetailActionTypes.UNPUBLISH_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_URLs.unPublishData}/${payload.recordId}`, payload.recordId)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was unpublished successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be UnPublished', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be UnPublished', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  getEventParticipants$: Observable<Action> = this.actions$
    .ofType<GetEventParticipants>(EventDetailActionTypes.GET_PARTICIPANTS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_URLs.getEventParticipants}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GetEventParticipantsSuccess(<IEventAllParticiants[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  closeLearningEvent$: Observable<Action> = this.actions$
    .ofType<CloseLearningEvent>(EventDetailActionTypes.CLOSE_EVENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_URLs.closeEvent}/${payload.event_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventDetail(),
                  new HideCloseEditorEvent(),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new NotProcessingEventDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  getEventEmployee$: Observable<Action> = this.actions$
    .ofType<GetEventEmployee>(EventDetailActionTypes.GET_EMPLOYEE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_URLs.getEventEmployee)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GetEventEmployeeSuccess(<IEventEmployee[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  nominationLearningEvent$: Observable<Action> = this.actions$
    .ofType<NominationLearningEvent>(EventDetailActionTypes.NOMINATION_EVENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EVENT_DETAIL_URLs.nominationEvent}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEventDetail(),
                  new HideNominationEditorEvent(),
                  new LoadDataEventDetail()
                ]);
              } else {
                return from([
                  new NotProcessingEventDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEventDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

}
