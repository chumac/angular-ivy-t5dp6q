import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

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
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataPayment>(PaymentActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_PAYMENT_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataPaymentSuccess(<IPayment>(data.Results[0]));
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataPayment>(PaymentActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_PAYMENT_DATA_URLs.awaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataPaymentSuccess(<IPayment>(
                  data.Results[0]
                ));
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
    .ofType<SavePayment>(PaymentActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PERSONAL_INFORMATION_PAYMENT_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingPayment(),
                  new HideEditorPayment(),
                  new LoadApprovedDataPayment(),
                  new LoadAwaitingApprovalDataPayment()
                ]);
              } else {
                return from([
                  new NotProcessingPayment(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayment(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

    @Effect()
    deleteAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<DeleteAwaitingApprovalDataPayment>(PaymentActionTypes.DELETE_AWAITING_APPROVAL_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .delete(constants.PERSONAL_INFORMATION_PAYMENT_DATA_URLs.deleteAwaitingApprovalData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                    new LoadAwaitingApprovalDataPayment(),
                  ]);
                } else {
                  return from([
                    new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ])
              )
            );
        })
      );

}
