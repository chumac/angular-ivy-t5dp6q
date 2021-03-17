import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardBeneficiaryActionTypes,
  LoadDataHrReboardBeneficiary,
  LoadDataHrReboardBeneficiarySuccess,
  SaveHrReboardBeneficiary,
  NotProcessingHrReboardBeneficiary,
  HideEditorHrReboardBeneficiary,
  LoadStatesHrReboardBeneficiaryReady,
  LoadStatesHrReboardBeneficiary,
  LoadCitiesHrReboardBeneficiary,
  LoadCitiesHrReboardBeneficiaryReady,
  LoadPhotoHrReboardBeneficiary,
  LoadPhotoHrReboardBeneficiarySuccess,
  DeleteDataHrReboardBeneficiary,
  SaveUpdateHrReboardBeneficiary,
} from './hr-reboard-beneficiary.actions';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardBeneficiaryEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
      .ofType<LoadDataHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_BENEFICIARY_DATA_URLs.getList}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardBeneficiarySuccess(<IBeneficiary[]>(
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
      .ofType<LoadPhotoHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.LOAD_PHOTO)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.HR_REBOARD_BENEFICIARY_DATA_URLs.awaitingApprovalImage}/${payload.employeeId}/${payload.beneficiaryId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadPhotoHrReboardBeneficiarySuccess(<any>(
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
      .ofType<LoadStatesHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedState =>
          new LoadStatesHrReboardBeneficiaryReady({ stateList: selectedState.StatesList })
      )
    );

  @Effect()
  LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedCities =>
          new LoadCitiesHrReboardBeneficiaryReady({ cityList: selectedCities.CityList })
      )
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_BENEFICIARY_DATA_URLs.add}/${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingHrReboardBeneficiary(),
                  new HideEditorHrReboardBeneficiary(),
                  new LoadDataHrReboardBeneficiary({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_BENEFICIARY_DATA_URLs.updateAwaitingApprovalData}/${payload.employeeId}/${payload.beneficiaryId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingHrReboardBeneficiary(),
                  new HideEditorHrReboardBeneficiary(),
                  new LoadDataHrReboardBeneficiary({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardBeneficiary>(HrReboardBeneficiaryActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .update(`${constants.HR_REBOARD_BENEFICIARY_DATA_URLs.deleteAwaitingApprovalData}/${payload.employeeId}/${payload.beneficiaryId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardBeneficiary({ employeeId: payload.employeeId })

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
