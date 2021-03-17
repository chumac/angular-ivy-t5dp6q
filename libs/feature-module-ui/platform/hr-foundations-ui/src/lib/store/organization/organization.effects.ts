import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  OrganizationActionTypes,
  LoadStatesOrganization,
  LoadStatesOrganizationReady,
  LoadCitiesOrganization,
  LoadCitiesOrganizationReady,
  LoadApprovedDataOrganization,
  LoadApprovedDataOrganizationSuccess,
  SaveOrganization,
  NotProcessingOrganization,
  HideEditorOrganization,

} from './organization.actions';
import { IOrganization } from '@nutela/models/foundation';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class OrganizationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataOrganization>(OrganizationActionTypes.LOAD_ORGANIZATION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.ORGANIZATION_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingOrganization());
                return new LoadApprovedDataOrganizationSuccess(<IOrganization[]>(
                  data.Results
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
    LoadState$: Observable<Action> = this.actions$
      .ofType<LoadStatesOrganization>(OrganizationActionTypes.LOAD_STATES)
      .pipe(
        map(action => action.payload.selectedCountry),
        map(
          selectedCountry =>
            new LoadStatesOrganizationReady({ stateList: selectedCountry.StatesList })
        )
      );

    @Effect()
    LoadCities$: Observable<Action> = this.actions$
      .ofType<LoadCitiesOrganization>(OrganizationActionTypes.LOAD_CITIES)
      .pipe(
        map(action => action.payload.selectedState),
        map(
          selectedCities =>
            new LoadCitiesOrganizationReady({ cityList: selectedCities.CityList })
        )
      );


  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveOrganization>(OrganizationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.ORGANIZATION_URLs.update}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingOrganization(),
                  new HideEditorOrganization(),
                  new LoadApprovedDataOrganization(),
                ]);
              } else {
                return from([
                  new NotProcessingOrganization(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingOrganization(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );
  }
