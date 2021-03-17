import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess,
  UtilService
} from '@nutela/core-services';
import {
  SubscriptionActionTypes,
  LoadApprovedDataSubscription,
  LoadApprovedDataSubscriptionSuccess,
  LoadAwaitingApprovalDataSubscription,
  LoadAwaitingApprovalDataSubscriptionSuccess,
  SaveSubscription,
  NotProcessingSubscription,
  HideEditorSubscription,
  LoadDataSubscription,
  LoadSubscriptionTypeSubscription,
  LoadSubscriptionTypeSubscriptionSuccess,
  LoadMembershipListSubscription,
  LoadMembershipListSubscriptionSuccess,
  LoadCurrencyListSubscription,
  LoadCurrencyListSubscriptionSuccess,
  LoadProcessedDataSubscription,
  LoadProcessedDataSubscriptionSuccess
} from './subscription.actions';
import { ISubscription, ISubscriptionType, IMembershipInfo } from '@nutela/models/workforce/subscription';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';

@Injectable()
export class SubscriptionEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataSubscription>(
      SubscriptionActionTypes.LOAD_APPROVED_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SUBSCRIPTIONS_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataSubscriptionSuccess(<
                  ISubscription[]
                  >data.Results);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataSubscription>(
      SubscriptionActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SUBSCRIPTIONS_DATA_URLs.awaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataSubscriptionSuccess(<
                  ISubscription[]
                  >data.Results);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

    @Effect()
    loadProcessedData$: Observable<Action> = this.actions$
      .ofType<LoadProcessedDataSubscription>(
        SubscriptionActionTypes.LOAD_PROCESSED_DATA
      )
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.SUBSCRIPTIONS_DATA_URLs.processedData)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadProcessedDataSubscriptionSuccess(<
                    ISubscription[]
                    >data.Results);
                } else {
                  return new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded.',
                    options: toastOptionsError()
                  });
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message:
                      'Something went wrong. Form data could not be loaded. Error occured.',
                    options: toastOptionsError()
                  })
                )
              )
            );
        })
      );

  @Effect()
  loadSubscriptionType$: Observable<Action> = this.actions$
    .ofType<LoadSubscriptionTypeSubscription>(
      SubscriptionActionTypes.LOAD_SUBSCRIPTION_TYPE
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SUBSCRIPTIONS_DATA_URLs.subscriptionTypes)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadSubscriptionTypeSubscriptionSuccess(<
                  ISubscriptionType[]
                  >data.Results);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  loadMembershipList$: Observable<Action> = this.actions$
    .ofType<LoadMembershipListSubscription>(
      SubscriptionActionTypes.LOAD_MEMBERSHIP_LIST
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SUBSCRIPTIONS_DATA_URLs.membershipList}?subscriptiontypeID=${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadMembershipListSubscriptionSuccess(<
                  IMembershipInfo[]
                  >data.Results);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  loadCurrencyList$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyListSubscription>(
      SubscriptionActionTypes.LOAD_CURRENCY_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SUBSCRIPTIONS_DATA_URLs.currencyList)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const selectOptionData: ISelectOption[] = this.utilService.transformToSelectDataList(data.Results, 'code', 'description');
                return new LoadCurrencyListSubscriptionSuccess(selectOptionData);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveSubscription>(SubscriptionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.SUBSCRIPTIONS_DATA_URLs.add;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  options: toastOptionsSuccess()
                }),
                new NotProcessingSubscription(),
                new HideEditorSubscription(),
                new LoadApprovedDataSubscription(),
                new LoadAwaitingApprovalDataSubscription()
              ]);
            } else {
              return from([
                new NotProcessingSubscription(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  options: toastOptionsError()
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingSubscription(),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  `Something went wrong. Form data could not be saved. Error occured.` +
                  error,
                options: toastOptionsError()
              })
            ])
          )
        );
      })
    );

  // @Effect()
  // refreshData$: Observable<Action> = this.actions$
  //   .ofType<LoadDataSubscription>(SubscriptionActionTypes.REFRESH_DATA)
  //   .pipe(
  //     switchMap(() => {
  //       return from([
  //         new LoadApprovedDataSubscription(),
  //         new LoadAwaitingApprovalDataSubscription()
  //       ]);
  //     })
  //   );
}
