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
import { LeaveStaggeredActionTypes, NotProcessingLeaveStaggered, SaveLeaveStaggered, HideEditorLeaveStaggered, LoadApprovedDataLeaveStaggered, LoadApprovedDataLeaveStaggeredSuccess, LoadAwaitingApprovalDataLeaveStaggered, LoadAwaitingApprovalDataLeaveStaggeredSuccess, LoadStatesLeaveStaggered, LoadStatesLeaveStaggeredReady, LoadCitiesLeaveStaggered, LoadCitiesLeaveStaggeredReady, LoadLeaveStaggeredIdentity, LoadLeaveStaggeredIdentitySuccess, AddLeaveStaggered, AddDetailLeaveStaggered, SaveDetailLeaveStaggered, DeleteDetailLeaveStaggered, DeleteMasterLeaveStaggered, LoadLeaveStaggeredCurrencyList, LoadLeaveStaggeredCurrencyListSuccess, HideDetailEditorLeaveStaggered, LoadLeaveStaggeredType, LoadLeaveStaggeredTypeSuccess, CancelLeaveStaggered, ReviewLeaveStaggered } from './leave-staggered.actions';
import { ILeaveDailyData, LeaveDailyModes } from '@nutela/models/workforce/leave';

@Injectable()
export class LeaveStaggeredEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadLeaveStaggeredIdentity$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLeaveStaggeredIdentity>(LeaveStaggeredActionTypes.LOAD_LEAVE_IDENTITY),
    map(action => action),
    switchMap(() => {
      return this.apiService.create(`${constants.LEAVE_STAGGERED_URLs.getIdentity}`, null).pipe(
        switchMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            return from([
              new LoadLeaveStaggeredIdentitySuccess({ leaveStaggeredId: data.Results[0] }),
              new NotProcessingLeaveStaggered(),
            ]);
          } else {
            return from([]);
          }
        }),
        catchError((error: any) =>
          from([
            new NotProcessingLeaveStaggered(),
            new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
          ])
        )
      )
    }
    )
  );

  @Effect()
  loadLeaveStaggeredCurrencyList$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLeaveStaggeredCurrencyList>(LeaveStaggeredActionTypes.LOAD_CURRENCY_LIST),
    switchMap(() => {
      return this.apiService.read(`${constants.LEAVE_STAGGERED_URLs.getCurrencyList}`).pipe(
        switchMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            const currencyList = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');

            return from([
              new LoadLeaveStaggeredCurrencyListSuccess({ currencyList: currencyList}),
              new NotProcessingLeaveStaggered(),
            ]);
          } else {
            return from([]);
          }
        }),
        catchError((error: any) =>
          from([
            new NotProcessingLeaveStaggered(),
            new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
          ])
        )
      )
    }
    )
  );


  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddLeaveStaggered>(LeaveStaggeredActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.LEAVE_STAGGERED_URLs.add, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveLeaveStaggered>(LeaveStaggeredActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_STAGGERED_URLs.save}/${payload.staggeredLeaveId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) { 
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  addDetailsData$: Observable<Action> = this.actions$
    .ofType<AddDetailLeaveStaggered>(LeaveStaggeredActionTypes.ADD_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.LEAVE_STAGGERED_URLs.addDetail, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideDetailEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveDetailsData$: Observable<Action> = this.actions$
    .ofType<SaveDetailLeaveStaggered>(LeaveStaggeredActionTypes.SAVE_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_STAGGERED_URLs.saveDetail}/${payload.recordId}`, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideDetailEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteDetailsData$: Observable<Action> = this.actions$
    .ofType<DeleteDetailLeaveStaggered>(LeaveStaggeredActionTypes.DELETE_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LEAVE_STAGGERED_URLs.deleteDetail}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deletePlanData$: Observable<Action> = this.actions$
    .ofType<DeleteMasterLeaveStaggered>(LeaveStaggeredActionTypes.DELETE_MASTER)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_STAGGERED_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveStaggered(),
                  new HideEditorLeaveStaggered(),
                  new LoadApprovedDataLeaveStaggered(),
                  new LoadAwaitingApprovalDataLeaveStaggered()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveStaggered(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataLeaveStaggered>(LeaveStaggeredActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_STAGGERED_URLs.ApprovedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataLeaveStaggeredSuccess(<ILeaveDailyData[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataLeaveStaggered>(LeaveStaggeredActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_STAGGERED_URLs.AwaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataLeaveStaggeredSuccess(<ILeaveDailyData[]>(data.Results));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

    @Effect()
    loadLeaveTypeData$: Observable<Action> = this.actions$
      .ofType<LoadLeaveStaggeredType>(LeaveStaggeredActionTypes.LOAD_LEAVE_STAGGERED_TYPE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.LEAVE_STAGGERED_URLs.staggeredLeaveTypes)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  // const resultset = this.utilService.transformToSelectDataList(data.Results, 'leave_id', 'description');
                  return new LoadLeaveStaggeredTypeSuccess({ leaveType: data.Results });
                } else {
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );

  @Effect()
  loadStates$: Observable<Action> = this.actions$
    .ofType<LoadStatesLeaveStaggered>(LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesLeaveStaggeredReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesLeaveStaggered>(LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesLeaveStaggeredReady({ cityList: selectedState.CityList })
      )
    );

    @Effect()
    cancelStaggeredData$: Observable<Action> = this.actions$
      .ofType<CancelLeaveStaggered>(LeaveStaggeredActionTypes.CANCEL)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.LEAVE_STAGGERED_URLs.cancel}/${payload.leaveStaggeredId}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Staggered Leave was cancelled successfully.`, options: toastOptionsSuccess() }),
                    new NotProcessingLeaveStaggered(),
                    new HideEditorLeaveStaggered(),
                    new LoadApprovedDataLeaveStaggered(),
                    new LoadAwaitingApprovalDataLeaveStaggered()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveStaggered(),
                    new ShowToast({ title: 'Staggered Leave Could Not Be Cancelled', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveStaggered(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                ])
              )
            );
        })
      );

      @Effect()
      reviewStaggeredData$: Observable<Action> = this.actions$
        .ofType<ReviewLeaveStaggered>(LeaveStaggeredActionTypes.REVIEW)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.LEAVE_STAGGERED_URLs.review}/${payload.leaveStaggeredId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({ title: null, message: `Request to review staggered leave was successfully.`, options: toastOptionsSuccess() }),
                      new NotProcessingLeaveStaggered(),
                      new HideEditorLeaveStaggered(),
                      new LoadApprovedDataLeaveStaggered(),
                      new LoadAwaitingApprovalDataLeaveStaggered()
                    ]);
                  } else {
                    return from([
                      new NotProcessingLeaveStaggered(),
                      new ShowToast({ title: 'Leave Review Could Not Be Initiated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new NotProcessingLeaveStaggered(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                  ])
                )
              );
          })
        );

}
