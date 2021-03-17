import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  ApiService,
  UtilService,
  toastOptionsError
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import * as constants from '@nutela/shared/app-global';
import { ToastTypes } from '@nutela/shared/app-global';
import {
  LoadDataPeople,
  PeopleActionTypes,
  LoadDataPeopleSuccess,
  NotProcessingPeople,
  NotLoadingPeople
} from './people.actions';
import { IPeople } from '@nutela/models/workforce/personnel';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAppState>
  ) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataPeople>(PeopleActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.PEOPLE_DATA_URLs.getPeopleData}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotLoadingPeople());
              return new LoadDataPeopleSuccess(<IPeople[]>data.Results);
            } else {
              this.store.dispatch(new NotLoadingPeople());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: data.ErrorMessage? data.ErrorMessage:'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new NotLoadingPeople(),
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );
}
