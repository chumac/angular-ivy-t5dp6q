import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService } from '@nutela/core-services';

import {
  HrReboardPaymentActionTypes,
  LoadDataHrReboardPayment,
  LoadDataHrReboardPaymentSuccess,
  SaveHrReboardPayment,
  NotProcessingHrReboardPayment,
  HideEditorHrReboardPayment,
  SaveUpdateHrReboardPayment
} from './hr-reboard-payment.actions';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardPaymentEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardPayment>(HrReboardPaymentActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_PAYMENT_DATA_URLs.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardPaymentSuccess(<IPayment>(data.Results[0]));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardPayment>(HrReboardPaymentActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.HR_REBOARD_PAYMENT_DATA_URLs.updateAwaitingApprovalData, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardPayment(),
                  new HideEditorHrReboardPayment(),
                  new LoadDataHrReboardPayment({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardPayment(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardPayment(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardPayment>(HrReboardPaymentActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HR_REBOARD_PAYMENT_DATA_URLs.updateAwaitingApprovalData}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardPayment(),
                  new HideEditorHrReboardPayment(),
                  new LoadDataHrReboardPayment({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardPayment(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardPayment(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
