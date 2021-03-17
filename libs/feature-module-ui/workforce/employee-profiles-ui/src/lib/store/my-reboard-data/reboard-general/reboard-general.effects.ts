import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

import {
  ReboardGeneralActionTypes,
  LoadBirthStatesReboardGeneral,
  LoadBirthStatesReboardGeneralReady,
  LoadBirthCitiesReboardGeneral,
  LoadBirthCitiesReboardGeneralReady,
  LoadStateOfOriginReboardGeneral,
  LoadStateOfOriginReboardGeneralReady,
  LoadLGAsReboardGeneral,
  LoadLGAsReboardGeneralReady,
  LoadDataReboardGeneral,
  LoadDataReboardGeneralSuccess,
  SaveReboardGeneral,
  NotProcessingReboardGeneral,
  HideEditorReboardGeneral,
  LoadDocumentReboardGeneral,
  LoadDocumentReboardGeneralSuccess,
  DeleteDataReboardGeneral,
  SaveUpdateReboardGeneral
} from './reboard-general.actions';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';

const testJson = {

}

@Injectable()
export class ReboardGeneralEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardGeneral>(ReboardGeneralActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_EMPLOYEE_INFORMATION_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log(data.Results)
                if (data.Results.length === 0) {
                  return new LoadDataReboardGeneralSuccess(undefined);
                } else if (data.Results.length > 0) {
                  return new LoadDataReboardGeneralSuccess(<IGeneral>(data.Results[0]));
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
    .ofType<LoadDocumentReboardGeneral>(
      ReboardGeneralActionTypes.LOAD_DOCUMENT
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_INFORMATION_GENERAL_DATA_URLs.documentAwaitingApproval
          )
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);
                }

                return new LoadDocumentReboardGeneralSuccess(docData);
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
    .ofType<LoadBirthStatesReboardGeneral>(ReboardGeneralActionTypes.LOAD_BIRTH_STATES)
    .pipe(
      map(action => action.payload.selectedBirthCountry),
      map(
        selectedBirthCountry =>
          new LoadBirthStatesReboardGeneralReady({ birthStateList: selectedBirthCountry.StatesList })
      )
    );

  @Effect()
  loadBirthCitiesReboard$: Observable<Action> = this.actions$
    .ofType<LoadBirthCitiesReboardGeneral>(ReboardGeneralActionTypes.LOAD_BIRTH_CITIES)
    .pipe(
      map(action => action.payload.selectedBirthState),
      map(
        selectedBirthState =>
          new LoadBirthCitiesReboardGeneralReady({ birthCityList: selectedBirthState.CityList })
      )
    );

  @Effect()
  loadStateOfOriginReboard$: Observable<Action> = this.actions$
    .ofType<LoadStateOfOriginReboardGeneral>(ReboardGeneralActionTypes.LOAD_STATE_OF_ORIGIN)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedNationality =>
          new LoadStateOfOriginReboardGeneralReady({
            stateOfOriginList: selectedNationality.StatesList
          })
      )
    );

  @Effect()
  loadLGAsReboard$: Observable<Action> = this.actions$
    .ofType<LoadLGAsReboardGeneral>(ReboardGeneralActionTypes.LOAD_LGAs)
    .pipe(
      map(action => action.payload.selectedStateOfOrigin),
      map(selectedStateOfOrigin => new LoadLGAsReboardGeneralReady({ lgaList: selectedStateOfOrigin.LgaList }))
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardGeneral>(ReboardGeneralActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.REBOARD_EMPLOYEE_INFORMATION_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardGeneral(),
                  new HideEditorReboardGeneral(),
                  new LoadDataReboardGeneral(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardGeneral(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardGeneral(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured Naaaaaaa..dddi.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdatedData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardGeneral>(ReboardGeneralActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(JSON.stringify(payload.data))
        return this.apiService
          .update(`${constants.REBOARD_EMPLOYEE_INFORMATION_DATA_URLs.update}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardGeneral(),
                  new HideEditorReboardGeneral(),
                  new LoadDataReboardGeneral(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardGeneral(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardGeneral(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
