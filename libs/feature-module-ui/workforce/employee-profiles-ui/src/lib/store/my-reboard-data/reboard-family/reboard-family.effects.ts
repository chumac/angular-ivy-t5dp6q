import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  ReboardFamilyActionTypes,
  LoadStatesReboardFamily,
  LoadStatesReboardFamilyReady,
  LoadCitiesReboardFamily,
  LoadCitiesReboardFamilyReady,
  LoadDataReboardFamily,
  LoadDataReboardFamilySuccess,
  SaveReboardFamily,
  NotProcessingReboardFamily,
  HideEditorReboardFamily,
  LoadDocumentReboardFamily,
  LoadDocumentReboardFamilySuccess,
  LoadInlineDocumentReboardFamily,
  LoadPhotoReboardFamily,
  LoadPhotoReboardFamilySuccess,
  SaveUpdateReboardFamily,
  DeleteDataReboardFamily,
} from './reboard-family.actions';
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardFamilyEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardFamily>(ReboardFamilyActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardFamilySuccess(<IFamily[]>(
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
    .ofType<SaveReboardFamily>(ReboardFamilyActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardFamily(),
                  new HideEditorReboardFamily(),
                  new LoadDataReboardFamily(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardFamily(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardFamily(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardFamily>(ReboardFamilyActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardFamily(),
                  new HideEditorReboardFamily(),
                  new LoadDataReboardFamily(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardFamily(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardFamily(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

    @Effect()
    LoadState$: Observable<Action> = this.actions$
      .ofType<LoadStatesReboardFamily>(ReboardFamilyActionTypes.LOAD_STATES)
      .pipe(
        map(action => action.payload.selectedCountry),
        map(
          selectedCountry =>
            new LoadStatesReboardFamilyReady({ stateList: selectedCountry.StatesList })
        )
      );

    @Effect()
    LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesReboardFamily>(ReboardFamilyActionTypes.LOAD_CITIES)
      .pipe(
        map(action => action.payload.selectedState),
        map(
          selectedCities =>
            new LoadCitiesReboardFamilyReady({ cityList: selectedCities.CityList })
        )
      );

    @Effect()
    loadDocument$: Observable<Action> = this.actions$
      .ofType<LoadDocumentReboardFamily>(ReboardFamilyActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.document;
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

                    return new LoadDocumentReboardFamilySuccess(docData);
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
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardFamily>(ReboardFamilyActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  // new RemoveApprovedDataFamily({recordId: payload.recordId}),
                  new LoadDataReboardFamily(),
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
    loadInlineDocument$: Observable<Action> = this.actions$
      .ofType<LoadInlineDocumentReboardFamily>(ReboardFamilyActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.document;
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
      loadPhoto$: Observable<Action> = this.actions$
        .ofType<LoadPhotoReboardFamily>(ReboardFamilyActionTypes.LOAD_PHOTO)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.REBOARD_FAMILY_INFORMATION_DATA_URLs.image}/${payload.recordId}`)
              .pipe(
                map((data: IApiResult) => {
                  if (data.Success && data.Results) {
                    const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                    return new LoadPhotoReboardFamilySuccess(photo);
                  } else {
                    return new LoadPhotoReboardFamilySuccess({});
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
}
