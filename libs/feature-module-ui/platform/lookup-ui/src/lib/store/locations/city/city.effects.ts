import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  CityActionTypes,
  LoadCityData,
  LoadCitySuccess,
  SaveCity,
  NotProcessingCity,
  HideEditorCity,
  UpdateCity,
  DeleteCity,
  LoadNationData,
  LoadNationDataSuccess,
  LoadState,
  LoadStateDataSuccess,

} from './city.actions';
import { ShowToast } from '@nutela/store/shared';
import { ICity } from '@nutela/models/platform/lookup';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ILookupState } from '../../../store';


@Injectable()
export class CityEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadCityData$: Observable<Action> = this.actions$
    .ofType<LoadCityData>(CityActionTypes.LOAD_CITY_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(`${constants.Location_URLs.cityData}/${payload.stateId}`);
        return this.apiService
          .read(`${constants.Location_URLs.cityData}/${payload.stateId}`)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingCity());
                return new LoadCitySuccess(<ICity[]>(
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
      .ofType<SaveCity>(CityActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.Location_URLs.cityAdd}/${payload.stateId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingCity(),
                    new HideEditorCity(),
                    new LoadCityData({stateId:payload.stateId})
                  ]);
                } else {
                  return from([
                    new NotProcessingCity(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingCity(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateCity>(CityActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Location_URLs.cityUpdate}/${payload.stateId}/${payload.cityId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingCity(),
                    new HideEditorCity(),
                    new LoadCityData({stateId:payload.stateId})
                  ]);
                } else {
                  return from([
                    new NotProcessingCity(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingCity(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteCity>(CityActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Location_URLs.cityDelete}/${payload.stateId}/${payload.cityId}`);
            return this.apiService
              .delete(`${constants.Location_URLs.cityDelete}/${payload.stateId}/${payload.cityId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadCityData({stateId:payload.stateId})
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

        @Effect()
        loadNationData$: Observable<Action> = this.actions$
          .ofType<LoadNationData>(CityActionTypes.LOAD_NATIONALITY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.Location_URLs.nationalityData)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadNationDataSuccess(<ISelectOption[]>(
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
        loadStateData$: Observable<Action> = this.actions$
          .ofType<LoadState>(CityActionTypes.LOAD_STATE_DATA)
          .pipe(
            map(action => action.payload),
            switchMap(payload=> {
              return this.apiService
                .read(`${constants.Location_URLs.stateData}/${payload.countryId}`)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadStateDataSuccess(<ISelectOption[]>(
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

}

