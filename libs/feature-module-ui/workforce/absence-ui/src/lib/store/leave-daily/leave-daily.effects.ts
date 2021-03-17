import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import { IApiResult } from 'dist/libs/models/core-data';
import { LeaveDailyActionTypes, LeaveDailyLoadEntitlements, LeaveDailyLoadEntitlementsSuccess, LeaveDailyLoadEntitlementsFailure, LoadApprovedDataLeaveDaily, LoadApprovedDataLeaveDailySuccess, LoadAwaitingApprovalDataLeaveDaily, LoadAwaitingApprovalDataLeaveDailySuccess, LoadLeaveContactInfo, LoadLeaveContactInfoSuccess } from './leave-daily.actions';
import { ILeaveEntitlement, ILeaveDailyData, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class LeaveDailyEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadLeaveDailyEntitlements$: Observable<Action> = this.actions$.pipe(
    ofType<LeaveDailyLoadEntitlements>(LeaveDailyActionTypes.LOAD_ENTITLEMENTS),
      switchMap(() => {
        return this.apiService.read(constants.LEAVE_URLs.getLeaveEntitlements).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const list = <ILeaveEntitlement[]>(data.Results);

              return from([
                new LeaveDailyLoadEntitlementsSuccess(list),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) => of(new LeaveDailyLoadEntitlementsFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
        )
      }
    )
  );

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataLeaveDaily>(LeaveDailyActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataLeaveDailySuccess(<ILeaveDailyData[]>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataLeaveDaily>(LeaveDailyActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_URLs.awaitingApprovalData)
          .pipe(
            map((data: any) => {
              console.log(constants.LEAVE_URLs.awaitingApprovalData);
              console.log(data);

              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataLeaveDailySuccess(<ILeaveDailyData[]>(data.Results[0]));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


    @Effect()
    loadLeaveContactInfo$: Observable<Action> = this.actions$.pipe(
      ofType<LoadLeaveContactInfo>(LeaveDailyActionTypes.LOAD_CONTACT_INFO),
        switchMap(() => {
          return this.apiService.read(constants.LEAVE_URLs.getLeaveContactInfo).pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const list = <ILeaveContactInfo>(data.Results[0]);
                return from([
                  new LoadLeaveContactInfoSuccess(list),
                ]);
              } else {
                return from([]);
              }
            }),
            catchError((error: any) => of(new LeaveDailyLoadEntitlementsFailure({errorMessage: 'Something went wrong. Form data could not be loaded. ' + error})))
          )
        }
      )
    );


}
