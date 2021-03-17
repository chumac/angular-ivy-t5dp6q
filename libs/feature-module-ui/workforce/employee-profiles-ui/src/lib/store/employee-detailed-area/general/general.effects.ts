 import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

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

@Injectable()
export class GeneralEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataGeneral>(GeneralActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.GENERAL_INFORMATION.approvedData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  if (data.Results.length === 0) {
                    return new LoadApprovedDataGeneralSuccess(undefined);
                  } else if (data.Results.length > 0) {
                    return new LoadApprovedDataGeneralSuccess(<IGeneral>(data.Results[0]));
                  }
                } else {
                  return new ShowToast({title: 'General information Could Not Be Loaded', message: 'Something went wrong. General information data could not be loaded.', options: toastOptionsError()});
                }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'General information Could Not Be Loaded', message: 'Something went wrong. General information data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
    loadAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<LoadAwaitingApprovalDataGeneral>(
        GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.GENERAL_INFORMATION.awaitingApprovalData}?employeeID=${payload.employeeId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  if (data.Results.length === 0) {
                    return new LoadAwaitingApprovalDataGeneralSuccess(undefined);
                  } else if (data.Results.length > 0) {
                    return new LoadAwaitingApprovalDataGeneralSuccess(<IGeneral>(data.Results[0]));
                  }
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
  loadBirthStates$: Observable<Action> = this.actions$
    .ofType<LoadBirthStatesGeneral>(GeneralActionTypes.HR_LOAD_BIRTH_STATES)
    .pipe(
      map(action => action.payload.selectedBirthCountry),
      map(
        selectedBirthCountry =>
          new LoadBirthStatesGeneralReady({ birthStateList: selectedBirthCountry.StatesList })
      )
    );

  @Effect()
  loadBirthCities$: Observable<Action> = this.actions$
    .ofType<LoadBirthCitiesGeneral>(GeneralActionTypes.HR_LOAD_BIRTH_CITIES)
    .pipe(
      map(action => action.payload.selectedBirthState),
      map(
        selectedBirthState =>
          new LoadBirthCitiesGeneralReady({ birthCityList: selectedBirthState.CityList })
      )
    );

  @Effect()
  loadStateOfOrigin$: Observable<Action> = this.actions$
    .ofType<LoadStateOfOriginGeneral>(GeneralActionTypes.HR_LOAD_STATE_OF_ORIGIN)
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
    .ofType<LoadLGAsGeneral>(GeneralActionTypes.HR_LOAD_LGAs)
    .pipe(
      map(action => action.payload.selectedStateOfOrigin),
      map(selectedStateOfOrigin => new LoadLGAsGeneralReady({ lgaList: selectedStateOfOrigin.LgaList }))
    );


    @Effect()
    submitData$: Observable<Action> = this.actions$
      .ofType<SaveGeneral>(GeneralActionTypes.HR_SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.GENERAL_INFORMATION.update}/${payload.employeeId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingGeneral(),
                    new HideEditorGeneral(),
                    new LoadAwaitingApprovalDataGeneral({employeeId:payload.employeeId})
                  ]);
                } else {
                  return from([
                    new NotProcessingGeneral(),
                    new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingGeneral(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );


      @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataGeneral>(GeneralActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.GENERAL_INFORMATION.deleteAwaitingApprovalData}/${payload.id}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadAwaitingApprovalDataGeneral({employeeId:payload.employeeId})

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
