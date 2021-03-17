import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

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
  LoadAwaitingApprovalDataContact,
  LoadAwaitingApprovalDataContactSuccess,
  SaveContact,
  NotProcessingContact,
  HideEditorContact,
  DeleteAwaitingApprovalDataContact,
} from './contact.actions';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataContact>(ContactActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.CONTACT_INFORMATION.approvedData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingContact());
                return new LoadApprovedDataContactSuccess(<IContact>(
                  data.Results[0]
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataContact>(
      ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.CONTACT_INFORMATION.awaitingApprovalData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataContactSuccess(<IContact>(
                  data.Results[0]
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
  loadResindentialStates$: Observable<Action> = this.actions$
    .ofType<LoadResidentialStatesContact>(ContactActionTypes.HR_LOAD_RESIDENTIAL_STATES)
    .pipe(
      map(action => action.payload.selectedResidentialCountry),
      map(
        selectedResidentialState =>
          new LoadResidentialStatesContactReady({ raStateList: selectedResidentialState.StatesList })
      )
    );

  @Effect()
  loadResindentialCities$: Observable<Action> = this.actions$
    .ofType<LoadResidentialCitiesContact>(ContactActionTypes.HR_LOAD_RESIDENTIAL_CITIES)
    .pipe(
      map(action => action.payload.selectedResidentialState),
      map(
        selectedResidentialCities =>
          new LoadResidentialCitiesContactReady({ raCityList: selectedResidentialCities.CityList })
      )
    );

  @Effect()
  loadPermanentStates$: Observable<Action> = this.actions$
    .ofType<LoadPermanentStatesContact>(ContactActionTypes.HR_LOAD_PERMANENT_STATES)
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
      .ofType<LoadPermanentCitiesContact>(ContactActionTypes.HR_LOAD_PERMANENT_CITIES)
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
    .ofType<LoadNextOfKinStatesContact>(ContactActionTypes.HR_LOAD_NEXT_OF_KIN_STATES)
    .pipe(
      map(action => action.payload.selectedNationality),
      map(selectedNextOfKinState =>
        new LoadNextOfKinStatesContactReady({ nokStateList: selectedNextOfKinState.StatesList}))
    );

  @Effect()
  loadNextOfKinCities$: Observable<Action> = this.actions$
    .ofType<LoadNextOfKinCitiesContact>(ContactActionTypes.HR_LOAD_NEXT_OF_KIN_CITIES)
    .pipe(
      map(action => action.payload.selectedNextOfKinState),
      map(selectedNextOfKinCities =>
        new LoadNextOfKinCitiesContactReady({ nokCityList: selectedNextOfKinCities.CityList }))
    );


  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveContact>(ContactActionTypes.HR_SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        // console.log(payload.data);
        console.log('url', `${constants.CONTACT_INFORMATION.update}/${payload.employeeId}`)
        return this.apiService
          .create(`${constants.CONTACT_INFORMATION.update}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('after save', data);
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingContact(),
                  new HideEditorContact(),
                  new LoadAwaitingApprovalDataContact({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingContact(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingContact(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataContact>(ContactActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.CONTACT_INFORMATION.deleteAwaitingApprovalData}/${payload.id}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadAwaitingApprovalDataContact({employeeId:payload.employeeId})

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
