import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap, switchMap, map } from 'rxjs/operators';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../../constants';
import {
  HrReboardComprehensiveDataActionTypes,
  LoadHrReboardComprehensiveData,
  LoadHrReboardComprehensiveDataSuccess
} from './hr-reboard-comprehensive-data.actions';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { LoadEmployeePhoto, LoadReportsToEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';

@Injectable()
export class HrReboardComprehensiveDataEffects {
  constructor(private actions$: Actions, private apiService: ApiService) { }

  @Effect()
  LoadData$: Observable<Action> = this.actions$
      .ofType<LoadHrReboardComprehensiveData>(HrReboardComprehensiveDataActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.HR_REBOARD_COMPREHENSIVE_DATA.getData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadHrReboardComprehensiveDataSuccess(<IComprehensiveData>(data.Results[0]));
              } else {
                return new ShowToast({ title: 'Employee Data Could Not Be Loaded', message: 'Something went wrong. Employee data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR })
              ))
          );
      })
    );
}
