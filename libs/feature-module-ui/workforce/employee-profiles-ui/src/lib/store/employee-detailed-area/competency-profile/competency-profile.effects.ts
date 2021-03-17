import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { 
  CompetencyProfileActionTypes,
  LoadApprovedDataCompetencyProfile,
  LoadApprovedDataCompetencyProfileSuccess
} from './competency-profile.actions';
import { ICompetencyProfile } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class CompetencyProfileEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataCompetencyProfile>(CompetencyProfileActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.COMPETENCY_PROFILE.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataCompetencyProfileSuccess(<ICompetencyProfile[]>(data.Results));
              } else {
                return new ShowToast({title: 'Competency Profile Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded.', options: toastOptionsError()})
              }
            }),
            catchError((error: any) => 
            of(
              new ShowToast({title: 'Competency Profile Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ))
          );
      })
    );
}