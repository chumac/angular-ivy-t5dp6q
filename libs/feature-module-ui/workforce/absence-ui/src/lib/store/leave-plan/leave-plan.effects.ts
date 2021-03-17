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
import { LeavePlanActionTypes, NotProcessingLeavePlan, SaveLeavePlan, HideEditorLeavePlan, LoadApprovedDataLeavePlan, LoadApprovedDataLeavePlanSuccess, LoadAwaitingApprovalDataLeavePlan, LoadAwaitingApprovalDataLeavePlanSuccess, LoadStatesLeavePlan, LoadStatesLeavePlanReady, LoadCitiesLeavePlan, LoadCitiesLeavePlanReady, LoadLeavePlanIdentity, LoadLeavePlanIdentitySuccess, AddLeavePlan, AddDetailLeavePlan, SaveDetailLeavePlan, DeleteDetailLeavePlan, DeletePlanLeavePlan, HideDetailEditorLeavePlan, LoadLeavePlanType, LoadLeavePlanTypeSuccess, CancelLeavePlan, ReviewLeavePlan } from './leave-plan.actions';
import { ILeaveDailyData, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class LeavePlanEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadLeavePlanIdentity$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLeavePlanIdentity>(LeavePlanActionTypes.LOAD_LEAVE_PLAN_IDENTITY),
    map(action => action),
    switchMap(() => {
      return this.apiService.create(`${constants.LEAVE_PLAN_URLs.getPlanLeaveIdentity}`, null).pipe(
        switchMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            return from([
              new LoadLeavePlanIdentitySuccess({ leavePlanId: data.Results[0] }),
              new NotProcessingLeavePlan(),
            ]);
          } else {
            return from([
              new LoadLeavePlanIdentitySuccess({ leavePlanId: null }),
              new NotProcessingLeavePlan(),
              new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :  'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
            ]);
          }
        }),
        catchError((error: any) =>
          from([
            new NotProcessingLeavePlan(),
            new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
          ])
        )
      )
    }
    )
  );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddLeavePlan>(LeavePlanActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.LEAVE_PLAN_URLs.addPlanApply, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveLeavePlan>(LeavePlanActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_PLAN_URLs.savePlanApply}/${payload.leavePlanId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  addDetailsData$: Observable<Action> = this.actions$
    .ofType<AddDetailLeavePlan>(LeavePlanActionTypes.ADD_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.LEAVE_PLAN_URLs.addPlanDetail, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideDetailEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveDetailsData$: Observable<Action> = this.actions$
    .ofType<SaveDetailLeavePlan>(LeavePlanActionTypes.SAVE_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_PLAN_URLs.savePlanDetail}/${payload.recordId}`, payload.leaveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideDetailEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteDetailsData$: Observable<Action> = this.actions$
    .ofType<DeleteDetailLeavePlan>(LeavePlanActionTypes.DELETE_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LEAVE_PLAN_URLs.deletePlanDetail}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deletePlanData$: Observable<Action> = this.actions$
    .ofType<DeletePlanLeavePlan>(LeavePlanActionTypes.DELETE_PLAN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_PLAN_URLs.deletePlan}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeavePlan(),
                  new HideEditorLeavePlan(),
                  new LoadApprovedDataLeavePlan(),
                  new LoadAwaitingApprovalDataLeavePlan()
                ]);
              } else {
                return from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeavePlan(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataLeavePlan>(LeavePlanActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_PLAN_URLs.planSubmitted)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataLeavePlanSuccess(<ILeaveDailyData[]>(
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
    .ofType<LoadAwaitingApprovalDataLeavePlan>(LeavePlanActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_PLAN_URLs.planPendingSubmit)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataLeavePlanSuccess(<ILeaveDailyData[]>(data.Results));
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
    .ofType<LoadLeavePlanType>(LeavePlanActionTypes.LOAD_LEAVE_PLAN_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_PLAN_URLs.leavePlanTypes)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                // const resultset = this.utilService.transformToSelectDataList(data.Results, 'leave_id', 'description');
                return new LoadLeavePlanTypeSuccess({ leavePlanType: data.Results });
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
    .ofType<LoadStatesLeavePlan>(LeavePlanActionTypes.LOAD_LEAVE_APPLY_STATES)
    .pipe(
      map(action => action.payload.selectedCountry),
      map(
        selectedCountry =>
          new LoadStatesLeavePlanReady({ stateList: selectedCountry.StatesList })
      )
    );

  @Effect()
  loadCities$: Observable<Action> = this.actions$
    .ofType<LoadCitiesLeavePlan>(LeavePlanActionTypes.LOAD_LEAVE_APPLY_CITIES)
    .pipe(
      map(action => action.payload.selectedState),
      map(
        selectedState =>
          new LoadCitiesLeavePlanReady({ cityList: selectedState.CityList })
      )
    );

    @Effect()
    cancelPlanData$: Observable<Action> = this.actions$
      .ofType<CancelLeavePlan>(LeavePlanActionTypes.CANCEL)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.LEAVE_PLAN_URLs.cancelPlan}/${payload.leavePlanId}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Leave plan was cancelled successfully.`, options: toastOptionsSuccess() }),
                    new NotProcessingLeavePlan(),
                    new HideEditorLeavePlan(),
                    new LoadApprovedDataLeavePlan(),
                    new LoadAwaitingApprovalDataLeavePlan()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeavePlan(),
                    new ShowToast({ title: 'Leave Plan Could Not Be Cancelled', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeavePlan(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                ])
              )
            );
        })
      );

      @Effect()
      reviewPlanData$: Observable<Action> = this.actions$
        .ofType<ReviewLeavePlan>(LeavePlanActionTypes.REVIEW)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .read(`${constants.LEAVE_PLAN_URLs.reviewPlan}/${payload.leavePlanId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({ title: null, message: `Request to review leave plan was successfully.`, options: toastOptionsSuccess() }),
                      new NotProcessingLeavePlan(),
                      new HideEditorLeavePlan(),
                      new LoadApprovedDataLeavePlan(),
                      new LoadAwaitingApprovalDataLeavePlan()
                    ]);
                  } else {
                    return from([
                      new NotProcessingLeavePlan(),
                      new ShowToast({ title: 'Leave Plan Review Could Not Be Initiated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new NotProcessingLeavePlan(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                  ])
                )
              );
          })
        );


}
