import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { WORK_LIFE_DATA_URLs, ToastTypes } from "@nutela/shared/app-global";

import {
  PolicyAgreementActionTypes,
  LoadAgreementTemplate,
  LoadAgreementTemplateSuccess,
  LoadEmployeeConsentSuccess,
  LoadEmployeeConsent,
} from './policy-agreement.actions';
import { Action } from '@ngrx/store';
import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '../Toast';

@Injectable()
export class PolicyAgreementEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadAgreementData$: Observable<Action> = this.actions$
    .ofType<LoadAgreementTemplate>(PolicyAgreementActionTypes.LOAD_AGREEMENT_TEMPLATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${WORK_LIFE_DATA_URLs.agreement}?option_key=${payload.key}`
          )
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadAgreementTemplateSuccess(<string>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
  );

  @Effect()
  loadEmployeeConsent$: Observable<Action> = this.actions$
      .ofType<LoadEmployeeConsent>(PolicyAgreementActionTypes.EMPLOYEE_CONSENT)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        const url = payload.isAdmin ? `${WORK_LIFE_DATA_URLs.hrConsent}` : `${WORK_LIFE_DATA_URLs.employeeConsent}`;
        return this.apiService
          .create(`${url}/${payload.employeeId}/${payload.accessPath}`, null)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                return new LoadEmployeeConsentSuccess(data.Success);
              } else {
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

}
