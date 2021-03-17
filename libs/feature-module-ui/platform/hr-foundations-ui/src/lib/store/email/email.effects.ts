import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  EmailActionTypes,
  LoadEmailData,
  LoadEmailDataSuccess,
  
} from './email.actions';
import {  IEmail} from '@nutela/models/foundation';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class EmailEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadEmailData$: Observable<Action> = this.actions$
    .ofType<LoadEmailData>(EmailActionTypes.LOAD_EMAIL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EMAILS_URLs.systemData)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success && data.Results) {
                return new LoadEmailDataSuccess(<IEmail[]>(
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

 