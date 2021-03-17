import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ReboardBeneficiaryActionTypes,
  LoadDataReboardBeneficiary,
  LoadDataReboardBeneficiarySuccess,
  SaveReboardBeneficiary,
  NotProcessingReboardBeneficiary,
  HideEditorReboardBeneficiary,
  LoadStatesReboardBeneficiaryReady,
  LoadStatesReboardBeneficiary,
  LoadCitiesReboardBeneficiary,
  LoadCitiesReboardBeneficiaryReady,
  LoadPhotoReboardBeneficiary,
  LoadPhotoReboardBeneficiarySuccess,
  DeleteDataReboardBeneficiary,
  SaveUpdateReboardBeneficiary,
} from './reboard-beneficiary.actions';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardBeneficiaryEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
      .ofType<LoadDataReboardBeneficiary>(ReboardBeneficiaryActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_BENEFICIARIES_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardBeneficiarySuccess(<IBeneficiary[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPhoto$: Observable<Action> = this.actions$
      .ofType<LoadPhotoReboardBeneficiary>(ReboardBeneficiaryActionTypes.LOAD_PHOTO)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.REBOARD_BENEFICIARIES_DATA_URLs.image}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadPhotoReboardBeneficiarySuccess(<any>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  LoadStates$: Observable<Action> = this.actions$
      .ofType<LoadStatesReboardBeneficiary>(ReboardBeneficiaryActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedState =>
          new LoadStatesReboardBeneficiaryReady({ stateList: selectedState.StatesList })
      )
    );

  @Effect()
  LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesReboardBeneficiary>(ReboardBeneficiaryActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedCities =>
          new LoadCitiesReboardBeneficiaryReady({ cityList: selectedCities.CityList })
      )
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardBeneficiary>(ReboardBeneficiaryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_BENEFICIARIES_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReboardBeneficiary(),
                  new HideEditorReboardBeneficiary(),
                  new LoadDataReboardBeneficiary(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateReboardBeneficiary>(ReboardBeneficiaryActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_BENEFICIARIES_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReboardBeneficiary(),
                  new HideEditorReboardBeneficiary(),
                  new LoadDataReboardBeneficiary(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardBeneficiary>(ReboardBeneficiaryActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.REBOARD_BENEFICIARIES_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataReboardBeneficiary(),
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
}
