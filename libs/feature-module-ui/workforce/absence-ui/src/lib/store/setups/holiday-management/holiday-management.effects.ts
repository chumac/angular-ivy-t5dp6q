import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PublicHolidayActionTypes,
  LoadPublicHolidayData,
  LoadPublicHolidayDataSuccess,
  UpdatePublicHoliday,
  NotProcessingPublicHoliday,
  HideEditorPublicHoliday,
  DeletePublicHoliday,
  SavePublicHoliday,
  NotLoadingPublicHoliday,

} from './holiday-management.actions';
import {  IPublicHoliday} from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IAbsenceState } from '../../root';

@Injectable()
export class PublicHolidayEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAbsenceState>) {}

  @Effect()
  loadPublicHoliday$: Observable<Action> = this.actions$
    .ofType<LoadPublicHolidayData>(PublicHolidayActionTypes.LOAD_HOLIDAY_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HOLIDAY_MANAGEMENT_URLs.holidayData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPublicHoliday());
                return new LoadPublicHolidayDataSuccess(<IPublicHoliday[]>(
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
      .ofType<SavePublicHoliday>(PublicHolidayActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          const url= `${constants.HOLIDAY_MANAGEMENT_URLs.add}`
          console.log('url',url);
          console.log('from effect',payload.data);
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingPublicHoliday(),
                    new LoadPublicHolidayData(),
                    new HideEditorPublicHoliday()
                  ]);
                } else {
                  return from([
                    new NotProcessingPublicHoliday(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPublicHoliday(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

    @Effect()
    saveUpdateData$: Observable<Action> = this.actions$
      .ofType<UpdatePublicHoliday>(PublicHolidayActionTypes.UPDATED)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          const url= `${constants.HOLIDAY_MANAGEMENT_URLs.update}/${payload.recordId}`
          console.log('url',url);
          console.log('from effect',payload.data);
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingPublicHoliday(),
                    new LoadPublicHolidayData(),
                    new HideEditorPublicHoliday()
                  ]);
                } else {
                  return from([
                    new NotProcessingPublicHoliday(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPublicHoliday(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
        deleteData$: Observable<Action> = this.actions$
          .ofType<DeletePublicHoliday>(PublicHolidayActionTypes.DELETE)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              console.log(`${constants.HOLIDAY_MANAGEMENT_URLs.delete}/${payload.recordId}`);
              return this.apiService
                .delete(`${constants.HOLIDAY_MANAGEMENT_URLs.delete}/${payload.recordId}`)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      return from([
                        new LoadPublicHolidayData(),
                        new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      ]);
                    } else {
                      return from([
                        new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                      ]);
                    }
                  }),
                  catchError((error: any) =>
                    from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                    ])
                  )
                );
            })
          );
}

