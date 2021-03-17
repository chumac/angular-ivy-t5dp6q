import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardContactActionTypes,
   LoadResidentialStatesHrReboardContact,
   LoadResidentialStatesHrReboardContactReady,
   LoadResidentialCitiesHrReboardContact,
   LoadResidentialCitiesHrReboardContactReady,
   LoadPermanentStatesHrReboardContact,
   LoadPermanentStatesHrReboardContactReady,
   LoadPermanentCitiesHrReboardContact,
   LoadPermanentCitiesHrReboardContactReady,
   LoadNextOfKinStatesHrReboardContact,
   LoadNextOfKinStatesHrReboardContactReady,
   LoadNextOfKinCitiesHrReboardContact,
   LoadNextOfKinCitiesHrReboardContactReady,
  LoadDataHrReboardContact,
  LoadDataHrReboardContactSuccess,
  SaveHrReboardContact,
  NotProcessingHrReboardContact,
  HideEditorHrReboardContact,
  LoadNextOfKinPhotoHrReboardContact,
  LoadNextOfKinPhotoHrReboardContactSuccess,
  LoadDocumentHrReboardContact,
  LoadDocumentHrReboardContactSuccess,
  LoadInlineDocumentHrReboardContact,
  SaveUpdateHrReboardContact,
  DeleteDataHrReboardContact
} from './hr-reboard-contact.actions';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardContactEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardContact>(HrReboardContactActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_CONTACT_DATA_URLs.getData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log(data.Results[0])
                return new LoadDataHrReboardContactSuccess(<IContact>(
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
      .ofType<LoadResidentialStatesHrReboardContact>(HrReboardContactActionTypes.LOAD_RESIDENTIAL_STATES)
    .pipe(
      map(action => action.payload.selectedResidentialCountry),
      map(
        selectedResidentialState =>
          new LoadResidentialStatesHrReboardContactReady({ raStateList: selectedResidentialState.StatesList })
      )
    );

  @Effect()
  loadResindentialCities$: Observable<Action> = this.actions$
      .ofType<LoadResidentialCitiesHrReboardContact>(HrReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES)
    .pipe(
      map(action => action.payload.selectedResidentialState),
      map(
        selectedResidentialCities =>
          new LoadResidentialCitiesHrReboardContactReady({ raCityList: selectedResidentialCities.CityList })
      )
    );

  @Effect()
  loadPermanentStates$: Observable<Action> = this.actions$
      .ofType<LoadPermanentStatesHrReboardContact>(HrReboardContactActionTypes.LOAD_PERMANENT_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedPermanentState =>
          new LoadPermanentStatesHrReboardContactReady({
            paStateList: selectedPermanentState.StatesList
          })
      )
    );
    @Effect()
    loadPermanentCities$: Observable<Action> = this.actions$
      .ofType<LoadPermanentCitiesHrReboardContact>(HrReboardContactActionTypes.LOAD_PERMANENT_CITIES)
      .pipe(
        map(action => action.payload.selectedPermanentState),
        map(
          selectedPermanentState =>
            new LoadPermanentCitiesHrReboardContactReady({
              paCityList: selectedPermanentState.CityList
            })
        )
      );

  @Effect()
  loadNextOfKinStates$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinStatesHrReboardContact>(HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(selectedNextOfKinState =>
        new LoadNextOfKinStatesHrReboardContactReady({ nokStateList: selectedNextOfKinState.StatesList}))
    );

  @Effect()
  loadNextOfKinCities$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinCitiesHrReboardContact>(HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES)
    .pipe(
      map(action => action.payload.selectedNextOfKinState),
      map(selectedNextOfKinCities =>
        new LoadNextOfKinCitiesHrReboardContactReady({ nokCityList: selectedNextOfKinCities.CityList }))
    );


  @Effect()
  submitData$: Observable<Action> = this.actions$
      .ofType<SaveHrReboardContact>(HrReboardContactActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.HR_REBOARD_CONTACT_DATA_URLs.updateAwaitingApprovalData, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardContact(),
                  new HideEditorHrReboardContact(),
                  new LoadDataHrReboardContact({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardContact(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              return from([
                new NotProcessingHrReboardContact(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            }

            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdateHrReboardContact>(HrReboardContactActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HR_REBOARD_CONTACT_DATA_URLs.updateAwaitingApprovalData}/${payload.employeeId}/${payload.contactId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardContact(),
                  new HideEditorHrReboardContact(),
                  new LoadDataHrReboardContact({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardContact(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              return from([
                new NotProcessingHrReboardContact(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            }

            )
          );
      })
    );

  @Effect()
  loadNextOfKinPhoto$: Observable<Action> = this.actions$
      .ofType<LoadNextOfKinPhotoHrReboardContact>(HrReboardContactActionTypes.LOAD_NOK_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_CONTACT_DATA_URLs.nextOfKinPhoto}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadNextOfKinPhotoHrReboardContactSuccess(photo);
              } else {
                return new LoadNextOfKinPhotoHrReboardContactSuccess({});
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
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardContact>(HrReboardContactActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.CONTACT_INFORMATION.deleteAwaitingApprovalData}/${payload.id}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardContact({ employeeId: payload.employeeId })

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
    loadDocument$: Observable<Action> = this.actions$
        .ofType<LoadDocumentHrReboardContact>(HrReboardContactActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url =  constants.HR_REBOARD_CONTACT_DATA_URLs.documentAwaitingApproval;
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

                    return new LoadDocumentHrReboardContactSuccess(docData);
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
        .ofType<LoadInlineDocumentHrReboardContact>(HrReboardContactActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.HR_REBOARD_CONTACT_DATA_URLs.documentAwaitingApproval;
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
