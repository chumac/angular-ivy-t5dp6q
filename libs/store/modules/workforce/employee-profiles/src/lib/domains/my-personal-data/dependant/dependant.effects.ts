import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DependantActionTypes,
  LoadApprovedDataDependant,
  LoadApprovedDataDependantSuccess,
  LoadAwaitingApprovalDataDependant,
  LoadAwaitingApprovalDataDependantSuccess,
  SaveDependant,
  NotProcessingDependant,
  HideEditorDependant,
  DeleteApprovedDataDependant,
  DeleteAwaitingApprovalDataDependant,
  RemoveAwaitingApprovalDataDependant,
  RemoveApprovedDataDependant,
  LoadStatesDependant,
  LoadStatesDependantReady,
  LoadCitiesDependant,
  LoadCitiesDependantReady,
  LoadApprovedDataItemDependant,
  LoadApprovedDataItemDependantSuccess,
  LoadApprovedPhotoDependant,
  LoadApprovedPhotoDependantSuccess,
  LoadAwaitingApprovalPhotoDependant,
  LoadAwaitingApprovalPhotoDependantSuccess,
  LoadDataDependant
} from './dependant.actions';
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';

@Injectable()
export class DependantEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataDependant>(DependantActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DEPENDANTS_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataDependantSuccess(<IDependant[]>(
                  data.Results[0]
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
    loadApprovedDataItem$: Observable<Action> = this.actions$
      .ofType<LoadApprovedDataItemDependant>(DependantActionTypes.LOAD_APPROVED_DATA_ITEM)
      .pipe(
        map(action => action.payload),
        mergeMap((payload) => {
          return this.apiService
            .read(`${constants.DEPENDANTS_DATA_URLs.approvedDataItem}/${payload.recordId}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadApprovedDataItemDependantSuccess(<IDependant>(data.Results[0]));
                } else {
                  return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
        })
      );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataDependant>(
      DependantActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.DEPENDANTS_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataDependantSuccess(<IDependant[]>(
                  data.Results[0]
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
  loadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesDependant>(DependantActionTypes.LOAD_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesDependantReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesDependant>(DependantActionTypes.LOAD_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesDependantReady({ cityList: selectedState.CityList })
      )
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveDependant>(DependantActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode?`${constants.DEPENDANTS_DATA_URLs.update}?dependentID=${payload.recordId}`: constants.DEPENDANTS_DATA_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingDependant(),
                  new HideEditorDependant(),
                  new LoadDataDependant(),
                ]);
              } else {
                return from([
                  new NotProcessingDependant(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) => {
              console.log(error);
              return from([
                new NotProcessingDependant(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError() })
              ])
            }
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataDependant>(DependantActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.DEPENDANTS_DATA_URLs.deleteApprovedData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  // new RemoveApprovedDataDependant({recordId: payload.recordId}),
                  new LoadDataDependant(),
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
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataDependant>(DependantActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.DEPENDANTS_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  // new RemoveAwaitingApprovalDataDependant({recordId: payload.recordId}),
                  new LoadDataDependant(),
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
    loadApprovedPhoto$: Observable<Action> = this.actions$
      .ofType<LoadApprovedPhotoDependant>(DependantActionTypes.LOAD_APPROVED_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.DEPENDANTS_DATA_URLs.approvedImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadApprovedPhotoDependantSuccess(photo);
                } else {
                  return new LoadApprovedPhotoDependantSuccess({});
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
      .ofType<LoadAwaitingApprovalPhotoDependant>(DependantActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.DEPENDANTS_DATA_URLs.awaitingApprovalImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadAwaitingApprovalPhotoDependantSuccess(photo);
                } else {
                  return new LoadAwaitingApprovalPhotoDependantSuccess({});
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

      @Effect()
      refreshData$: Observable<Action> = this.actions$
        .ofType<LoadDataDependant>(DependantActionTypes.REFRESH_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.DEPENDANTS_DATA_URLs.refreshData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return data
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Refreshed', message: 'Something went wrong. Data could not be refreshed.', options: toastOptionsError()});
                  }
                }),
                switchMap((data : any) => {
                  const approvedData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.approved);
                  const awaitingApprovalData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.queued);
                  return from([
                    new LoadApprovedDataDependantSuccess(<IDependant[]>(approvedData)),
                    new LoadAwaitingApprovalDataDependantSuccess(<IDependant[]>(awaitingApprovalData)),
                  ])
                })
              );
          })
        );

}
