import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  HRBeneficiaryActionTypes,
  LoadApprovedDataHRBeneficiary,
  LoadApprovedDataHRBeneficiarySuccess,
  LoadAwaitingApprovalDataHRBeneficiary,
  LoadAwaitingApprovalDataHRBeneficiarySuccess,
  SaveHRBeneficiary,
  NotProcessingHRBeneficiary,
  HideEditorHRBeneficiary,
  DeleteApprovedDataHRBeneficiary,
  DeleteAwaitingApprovalDataHRBeneficiary,
  RemoveAwaitingApprovalDataHRBeneficiary,
  RemoveApprovedDataHRBeneficiary,
  LoadStatesHRBeneficiaryReady,
  LoadStatesHRBeneficiary,
  LoadCitiesHRBeneficiary,
  LoadCitiesHRBeneficiaryReady,
  LoadApprovedDataItemHRBeneficiary,
  LoadApprovedDataItemHRBeneficiarySuccess,
  LoadApprovedPhotoHRBeneficiary,
  LoadApprovedPhotoHRBeneficiarySuccess,
  LoadAwaitingApprovalPhotoHRBeneficiary,
  LoadAwaitingApprovalPhotoHRBeneficiarySuccess,
  LoadDataHRBeneficiary
} from './beneficiary.actions';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class BeneficiaryEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
        mergeMap((payload) => {
        return this.apiService
          .read(`${constants.BENEFICIARY.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingHRBeneficiary());
                return new LoadApprovedDataHRBeneficiarySuccess(<IBeneficiary[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingHRBeneficiary())
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingHRBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

    @Effect()
    loadApprovedDataItem$: Observable<Action> = this.actions$
      .ofType<LoadApprovedDataItemHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM)
      .pipe(
        map(action => action.payload),
        mergeMap((payload) => {
          return this.apiService
            .read(`${constants.BENEFICIARY.approvedDataItem}/${payload.recordId}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  this.store.dispatch(new NotProcessingHRBeneficiary())
                  return new LoadApprovedDataItemHRBeneficiarySuccess(<IBeneficiary>(data.Results[0]));
                } else {
                  this.store.dispatch(new NotProcessingHRBeneficiary())
                  return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingHRBeneficiary(),
                  new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
        })
      );


  @Effect()
  LoadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedState =>
          new LoadStatesHRBeneficiaryReady({ stateList: selectedState.StatesList })
      )
    );

  @Effect()
  LoadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedCities =>
          new LoadCitiesHRBeneficiaryReady({ cityList: selectedCities.CityList })
      )
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataHRBeneficiary>(
      HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.BENEFICIARY.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadAwaitingApprovalDataHRBeneficiarySuccess(<IBeneficiary[]>(
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHRBeneficiary>(HRBeneficiaryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode ? `${constants.BENEFICIARY.update}?employeeID=${payload.employeeId}&beneficiaryID=${payload.recordId}` : `${constants.BENEFICIARY.add}/?employeeID=${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingHRBeneficiary(),
                  new HideEditorHRBeneficiary(),
                  new LoadApprovedDataHRBeneficiary({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRBeneficiary({employeeId:payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHRBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHRBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataHRBeneficiary>(HRBeneficiaryActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.BENEFICIARY.deleteApprovedData}?employeeID=${payload.employeeId}&beneficiaryID=${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataHRBeneficiary({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRBeneficiary({employeeId:payload.employeeId}),
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
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataHRBeneficiary>(HRBeneficiaryActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.BENEFICIARY.deleteAwaitingApprovalData}/${payload.recordId}?employeeID=${payload.employeeId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataHRBeneficiary({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataHRBeneficiary({employeeId:payload.employeeId}),
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
    loadApprovedPhoto$: Observable<Action> = this.actions$
      .ofType<LoadApprovedPhotoHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_APPROVED_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.BENEFICIARY.approvedImage}/${payload.employeeId}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadApprovedPhotoHRBeneficiarySuccess(photo);
                } else {
                  return new LoadApprovedPhotoHRBeneficiarySuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Approved Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );






    @Effect()
    loadAwaitingApprovalPhoto$: Observable<Action> = this.actions$
      .ofType<LoadAwaitingApprovalPhotoHRBeneficiary>(HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.BENEFICIARY.awaitingApprovalImage}/${payload.employeeId}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadAwaitingApprovalPhotoHRBeneficiarySuccess(photo);
                } else {
                  return new LoadAwaitingApprovalPhotoHRBeneficiarySuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Awaiting Approval Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );
}
