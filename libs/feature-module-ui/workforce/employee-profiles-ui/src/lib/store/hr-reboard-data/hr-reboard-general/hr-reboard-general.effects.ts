import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService } from '@nutela/core-services';

import {
  HrReboardGeneralActionTypes,
  LoadBirthStatesHrReboardGeneral,
  LoadBirthStatesHrReboardGeneralReady,
  LoadBirthCitiesHrReboardGeneral,
  LoadBirthCitiesHrReboardGeneralReady,
  LoadStateOfOriginHrReboardGeneral,
  LoadStateOfOriginHrReboardGeneralReady,
  LoadLGAsHrReboardGeneral,
  LoadLGAsHrReboardGeneralReady,
  LoadDataHrReboardGeneral,
  LoadDataHrReboardGeneralSuccess,
  SaveHrReboardGeneral,
  NotProcessingHrReboardGeneral,
  HideEditorHrReboardGeneral,
  LoadDocumentHrReboardGeneral,
  LoadDocumentHrReboardGeneralSuccess,
  DeleteDataHrReboardGeneral,
  SaveUpdateHrReboardGeneral
} from './hr-reboard-general.actions';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardGeneralEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardGeneral>(HrReboardGeneralActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_GENERAL_INFORMATION_DATA_URLs.awaitingApprovalData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                if (data.Success && data.Results) {
                  if (data.Results.length === 0) {
                    return new LoadDataHrReboardGeneralSuccess(undefined);
                  } else if (data.Results.length > 0) {
                    return new LoadDataHrReboardGeneralSuccess(<IGeneral>(data.Results[0]));
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
  loadDocumentReboard$: Observable<Action> = this.actions$
    .ofType<LoadDocumentHrReboardGeneral>(
      HrReboardGeneralActionTypes.LOAD_DOCUMENT
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.HR_REBOARD_GENERAL_INFORMATION_DATA_URLs.documentAwaitingApproval
          )
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);
                }

                return new LoadDocumentHrReboardGeneralSuccess(docData);
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
    .ofType<LoadBirthStatesHrReboardGeneral>(HrReboardGeneralActionTypes.LOAD_BIRTH_STATES)
    .pipe(
      map(action => action.payload.selectedBirthCountry),
      map(
        selectedBirthCountry =>
          new LoadBirthStatesHrReboardGeneralReady({ birthStateList: selectedBirthCountry.StatesList })
      )
    );

  @Effect()
  loadBirthCitiesReboard$: Observable<Action> = this.actions$
    .ofType<LoadBirthCitiesHrReboardGeneral>(HrReboardGeneralActionTypes.LOAD_BIRTH_CITIES)
    .pipe(
      map(action => action.payload.selectedBirthState),
      map(
        selectedBirthState =>
          new LoadBirthCitiesHrReboardGeneralReady({ birthCityList: selectedBirthState.CityList })
      )
    );

  @Effect()
  loadStateOfOriginReboard$: Observable<Action> = this.actions$
    .ofType<LoadStateOfOriginHrReboardGeneral>(HrReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedNationality =>
          new LoadStateOfOriginHrReboardGeneralReady({
            stateOfOriginList: selectedNationality.StatesList
          })
      )
    );

  @Effect()
  loadLGAsReboard$: Observable<Action> = this.actions$
    .ofType<LoadLGAsHrReboardGeneral>(HrReboardGeneralActionTypes.LOAD_LGAs)
    .pipe(
      map(action => action.payload.selectedStateOfOrigin),
      map(selectedStateOfOrigin => new LoadLGAsHrReboardGeneralReady({ lgaList: selectedStateOfOrigin.LgaList }))
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardGeneral>(HrReboardGeneralActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.HR_REBOARD_GENERAL_INFORMATION_DATA_URLs.updateAwaitingApprovalData, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardGeneral(),
                  new HideEditorHrReboardGeneral(),
                  new LoadDataHrReboardGeneral({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardGeneral(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardGeneral(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdatedData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardGeneral>(HrReboardGeneralActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HR_REBOARD_GENERAL_INFORMATION_DATA_URLs.updateAwaitingApprovalData}/${payload.recordId}?employeeID=${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardGeneral(),
                  new HideEditorHrReboardGeneral(),
                  new LoadDataHrReboardGeneral({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardGeneral(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardGeneral(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
