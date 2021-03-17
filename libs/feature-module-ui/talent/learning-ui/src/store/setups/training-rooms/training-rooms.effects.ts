import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddTrainingRooms,
  TrainingRoomsActionTypes,
  DeleteDataTrainingRooms,
  LoadDataTrainingRooms,
  LoadDataTrainingRoomsSuccess,
  NotProcessingTrainingRooms,
  HideEditorTrainingRooms,
  SaveTrainingRooms,
} from './training-rooms.actions';
import { ITrainingRooms } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class TrainingRoomsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadTrainingRoomsData$: Observable<Action> = this.actions$
    .ofType<LoadDataTrainingRooms>(TrainingRoomsActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TRAINING_ROOMS_URLs.getTrainingRoomsData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataTrainingRoomsSuccess(<ITrainingRooms[]>(
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
    .ofType<AddTrainingRooms>(TrainingRoomsActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.TRAINING_ROOMS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingTrainingRooms(),
                  new HideEditorTrainingRooms(),
                  new LoadDataTrainingRooms()
                ]);
              } else {
                return from([
                  new NotProcessingTrainingRooms(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTrainingRooms(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveTrainingRooms>(TrainingRoomsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.TRAINING_ROOMS_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingTrainingRooms(),
                    new HideEditorTrainingRooms(),
                    new LoadDataTrainingRooms()
                  ]);
                } else {
                  return from([
                    new NotProcessingTrainingRooms(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingTrainingRooms(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataTrainingRooms>(TrainingRoomsActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TRAINING_ROOMS_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataTrainingRooms()
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
