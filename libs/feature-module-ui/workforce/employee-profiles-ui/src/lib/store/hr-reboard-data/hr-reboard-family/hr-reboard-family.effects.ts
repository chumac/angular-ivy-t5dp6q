import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardFamilyActionTypes,
  LoadStatesHrReboardFamily,
  LoadStatesHrReboardFamilyReady,
  LoadCitiesHrReboardFamily,
  LoadCitiesHrReboardFamilyReady,
  LoadDataHrReboardFamily,
  LoadDataHrReboardFamilySuccess,
  SaveHrReboardFamily,
  NotProcessingHrReboardFamily,
  HideEditorHrReboardFamily,
  LoadDocumentHrReboardFamily,
  LoadDocumentHrReboardFamilySuccess,
  LoadInlineDocumentHrReboardFamily,
  LoadPhotoHrReboardFamily,
  LoadPhotoHrReboardFamilySuccess,
  SaveUpdateHrReboardFamily,
  DeleteDataHrReboardFamily,
} from './hr-reboard-family.actions';
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardFamilyEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.getAll}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardFamilySuccess(<IFamily[]>(
                  data.Results
                ));
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardFamily>(HrReboardFamilyActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.add}/${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardFamily(),
                  new HideEditorHrReboardFamily(),
                  new LoadDataHrReboardFamily({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardFamily(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardFamily(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardFamily>(HrReboardFamilyActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.updateAwaitingApprovalData}/${payload.employeeId}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardFamily(),
                  new HideEditorHrReboardFamily(),
                  new LoadDataHrReboardFamily({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardFamily(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardFamily(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

    @Effect()
    LoadState$: Observable<Action> = this.actions$
      .ofType<LoadStatesHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_STATES)
      .pipe(
        map(action => action.payload.selectedCountry),
        map(
          selectedCountry =>
            new LoadStatesHrReboardFamilyReady({ stateList: selectedCountry.StatesList })
        )
      );

    @Effect()
    LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_CITIES)
      .pipe(
        map(action => action.payload.selectedState),
        map(
          selectedCities =>
            new LoadCitiesHrReboardFamilyReady({ cityList: selectedCities.CityList })
        )
      );

    @Effect()
    loadDocument$: Observable<Action> = this.actions$
      .ofType<LoadDocumentHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = `${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.documentAwaitingApproval}/${payload.employeeId}/${payload.recordId}`;
          return this.apiService
            .read(url)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success) {
                    let docData = null;

                    if (data.Results && data.Results.length > 0) {
                      const result = data.Results[0];
                      docData = this.utilService.getDocumentData(result.data, result.extension);
                    }

                    return new LoadDocumentHrReboardFamilySuccess(docData);
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
    loadInlineDocument$: Observable<Action> = this.actions$
      .ofType<LoadInlineDocumentHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = `${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.documentAwaitingApproval}/${payload.employeeId}/${payload.recordId}`;
          return this.apiService
            .read(url)
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
      loadApprovedPhoto$: Observable<Action> = this.actions$
        .ofType<LoadPhotoHrReboardFamily>(HrReboardFamilyActionTypes.LOAD_PHOTO)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.awaitingApprovalImage}/${payload.employeeId}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success && data.Results) {
                    const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                    return new LoadPhotoHrReboardFamilySuccess(photo);
                  } else {
                    return new LoadPhotoHrReboardFamilySuccess({});
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
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardFamily>(HrReboardFamilyActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.HR_REBOARD_FAMILY_INFORMATION_DATA_URLs.deleteAwaitingApprovalData}/${payload.familyId}/${payload.employeeId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardFamily({ employeeId: payload.employeeId }),
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
