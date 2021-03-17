import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  BeneficiaryActionTypes,
  LoadApprovedDataBeneficiary,
  LoadApprovedDataBeneficiarySuccess,
  LoadAwaitingApprovalDataBeneficiary,
  LoadAwaitingApprovalDataBeneficiarySuccess,
  SaveBeneficiary,
  NotProcessingBeneficiary,
  HideEditorBeneficiary,
  DeleteApprovedDataBeneficiary,
  DeleteAwaitingApprovalDataBeneficiary,
  RemoveAwaitingApprovalDataBeneficiary,
  RemoveApprovedDataBeneficiary,
  LoadStatesBeneficiaryReady,
  LoadStatesBeneficiary,
  LoadCitiesBeneficiary,
  LoadCitiesBeneficiaryReady,
  LoadApprovedDataItemBeneficiary,
  LoadApprovedDataItemBeneficiarySuccess,
  LoadApprovedPhotoBeneficiary,
  LoadApprovedPhotoBeneficiarySuccess,
  LoadAwaitingApprovalPhotoBeneficiary,
  LoadAwaitingApprovalPhotoBeneficiarySuccess,
  LoadDataBeneficiary
} from './beneficiary.actions';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class BeneficiaryEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataBeneficiary>(BeneficiaryActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.BENEFICIARIES_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataBeneficiarySuccess(<IBeneficiary[]>(
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
    loadApprovedDataItem$: Observable<Action> = this.actions$
      .ofType<LoadApprovedDataItemBeneficiary>(BeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM)
      .pipe(
        map(action => action.payload),
        mergeMap((payload) => {
          return this.apiService
            .read(`${constants.BENEFICIARIES_DATA_URLs.approvedDataItem}/${payload.recordId}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadApprovedDataItemBeneficiarySuccess(<IBeneficiary>(data.Results[0]));
                } else {
                  return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );


  @Effect()
  LoadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesBeneficiary>(BeneficiaryActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedState =>
          new LoadStatesBeneficiaryReady({ stateList: selectedState.StatesList })
      )
    );

  @Effect()
  LoadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesBeneficiary>(BeneficiaryActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedCities =>
          new LoadCitiesBeneficiaryReady({ cityList: selectedCities.CityList })
      )
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataBeneficiary>(
      BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.BENEFICIARIES_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataBeneficiarySuccess(<IBeneficiary[]>(
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveBeneficiary>(BeneficiaryActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode ? `${constants.BENEFICIARIES_DATA_URLs.update}?beneficiaryID=${payload.recordId}` : constants.BENEFICIARIES_DATA_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingBeneficiary(),
                  new HideEditorBeneficiary(),
                  new LoadDataBeneficiary(),
                ]);
              } else {
                return from([
                  new NotProcessingBeneficiary(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingBeneficiary(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataBeneficiary>(BeneficiaryActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.BENEFICIARIES_DATA_URLs.deleteApprovedData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataBeneficiary(),
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
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataBeneficiary>(BeneficiaryActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.BENEFICIARIES_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataBeneficiary(),
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
    loadApprovedPhoto$: Observable<Action> = this.actions$
      .ofType<LoadApprovedPhotoBeneficiary>(BeneficiaryActionTypes.LOAD_APPROVED_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.BENEFICIARIES_DATA_URLs.approvedImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadApprovedPhotoBeneficiarySuccess(photo);
                } else {
                  return new LoadApprovedPhotoBeneficiarySuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Approved Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
                )
              )
            );
        })
      );






    @Effect()
    loadAwaitingApprovalPhoto$: Observable<Action> = this.actions$
      .ofType<LoadAwaitingApprovalPhotoBeneficiary>(BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.BENEFICIARIES_DATA_URLs.awaitingApprovalImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadAwaitingApprovalPhotoBeneficiarySuccess(photo);
                } else {
                  return new LoadAwaitingApprovalPhotoBeneficiarySuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Awaiting Approval Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
                )
              )
            );
        })
      );

      @Effect()
      refreshData$: Observable<Action> = this.actions$
        .ofType<LoadDataBeneficiary>(BeneficiaryActionTypes.REFRESH_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.BENEFICIARIES_DATA_URLs.refreshData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return data
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Refreshed', message: 'Something went wrong. Data could not be refreshed.', type: ToastTypes.ERROR});
                  }
                }),
                switchMap((data : any) => {
                  const approvedData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.approved);
                  const awaitingApprovalData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.queued);
                  return from([
                    new LoadApprovedDataBeneficiarySuccess(<IBeneficiary[]>(approvedData)),
                    new LoadAwaitingApprovalDataBeneficiarySuccess(<IBeneficiary[]>(awaitingApprovalData)),
                  ])
                })
              );
          })
        );

}
