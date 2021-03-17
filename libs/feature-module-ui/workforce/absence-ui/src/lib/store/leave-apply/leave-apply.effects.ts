import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, formatDate } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { LoadEntitlementLeaveApply, LeaveApplyActionTypes, NotProcessingLeaveApply, LoadEntitlementLeaveApplySuccess, LoadStatesLeaveApply, LoadStatesLeaveApplyReady, LoadCitiesLeaveApply, LoadCitiesLeaveApplyReady, SaveLeaveApply, HideEditorLeaveApply, LoadApprovedDataLeaveApply, LoadApprovedDataLeaveApplySuccess, LoadAwaitingApprovalDataLeaveApply, LoadAwaitingApprovalDataLeaveApplySuccess, NotProcessingFormLeaveApply, LoadSubDetailLeaveApply, ShowFullFormLeaveApply, LoadSubDetailLeaveApplySuccess, LoadInlineDocumentLeaveApply } from './leave-apply.actions';
import { ILeaveEntitlement, ILeaveDailyData, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { IPerformanceState } from '@nutela/feature-module-ui/talent/performance-ui';
import { leaveTypes } from '@nutela/store/modules/foundation';

@Injectable()
export class LeaveApplyEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IPerformanceState>, private utilService: UtilService) {}

  @Effect()
  loadLeaveEntitlement$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEntitlementLeaveApply>(LeaveApplyActionTypes.LOAD_LEAVE_ENTITLEMENT),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${constants.LEAVE_URLs.getleaveEntitlement}?id=${payload.selectedLeaveType.value}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result: any = (<string[]>data.Results)[0];
              const ar: string[] = result.split('|');
              const leaveEntitlement: ILeaveEntitlement = {
                leave_id: 0,
                description: '',
                is_annual: false,
                total_days: Number(ar[0]),
                used_days:  Number(ar[1]),
                available_days: Number(ar[2]),
                summaryCaption:`Total:  ${ar[0]}  Used:  ${ar[1]}  Available:  ${ar[2]}`
              };
              return from([
                new LoadEntitlementLeaveApplySuccess({leaveEntitlement: leaveEntitlement}),
                new NotProcessingFormLeaveApply(),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingFormLeaveApply(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadSubDetail$: Observable<Action> = this.actions$.pipe(
    ofType<LoadSubDetailLeaveApply>(LeaveApplyActionTypes.LOAD_LEAVE_SUBDETAIL),
    map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.LEAVE_URLs.getleaveEntitlement}?id=${payload.selectedLeaveType}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const availableDays = this.getAvailableDays(data);
              if (payload.formData.no_of_days > availableDays) {
                return from([
                  new NotProcessingFormLeaveApply(),
                  new ShowToast({title: 'Correct the following Errors', message: 'Number of Days requested is more than your current leave balance.', options: toastOptionsError()})
                ]);
              } else {
                return this.apiService.read(`${constants.LEAVE_URLs.getLeaveApplyDates}?leaveID=${payload.formData.leave_id}&startDate=${formatDate(payload.formData.start_date)}&numberOfDays=${payload.formData.no_of_days}&returnVal=0`).pipe(
                  mergeMap((data: IApiResult) => {
                    if (data.Success && data.Results) {
                      const leaveSubDetail = [];
                      console.log('Return Leave data', data);
                      this.store.pipe(select(leaveTypes))
                      .pipe(map(data => data.filter(val => val.leave_id === payload.formData.leave_id)))
                        .subscribe((result) => {
                          leaveSubDetail['leaveData'] = result[0];
                          leaveSubDetail['data'] = data.Results[0];
                            // this.store.dispatch(new ShowFullFormLeaveApply());
                            // this.store.dispatch(new LoadSubDetailLeaveApplySuccess(leaveSubDetail));
                            console.log('Leave SubDetails ', leaveSubDetail);
                          }
                        );
                      return from([
                        new NotProcessingFormLeaveApply(),
                        new LoadSubDetailLeaveApplySuccess(<any[]>leaveSubDetail),
                      ]);
                    } else {
                      return from([
                        new NotProcessingFormLeaveApply(),

                      ]);
                    }
                  }),
                  catchError((error: any) =>
                    from([
                      new NotProcessingFormLeaveApply(),
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                    ])
                  )
                );
              }
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingFormLeaveApply(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesLeaveApply>(LeaveApplyActionTypes.LOAD_LEAVE_APPLY_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesLeaveApplyReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesLeaveApply>(LeaveApplyActionTypes.LOAD_LEAVE_APPLY_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesLeaveApplyReady({ cityList: selectedState.CityList })
      )
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveApply>(LeaveApplyActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        tap(payload => console.log(payload)),
        switchMap(payload => {
          const url = this.getSaveUrl(payload.saveMode, payload.leaveData.leave_trans_id);
          return this.apiService
            .create(url, payload.leaveData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveApply(),
                    new HideEditorLeaveApply(),
                    new LoadAwaitingApprovalDataLeaveApply()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveApply(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveApply(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      loadApprovedData$: Observable<Action> = this.actions$
        .ofType<LoadApprovedDataLeaveApply>(LeaveApplyActionTypes.LOAD_APPROVED_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.LEAVE_URLs.approvedData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadApprovedDataLeaveApplySuccess(<ILeaveDailyData[]>(
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
        .ofType<LoadAwaitingApprovalDataLeaveApply>(LeaveApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.LEAVE_URLs.awaitingApprovalData)
              .pipe(
                map((data: any) => {
                  console.log(data);

                  if (data.Success && data.Results) {
                    return new LoadAwaitingApprovalDataLeaveApplySuccess(<ILeaveDailyData[]>(data.Results));
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()});
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
        loadInlineDocument$: Observable<Action> = this.actions$
          .ofType<LoadInlineDocumentLeaveApply>(LeaveApplyActionTypes.LOAD_INLINE_DOCUMENT)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              const url = payload.isApproved?`${constants.LEAVE_URLs}`: constants.LEAVE_URLs;
              return this.apiService
                .read(`${url}/${payload.recordId}`)
                  .pipe(
                    map((data: IApiResult) => {
                      if (data.Success) {
                        let docData = null;

                        if (data.Results && data.Results.length > 0) {
                          const result = data.Results[0];
                          docData = this.utilService.getDocumentData(result.data, result.extension);

                          return new Download(docData);
                        } else {
                          return new Download(null);
                        }
                      } else {
                        return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
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

        getAvailableDays(apiResult: IApiResult): number {
          const result: any = (<string[]>apiResult.Results)[0];
          const ar: string[] = result.split('|');

          return Number(ar[2]);
        }


}
