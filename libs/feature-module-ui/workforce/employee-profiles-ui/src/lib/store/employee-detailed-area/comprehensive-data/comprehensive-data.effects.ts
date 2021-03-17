import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';
import * as constants from '../../../constants';

import {
  ComprehensiveDataActionTypes,
  LoadComprehensiveData,
  LoadComprehensiveDataSuccess
} from './comprehensive-data.actions';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class ComprehensiveDataEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  LoadData$: Observable<Action> = this.actions$
    .ofType<LoadComprehensiveData>(ComprehensiveDataActionTypes.HR_LOAD)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.COMPREHENSIVE_DATA.getData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadComprehensiveDataSuccess(<IComprehensiveData>(data.Results[0]));
              } else {
                return new ShowToast({title: 'Employee Data Could Not Be Loaded', message: 'Something went wrong. Employee data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
            of(
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ))
          );
      })
    );
}
