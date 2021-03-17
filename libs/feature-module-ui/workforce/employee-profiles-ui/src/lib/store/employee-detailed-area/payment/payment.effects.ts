import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import {
  PaymentActionTypes,
  LoadApprovedDataPayment,
  LoadApprovedDataPaymentSuccess,
  LoadAwaitingApprovalDataPayment,
  LoadAwaitingApprovalDataPaymentSuccess,
  SavePayment,
  NotProcessingPayment,
  HideEditorPayment,
  DeleteAwaitingApprovalDataPayment
} from './payment.actions';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataPayment>(PaymentActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PAYMENT_INFORMATION.approvedData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataPaymentSuccess(<IPayment>(data.Results[0]));
              } else {
                return new ShowToast({title: 'Payment Information Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Payment Information Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataPayment>(PaymentActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PAYMENT_INFORMATION.awaitingApprovalData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataPaymentSuccess(<IPayment>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({title: 'Payment Information Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Payment Information Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SavePayment>(PaymentActionTypes.HR_SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('url', `${constants.PAYMENT_INFORMATION.updateAwaitingApprovalData}?employeeID=${payload.employeeId}&id=${payload.employeeDetailId}`);
        return this.apiService
          .create(`${constants.PAYMENT_INFORMATION.updateAwaitingApprovalData}/${payload.employeeId}/${payload.employeeDetailId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPayment(),
                  new HideEditorPayment(),
                  new LoadAwaitingApprovalDataPayment({employeeId:payload.employeeId}),
                  new LoadApprovedDataPayment({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingPayment(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayment(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    deleteAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<DeleteAwaitingApprovalDataPayment>(PaymentActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .delete(`${constants.PAYMENT_INFORMATION.deleteAwaitingApprovalData}/${payload.id}`)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                    new LoadAwaitingApprovalDataPayment({employeeId:payload.employeeId}),
                    new LoadApprovedDataPayment({employeeId:payload.employeeId})
                  ]);
                } else {
                  return from([
                    new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ])
              )
            );
        })
      );

}
