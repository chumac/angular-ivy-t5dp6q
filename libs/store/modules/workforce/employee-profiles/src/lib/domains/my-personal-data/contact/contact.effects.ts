import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ContactActionTypes,
   LoadResidentialStatesContact,
   LoadResidentialStatesContactReady,
   LoadResidentialCitiesContact,
   LoadResidentialCitiesContactReady,
   LoadPermanentStatesContact,
   LoadPermanentStatesContactReady,
   LoadPermanentCitiesContact,
   LoadPermanentCitiesContactReady,
   LoadNextOfKinStatesContact,
   LoadNextOfKinStatesContactReady,
   LoadNextOfKinCitiesContact,
   LoadNextOfKinCitiesContactReady,
  LoadApprovedDataContact,
  LoadApprovedDataContactSuccess,
  LoadApprovedDataContactFailure,
  LoadAwaitingApprovalDataContact,
  LoadAwaitingApprovalDataContactSuccess,
  LoadAwaitingApprovalDataContactFailure,
  SaveContact,
  SaveContactFailure,
  SaveContactSuccess,
  NotProcessingContact,
  HideEditorContact,
  DeleteAwaitingApprovalDataContact,
  LoadNextOfKinPhoto,
  LoadNextOfKinPhotoSuccess,
  LoadAwaitingApprovalNextOfKinPhoto,
  LoadAwaitingApprovalNextOfKinPhotoSuccess,
  LoadDocumentContact,
  LoadDocumentContactSuccess,
  LoadInlineDocumentContact
} from './contact.actions';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataContact>(ContactActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataContactSuccess(<IContact>(
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataContact>(
      ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataContactSuccess(<IContact>(
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
    .ofType<LoadResidentialStatesContact>(ContactActionTypes.LOAD_RESIDENTIAL_STATES)
    .pipe(
      map(action => action.payload.selectedResidentialCountry),
      map(
        selectedResidentialState =>
          new LoadResidentialStatesContactReady({ raStateList: selectedResidentialState.StatesList })
      )
    );

  @Effect()
  loadResindentialCities$: Observable<Action> = this.actions$
    .ofType<LoadResidentialCitiesContact>(ContactActionTypes.LOAD_RESIDENTIAL_CITIES)
    .pipe(
      map(action => action.payload.selectedResidentialState),
      map(
        selectedResidentialCities =>
          new LoadResidentialCitiesContactReady({ raCityList: selectedResidentialCities.CityList })
      )
    );

  @Effect()
  loadPermanentStates$: Observable<Action> = this.actions$
    .ofType<LoadPermanentStatesContact>(ContactActionTypes.LOAD_PERMANENT_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(
        selectedPermanentState =>
          new LoadPermanentStatesContactReady({
            paStateList: selectedPermanentState.StatesList
          })
      )
    );
    @Effect()
    loadPermanentCities$: Observable<Action> = this.actions$
      .ofType<LoadPermanentCitiesContact>(ContactActionTypes.LOAD_PERMANENT_CITIES)
      .pipe(
        map(action => action.payload.selectedPermanentState),
        map(
          selectedPermanentState =>
            new LoadPermanentCitiesContactReady({
              paCityList: selectedPermanentState.CityList
            })
        )
      );

  @Effect()
  loadNextOfKinStates$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinStatesContact>(ContactActionTypes.LOAD_NEXT_OF_KIN_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(selectedNextOfKinState =>
        new LoadNextOfKinStatesContactReady({ nokStateList: selectedNextOfKinState.StatesList}))
    );

  @Effect()
  loadNextOfKinCities$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinCitiesContact>(ContactActionTypes.LOAD_NEXT_OF_KIN_CITIES)
    .pipe(
      map(action => action.payload.selectedNextOfKinState),
      map(selectedNextOfKinCities =>
        new LoadNextOfKinCitiesContactReady({ nokCityList: selectedNextOfKinCities.CityList }))
    );


  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveContact>(ContactActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingContact(),
                  new HideEditorContact(),
                  new LoadApprovedDataContact(),
                  new LoadAwaitingApprovalDataContact(),
                ]);
              } else {
                return from([
                  new NotProcessingContact(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) => {
              console.log(error)
              return from([
                new NotProcessingContact(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            }

            )
          );
      })
    );

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataContact>(ContactActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .delete(constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.deleteAwaitingApprovalData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalDataContact(),
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

  @Effect()
  loadNextOfKinPhoto$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinPhoto>(ContactActionTypes.LOAD_APPROVED_NOK_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.nextOfKinPhoto)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadNextOfKinPhotoSuccess(photo);
              } else {
                return new LoadNextOfKinPhotoSuccess({});
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
  loadAwaitingApprovalNextOfKinPhoto$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalNextOfKinPhoto>(ContactActionTypes.LOAD_AWAITING_APPROVAL_NOK_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.awaitingApprovalNextOfKinPhoto)
          .pipe(
            map((data: any) => {
              console.log('Mext of Kin >>>', data);

              if (data.Success && data.Results && data.Results[0]) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadAwaitingApprovalNextOfKinPhotoSuccess(photo);
              } else {
                return new LoadAwaitingApprovalNextOfKinPhotoSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Awaiting Approval Next-of-Kin Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

    @Effect()
    loadDocument$: Observable<Action> = this.actions$
      .ofType<LoadDocumentContact>(ContactActionTypes.LOAD_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.isApproved?`${constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.documentApproved}`: constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.documentAwaitingApproval;
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

                    return new LoadDocumentContactSuccess(docData);
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
      .ofType<LoadInlineDocumentContact>(ContactActionTypes.LOAD_INLINE_DOCUMENT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.isApproved?`${constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.documentApproved}`: constants.PERSONAL_INFORMATION_CONTACT_DATA_URLs.documentAwaitingApproval;
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

}
