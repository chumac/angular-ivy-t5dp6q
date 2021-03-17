import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  SystemActionTypes,
  LoadSystemData,
  LoadSystemDataSuccess,
  NotProcessingSystem,

} from './system.actions';
import {  ISystem } from '@nutela/models/foundation';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class SystemEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadSystemData$: Observable<Action> = this.actions$
    .ofType<LoadSystemData>(SystemActionTypes.LOAD_SYSTEM_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.NOTIFICATION_URLs.systemData)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingSystem());
                return new LoadSystemDataSuccess(<ISystem[]>(
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
}

