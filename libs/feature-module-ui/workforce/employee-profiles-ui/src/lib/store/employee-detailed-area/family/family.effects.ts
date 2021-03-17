import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  FamilyActionTypes,
  LoadStatesFamily,
  LoadStatesFamilyReady,
  LoadCitiesFamily,
  LoadCitiesFamilyReady,
  LoadApprovedDataFamily,
  LoadApprovedDataFamilySuccess,
  LoadAwaitingApprovalDataFamily,
  LoadAwaitingApprovalDataFamilySuccess,
  SaveFamily,
  NotProcessingFamily,
  HideEditorFamily,
  DeleteApprovedDataFamily,
  DeleteAwaitingApprovalDataFamily,
  RemoveAwaitingApprovalDataFamily,
  RemoveApprovedDataFamily,
  LoadDocumentFamily,
  LoadDocumentFamilySuccess,
  LoadInlineDocumentFamily,
  LoadInlineDocumentFamilySuccess,
  LoadApprovedDataItemFamily,
  LoadApprovedDataItemFamilySuccess,
  LoadApprovedPhotoFamily,
  LoadApprovedPhotoFamilySuccess,
  LoadAwaitingApprovalPhotoFamily,
  LoadAwaitingApprovalPhotoFamilySuccess,
  LoadDataFamily
} from './family.actions';
import { IFamily, IHrFamily } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class FamilyEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataFamily>(FamilyActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.FAMILY_INFORMATION.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingFamily());
                return new LoadApprovedDataFamilySuccess(<IHrFamily[]>(
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
    loadApprovedDataItem$: Observable<Action> = this.actions$
      .ofType<LoadApprovedDataItemFamily>(FamilyActionTypes.LOAD_APPROVED_DATA_ITEM)
      .pipe(
        map(action => action.payload),
        mergeMap((payload) => {
          return this.apiService
            .read(`${constants.FAMILY_INFORMATION.approvedDataItem}/${payload.recordId}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadApprovedDataItemFamilySuccess(<IFamily>(data.Results));
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
    .ofType<LoadAwaitingApprovalDataFamily>(
      FamilyActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
        mergeMap((payload) => {
        return this.apiService
          .read(`${constants.FAMILY_INFORMATION.awaitingApprovalData}/${payload.employeeId}` )
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadAwaitingApprovalDataFamilySuccess(<IHrFamily[]>(
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveFamily>(FamilyActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode?`${constants.FAMILY_INFORMATION.update}?familyID=${payload.recordId}&employeeID=${payload.employeeId}`: `${constants.FAMILY_INFORMATION.add}?employeeID=${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingFamily(),
                  new HideEditorFamily(),
                  new LoadApprovedDataFamily({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataFamily({employeeId:payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingFamily(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFamily(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    LoadState$: Observable<Action> = this.actions$
      .ofType<LoadStatesFamily>(FamilyActionTypes.LOAD_STATES)
      .pipe(
        map(action => action.payload.selectedCountry),
        map(
          selectedCountry =>
            new LoadStatesFamilyReady({ stateList: selectedCountry.StatesList })
        )
      );

    @Effect()
    LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesFamily>(FamilyActionTypes.LOAD_CITIES)
      .pipe(
        map(action => action.payload.selectedState),
        map(
          selectedCities =>
            new LoadCitiesFamilyReady({ cityList: selectedCities.CityList })
        )
      );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataFamily>(FamilyActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.FAMILY_INFORMATION.deleteApprovedData}?familyID=${payload.recordId}&employeeID=${payload.employeeId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataFamily({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataFamily({employeeId:payload.employeeId}),
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
    .ofType<DeleteAwaitingApprovalDataFamily>(FamilyActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.FAMILY_INFORMATION.deleteAwaitingApprovalData}/${payload.employeeId}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataFamily({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataFamily({employeeId:payload.employeeId}),
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
    loadDocument$: Observable<Action> = this.actions$
      .ofType<LoadDocumentFamily>(FamilyActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.isApproved?`${constants.FAMILY_INFORMATION.documentApproved}/${payload.employeeId}`: `${constants.FAMILY_INFORMATION.documentAwaitingApproval}/${payload.employeeId}`;
          return this.apiService
            .read(`${url}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success) {
                    let docData = null;

                    if (data.Results && data.Results.length > 0) {
                      const result = data.Results[0];
                      docData = this.utilService.getDocumentData(result.data, result.extension);
                    }

                    return new LoadDocumentFamilySuccess(docData);
                  } else {
                    return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                  }
                }),
                catchError((error: any) =>
                  of(
                    new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                  )
                )
              );
        })
      );

    @Effect()
    loadInlineDocument$: Observable<Action> = this.actions$
      .ofType<LoadInlineDocumentFamily>(FamilyActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.isApproved?`${constants.FAMILY_INFORMATION.documentApproved}/${payload.employeeId}`: `${constants.FAMILY_INFORMATION.documentAwaitingApproval}/${payload.employeeId}`;
          return this.apiService
            .read(`${url}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success) {
                    let docData = null;

                    if (data.Results && data.Results.length > 0) {
                      const result = data.Results[0];
                      docData = this.utilService.getDocumentData(result.data, result.extension);
                    }

                    return new Download(docData);
                  } else {
                    return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                  }
                }),
                catchError((error: any) =>
                  of(
                    new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                  )
                )
              );
        })
      );

      @Effect()
      loadApprovedPhoto$: Observable<Action> = this.actions$
        .ofType<LoadApprovedPhotoFamily>(FamilyActionTypes.LOAD_APPROVED_PHOTO)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.FAMILY_INFORMATION.approvedImage}/${payload.employeeId}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success && data.Results) {
                    const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                    return new LoadApprovedPhotoFamilySuccess(photo);
                  } else {
                    return new LoadApprovedPhotoFamilySuccess({});
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
        .ofType<LoadAwaitingApprovalPhotoFamily>(FamilyActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.FAMILY_INFORMATION.awaitingApprovalImage}/${payload.employeeId}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success && data.Results) {
                    const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                    return new LoadAwaitingApprovalPhotoFamilySuccess(photo);
                  } else {
                    return new LoadAwaitingApprovalPhotoFamilySuccess({});
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
