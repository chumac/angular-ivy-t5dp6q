import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { LoadEntitlementLeaveHourly, LeaveHourlyActionTypes, NotProcessingLeaveHourly, LoadEntitlementLeaveHourlySuccess, SaveLeaveHourly, HideEditorLeaveHourly, LoadApprovedDataLeaveHourly, LoadApprovedDataLeaveHourlySuccess, LoadAwaitingApprovalDataLeaveHourly, LoadAwaitingApprovalDataLeaveHourlySuccess } from './leave-hourly.actions';
import { ILeaveHourlyData, LeaveDailyModes } from '@nutela/models/workforce/leave';

@Injectable()
export class LeaveHourlyEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadLeaveEntitlement$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEntitlementLeaveHourly>(LeaveHourlyActionTypes.LOAD_LEAVE_ENTITLEMENT),
    map(action => action),
    switchMap(() => {
        return this.apiService.read(`${constants.LEAVE_URLs.getHourlyLeaveEntitlement}`).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              return from([
                new LoadEntitlementLeaveHourlySuccess(data.Results[0]),
                new NotProcessingLeaveHourly(),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingLeaveHourly(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveHourly>(LeaveHourlyActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {        
          return this.apiService
            .create(constants.LEAVE_URLs.saveHourlyApply, payload.leaveData)
            .pipe(
              switchMap((data: IApiResult) => {
                
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveHourly(),
                    new HideEditorLeaveHourly(),
                    new LoadAwaitingApprovalDataLeaveHourly()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveHourly(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveHourly(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      loadApprovedData$: Observable<Action> = this.actions$
        .ofType<LoadApprovedDataLeaveHourly>(LeaveHourlyActionTypes.LOAD_APPROVED_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.LEAVE_URLs.hourlyApprovedData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadApprovedDataLeaveHourlySuccess(<ILeaveHourlyData[]>(
                      data.Results
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
        .ofType<LoadAwaitingApprovalDataLeaveHourly>(LeaveHourlyActionTypes.LOAD_AWAITING_APPROVAL_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.LEAVE_URLs.hourlyAwaitingApprovalData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadAwaitingApprovalDataLeaveHourlySuccess(<ILeaveHourlyData[]>(data.Results));
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
    
        getSaveUrl(mode: string, id: number): string{
          if(mode === LeaveDailyModes.APPLY){
            return constants.LEAVE_URLs.saveApply;
          } else if(mode === LeaveDailyModes.RECALL) {
            return `${constants.LEAVE_URLs.saveRecall}?leaveTransID=${id}` ;
          } else if(mode === LeaveDailyModes.RESCHEDULE){
            return `${constants.LEAVE_URLs.saveReschedule}?leaveTransID=${id}` ;
          }
        }

   
}
