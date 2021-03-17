import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

import {
  GeneralActionTypes,
  LoadBirthStatesGeneral,
  LoadBirthStatesGeneralReady,
  LoadBirthCitiesGeneral,
  LoadBirthCitiesGeneralReady,
  LoadStateOfOriginGeneral,
  LoadStateOfOriginGeneralReady,
  LoadLGAsGeneral,
  LoadLGAsGeneralReady,
  LoadApprovedDataGeneral,
  LoadApprovedDataGeneralSuccess,
  LoadAwaitingApprovalDataGeneral,
  LoadAwaitingApprovalDataGeneralSuccess,
  SaveGeneral,
  NotProcessingGeneral,
  HideEditorGeneral,
  LoadAwaitingApprovalDocumentGeneral,
  LoadAwaitingApprovalDocumentGeneralSuccess,
  DeleteAwaitingApprovalDataGeneral
} from './general.actions';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class GeneralEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataGeneral>(GeneralActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                if (data.Success && data.Results) {
                  if (data.Results.length === 0) {
                    return new LoadApprovedDataGeneralSuccess(undefined);
                  } else if (data.Results.length > 0) {
                    return new LoadApprovedDataGeneralSuccess(<IGeneral>(data.Results[0]));
                  }
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataGeneral>(
      GeneralActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                if (data.Results.length === 0) {
                  return new LoadAwaitingApprovalDataGeneralSuccess(undefined);
                } else if (data.Results.length > 0) {
                  return new LoadAwaitingApprovalDataGeneralSuccess(<IGeneral>(data.Results[0]));
                }
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
  loadAwaitingApprovalDocument$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDocumentGeneral>(
      GeneralActionTypes.LOAD_AWAITING_APPROVAL_DOCUMENT
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs
              .documentAwaitingApproval
          )
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);
                }

                return new LoadAwaitingApprovalDocumentGeneralSuccess(docData);
              } else {
                return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadBirthStates$: Observable<Action> = this.actions$
    .ofType<LoadBirthStatesGeneral>(GeneralActionTypes.LOAD_BIRTH_STATES)
    .pipe(
      map(action => action.payload.selectedBirthCountry),
      map(
        selectedBirthCountry =>
          new LoadBirthStatesGeneralReady({ birthStateList: selectedBirthCountry.StatesList })
      )
    );

  @Effect()
  loadBirthCities$: Observable<Action> = this.actions$
    .ofType<LoadBirthCitiesGeneral>(GeneralActionTypes.LOAD_BIRTH_CITIES)
    .pipe(
      map(action => action.payload.selectedBirthState),
      map(
        selectedBirthState =>
          new LoadBirthCitiesGeneralReady({ birthCityList: selectedBirthState.CityList })
      )
    );

  @Effect()
  loadStateOfOrigin$: Observable<Action> = this.actions$
    .ofType<LoadStateOfOriginGeneral>(GeneralActionTypes.LOAD_STATE_OF_ORIGIN)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedNationality =>
          new LoadStateOfOriginGeneralReady({
            stateOfOriginList: selectedNationality.StatesList
          })
      )
    );

  @Effect()
  loadLGAs$: Observable<Action> = this.actions$
    .ofType<LoadLGAsGeneral>(GeneralActionTypes.LOAD_LGAs)
    .pipe(
      map(action => action.payload.selectedStateOfOrigin),
      map(selectedStateOfOrigin => new LoadLGAsGeneralReady({ lgaList: selectedStateOfOrigin.LgaList }))
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveGeneral>(GeneralActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingGeneral(),
                  new HideEditorGeneral(),
                  new LoadApprovedDataGeneral(),
                  new LoadAwaitingApprovalDataGeneral(),
                ]);
              } else {
                return from([
                  new NotProcessingGeneral(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingGeneral(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataGeneral>(GeneralActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalDataGeneral(),
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
