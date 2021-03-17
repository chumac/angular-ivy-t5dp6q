import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import {
  ComprehensiveDataActionTypes,
  ComprehensiveDataLoadSuccess,
  ComprehensiveDataLoadFailure,
  ComprehensiveDataLoad
} from './comprehensive-data.actions';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { LoadEmployeePhoto, LoadReportsToEmployeePhoto } from '../../image/image.actions';

@Injectable()
export class ComprehensiveDataEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<ComprehensiveDataLoad>(ComprehensiveDataActionTypes.LOAD54),
      mergeMap(() => {
        return this.apiService.read(constants.COMPREHENSIVE_DATA_URLs.getData).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const comprehensiveData = <IComprehensiveData>(data.Results[0]);

              // console.log('comprehensiveData', comprehensiveData);

              return from([
                new ComprehensiveDataLoadSuccess(comprehensiveData),
                new LoadEmployeePhoto(comprehensiveData.employee_id),
                new LoadReportsToEmployeePhoto(comprehensiveData.reports_to_id)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) => of(new ComprehensiveDataLoadFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
        )
      }
    )
  );
}
