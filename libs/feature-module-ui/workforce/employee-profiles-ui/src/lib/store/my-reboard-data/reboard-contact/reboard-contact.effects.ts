import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  ReboardContactActionTypes,
   LoadResidentialStatesReboardContact,
   LoadResidentialStatesReboardContactReady,
   LoadResidentialCitiesReboardContact,
   LoadResidentialCitiesReboardContactReady,
   LoadPermanentStatesReboardContact,
   LoadPermanentStatesReboardContactReady,
   LoadPermanentCitiesReboardContact,
   LoadPermanentCitiesReboardContactReady,
   LoadNextOfKinStatesReboardContact,
   LoadNextOfKinStatesReboardContactReady,
   LoadNextOfKinCitiesReboardContact,
   LoadNextOfKinCitiesReboardContactReady,
  LoadDataReboardContact,
  LoadDataReboardContactSuccess,
  SaveReboardContact,
  NotProcessingReboardContact,
  HideEditorReboardContact,
  LoadNextOfKinPhotoReboardContact,
  LoadNextOfKinPhotoReboardContactSuccess,
  LoadDocumentReboardContact,
  LoadDocumentReboardContactSuccess,
  LoadInlineDocumentReboardContact,
  SaveUpdateReboardContact
} from './reboard-contact.actions';
import { IContact, IReboardContact } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

const testObj = {

}

@Injectable()
export class ReboardContactEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardContact>(ReboardContactActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_CONTACT_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log(data.Results[0])
                return new LoadDataReboardContactSuccess(<IReboardContact>(
                  data.Results[0]
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
  loadResidentialStates$: Observable<Action> = this.actions$
      .ofType<LoadResidentialStatesReboardContact>(ReboardContactActionTypes.LOAD_RESIDENTIAL_STATES)
    .pipe(
      map(action => action.payload.selectedResidentialCountry),
      map(
        selectedResidentialState =>
          new LoadResidentialStatesReboardContactReady({ raStateList: selectedResidentialState.StatesList })
      )
    );

  @Effect()
  loadResindentialCities$: Observable<Action> = this.actions$
      .ofType<LoadResidentialCitiesReboardContact>(ReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES)
    .pipe(
      map(action => action.payload.selectedResidentialState),
      map(
        selectedResidentialCities =>
          new LoadResidentialCitiesReboardContactReady({ raCityList: selectedResidentialCities.CityList })
      )
    );

  @Effect()
  loadPermanentStates$: Observable<Action> = this.actions$
      .ofType<LoadPermanentStatesReboardContact>(ReboardContactActionTypes.LOAD_PERMANENT_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedPermanentState =>
          new LoadPermanentStatesReboardContactReady({
            paStateList: selectedPermanentState.StatesList
          })
      )
    );
    @Effect()
    loadPermanentCities$: Observable<Action> = this.actions$
      .ofType<LoadPermanentCitiesReboardContact>(ReboardContactActionTypes.LOAD_PERMANENT_CITIES)
      .pipe(
        map(action => action.payload.selectedPermanentState),
        map(
          selectedPermanentState =>
            new LoadPermanentCitiesReboardContactReady({
              paCityList: selectedPermanentState.CityList
            })
        )
      );

  @Effect()
  loadNextOfKinStates$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinStatesReboardContact>(ReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(selectedNextOfKinState =>
        new LoadNextOfKinStatesReboardContactReady({ nokStateList: selectedNextOfKinState.StatesList}))
    );

  @Effect()
  loadNextOfKinCities$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinCitiesReboardContact>(ReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES)
    .pipe(
      map(action => action.payload.selectedNextOfKinState),
      map(selectedNextOfKinCities =>
        new LoadNextOfKinCitiesReboardContactReady({ nokCityList: selectedNextOfKinCities.CityList }))
    );


  @Effect()
  submitData$: Observable<Action> = this.actions$
      .ofType<SaveReboardContact>(ReboardContactActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.REBOARD_CONTACT_DATA_URLs.create, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardContact(),
                  new HideEditorReboardContact(),
                  new LoadDataReboardContact(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardContact(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              return from([
                new NotProcessingReboardContact(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            }

            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateReboardContact>(ReboardContactActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(constants.REBOARD_CONTACT_DATA_URLs.update, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardContact(),
                  new HideEditorReboardContact(),
                  new LoadDataReboardContact(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardContact(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              return from([
                new NotProcessingReboardContact(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            }

            )
          );
      })
    );

  @Effect()
  loadNextOfKinPhoto$: Observable<Action> = this.actions$
      .ofType<LoadNextOfKinPhotoReboardContact>(ReboardContactActionTypes.LOAD_NOK_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_CONTACT_DATA_URLs.nextOfKinPhoto)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadNextOfKinPhotoReboardContactSuccess(photo);
              } else {
                return new LoadNextOfKinPhotoReboardContactSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Next-of-Kin Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
  );


    @Effect()
    loadDocument$: Observable<Action> = this.actions$
        .ofType<LoadDocumentReboardContact>(ReboardContactActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.REBOARD_CONTACT_DATA_URLs.document;
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

                    return new LoadDocumentReboardContactSuccess(docData);
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
        .ofType<LoadInlineDocumentReboardContact>(ReboardContactActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.REBOARD_CONTACT_DATA_URLs.document;
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

}
