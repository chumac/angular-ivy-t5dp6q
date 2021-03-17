import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  ReboardDependantActionTypes,
  LoadDataReboardDependant,
  LoadDataReboardDependantSuccess,
  SaveReboardDependant,
  NotProcessingReboardDependant,
  HideEditorReboardDependant,
  LoadStatesReboardDependant,
  LoadStatesReboardDependantReady,
  LoadCitiesReboardDependant,
  LoadCitiesReboardDependantReady,
  LoadPhotoReboardDependant,
  LoadPhotoReboardDependantSuccess,
  SaveUpdateReboardDependant,
  DeleteDataReboardDependant,
} from './reboard-dependant.actions';
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardDependantEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardDependant>(ReboardDependantActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_DEPENDANTS_DATA_URLs.refreshData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardDependantSuccess(<IDependant[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesReboardDependant>(ReboardDependantActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesReboardDependantReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesReboardDependant>(ReboardDependantActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesReboardDependantReady({ cityList: selectedState.CityList })
      )
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardDependant>(ReboardDependantActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url =  constants.REBOARD_DEPENDANTS_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardDependant(),
                  new HideEditorReboardDependant(),
                  new LoadDataReboardDependant(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardDependant(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              console.log(error);
              return from([
                new NotProcessingReboardDependant(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            }
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardDependant>(ReboardDependantActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_DEPENDANTS_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardDependant(),
                  new HideEditorReboardDependant(),
                  new LoadDataReboardDependant(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardDependant(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              console.log(error);
              return from([
                new NotProcessingReboardDependant(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            }
            )
          );
      })
    );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardDependant>(ReboardDependantActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.REBOARD_DEPENDANTS_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataReboardDependant(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    loadPhoto$: Observable<Action> = this.actions$
      .ofType<LoadPhotoReboardDependant>(ReboardDependantActionTypes.LOAD_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.REBOARD_DEPENDANTS_DATA_URLs.image}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadPhotoReboardDependantSuccess(photo);
                } else {
                  return new LoadPhotoReboardDependantSuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
                )
              )
            );
        })
      );
}
