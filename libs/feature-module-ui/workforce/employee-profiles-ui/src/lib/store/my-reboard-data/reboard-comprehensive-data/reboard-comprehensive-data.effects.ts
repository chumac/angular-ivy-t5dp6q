import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';
import {
  ReboardComprehensiveDataActionTypes,
  LoadReboardComprehensiveData,
  LoadReboardComprehensiveDataSuccess
} from './reboard-comprehensive-data.actions';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { LoadEmployeePhoto, LoadReportsToEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';

@Injectable()
export class ReboardComprehensiveDataEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadReboardComprehensiveData>(ReboardComprehensiveDataActionTypes.LOAD_DATA),
    mergeMap(() => {
      return this.apiService.read(constants.COMPREHENSIVE_DATA_URLs.getData).pipe(
        mergeMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            const comprehensiveData = <IComprehensiveData>(data.Results[0]);

            return from([
              new LoadReboardComprehensiveDataSuccess(comprehensiveData),
              new LoadEmployeePhoto(comprehensiveData.employee_id),
              new LoadReportsToEmployeePhoto(comprehensiveData.reports_to_id)
            ]);
          } else {
            return from([]);
          }
        }),
        catchError((error: any) => of(new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR })))
      )
    }
    )
  );
}
