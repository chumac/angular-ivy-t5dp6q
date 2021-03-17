import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, formatDate } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { LoadEntitlementLeaveProxyApply, LeaveProxyApplyActionTypes, NotProcessingLeaveProxyApply, LoadEntitlementLeaveProxyApplySuccess, LoadStatesLeaveProxyApply, LoadStatesLeaveProxyApplyReady, LoadCitiesLeaveProxyApply, LoadCitiesLeaveProxyApplyReady, SaveLeaveProxyApply, HideEditorLeaveProxyApply, LoadApprovedDataLeaveProxyApply, LoadApprovedDataLeaveProxyApplySuccess, LoadAwaitingApprovalDataLeaveProxyApply, LoadAwaitingApprovalDataLeaveProxyApplySuccess, NotProcessingFormLeaveProxyApply, LoadSubDetailLeaveProxyApply, LoadSubDetailLeaveProxyApplySuccess, LoadInlineDocumentLeaveProxyApply, InvalidateLeaveProxyApply, SaveLeaveProxyReset, HideEditorLeaveProxyReset, DeleteLeaveProxyApply, NotLoadingLeaveProxyApply } from './leave-proxy-apply.actions';
import { ILeaveEntitlement, ILeaveDailyData, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { IPerformanceState } from '@nutela/feature-module-ui/talent/performance-ui';
import { leaveTypes } from '@nutela/store/modules/foundation';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class LeaveProxyApplyEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IPerformanceState>, private utilService: UtilService) {}

  @Effect()
  loadLeaveEntitlement$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEntitlementLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_LEAVE_ENTITLEMENT),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${constants.LEAVE_URLs.getProxyLeaveEntitlement}?employeeID=${payload.employeeId}&id=${payload.selectedLeaveType.value}`).pipe(
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
                new LoadEntitlementLeaveProxyApplySuccess({leaveEntitlement: leaveEntitlement}),
                new NotProcessingFormLeaveProxyApply(),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingFormLeaveProxyApply(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadSubDetail$: Observable<Action> = this.actions$.pipe(
    ofType<LoadSubDetailLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_LEAVE_SUBDETAIL),
    map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.LEAVE_URLs.getleaveEntitlement}?id=${payload.selectedLeaveType}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const availableDays = this.getAvailableDays(data);
              if (payload.formData.no_of_days > availableDays) {
                return from([
                  new NotProcessingFormLeaveProxyApply(),
                  new ShowToast({title: 'Correct the following Errors', message: 'Number of Days requested is more than your current leave balance.', type: ToastTypes.ERROR})
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
                            // this.store.dispatch(new ShowFullFormLeaveProxyApply());
                            // this.store.dispatch(new LoadSubDetailLeaveProxyApplySuccess(leaveSubDetail));
                            console.log('Leave SubDetails ', leaveSubDetail);
                          }
                        );
                      return from([
                        new NotProcessingFormLeaveProxyApply(),
                        new LoadSubDetailLeaveProxyApplySuccess(<any[]>leaveSubDetail),
                      ]);
                    } else {
                      return from([
                        new NotProcessingFormLeaveProxyApply(),

                      ]);
                    }
                  }),
                  catchError((error: any) =>
                    from([
                      new NotProcessingFormLeaveProxyApply(),
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
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
              new NotProcessingFormLeaveProxyApply(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesLeaveProxyApplyReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesLeaveProxyApplyReady({ cityList: selectedState.CityList })
      )
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveProxyApply>(LeaveProxyApplyActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        tap(payload => console.log(payload)),
        switchMap(payload => {
          const url = this.getSaveUrl(payload.saveMode, payload.leaveData.leave_trans_id);
          return this.apiService
            .create(`${constants.LEAVE_URLs.saveProxyApply}`, payload.leaveData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingLeaveProxyApply(),
                    new HideEditorLeaveProxyApply(),
                    // new LoadAwaitingApprovalDataLeaveProxyApply()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveProxyApply(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveProxyApply(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

    @Effect()
    saveResetData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveProxyReset>(LeaveProxyApplyActionTypes.SAVE_RESET)
      .pipe(
        map(action => action.payload),
        tap(payload => console.log(payload)),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.LEAVE_URLs.saveProxyReset}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingLeaveProxyApply(),
                    new HideEditorLeaveProxyReset(),
                    // new LoadAwaitingApprovalDataLeaveProxyApply()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveProxyApply(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveProxyApply(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

    @Effect()
    deleteLeave$: Observable<Action> = this.actions$
      .ofType<DeleteLeaveProxyApply>(LeaveProxyApplyActionTypes.DELETE_LEAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .delete(`${constants.LEAVE_URLs.deleteProxyApply}/${payload.leaveTransId}/${payload.employeeId}`)
            .pipe(
              switchMap((data: any) => {
                if (data.Success) {
                  return from([
                    new NotLoadingLeaveProxyApply(),
                    new LoadApprovedDataLeaveProxyApply({employeeId: payload.employeeId}),
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    // new LoadAwaitingApprovalDataLeaveProxyApply()
                  ]);
                } else {
                  return from([
                    new NotLoadingLeaveProxyApply(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotLoadingLeaveProxyApply(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      loadApprovedData$: Observable<Action> = this.actions$
        .ofType<LoadApprovedDataLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_APPROVED_DATA)
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.LEAVE_URLs.approvedProxyData}/${payload.employeeId}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadApprovedDataLeaveProxyApplySuccess(<ILeaveDailyData[]>(
                      data.Results
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
      loadAwaitingApprovalData$: Observable<Action> = this.actions$
        .ofType<LoadAwaitingApprovalDataLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA)
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.LEAVE_URLs.awaitingApprovalProxyData}/${payload.employeeId}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return new LoadAwaitingApprovalDataLeaveProxyApplySuccess(<ILeaveDailyData[]>(data.Results));
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
        loadInlineDocument$: Observable<Action> = this.actions$
          .ofType<LoadInlineDocumentLeaveProxyApply>(LeaveProxyApplyActionTypes.LOAD_INLINE_DOCUMENT)
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
                        return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                      )
                    )
                  );
            })
          );

          @Effect()
          invalidateData$: Observable<Action> = this.actions$
            .ofType<InvalidateLeaveProxyApply>(LeaveProxyApplyActionTypes.INVALIDATE)
            .pipe(
              map(action => action.payload),
              switchMap(payload => {
                return this.apiService
                  .delete(`${constants.LEAVE_URLs.invalidateLeave}/${payload.recordId}`)
                  .pipe(
                    switchMap((data: IApiResult) => {
                      if (data.Success) {
                        return from([
                          new ShowToast({title: null, message: `Leave Apllication was invalidated successfully.`, type: ToastTypes.SUCCESS}),
                          new NotProcessingLeaveProxyApply(),
                          new LoadApprovedDataLeaveProxyApply({ employeeId: payload.employeeId }),
                          new LoadAwaitingApprovalDataLeaveProxyApply({ employeeId: payload.employeeId })
                        ]);
                      } else {
                        return from([
                          new NotProcessingLeaveProxyApply(),
                          new ShowToast({title: 'Record Could Not Be Invalidated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                        ]);
                      }
                    }),
                    catchError((error: any) =>
                      from([
                        new NotProcessingLeaveProxyApply(),
                        new ShowToast({title: 'Record Could Not Be Invalidated', message: error, type: ToastTypes.ERROR})
                      ])
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
