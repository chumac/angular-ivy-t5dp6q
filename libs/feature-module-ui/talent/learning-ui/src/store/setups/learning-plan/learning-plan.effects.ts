import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LearningPlanActionTypes,
  DeleteDataLearningPlan,
  LoadDataLearningPlan,
  LoadDataLearningPlanSuccess,
  NotProcessingLearningPlan,
  RemoveDataLearningPlan,
  EmployeeOptOutEvent,
  EnrollLearningLibrary,
  ApplyLearningLibrary,
  GotoDataLearningPlan,
  GotoDataLearningPlanSuccess,
  EditLearningPlan,
} from './learning-plan.actions';
import { ILearningPlan } from '@nutela/models/talent/learning';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class LearningPlanEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadLearningPlanData$: Observable<Action> = this.actions$
    .ofType<LoadDataLearningPlan>(LearningPlanActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const ApiUrl = this.getApiUrl(payload.recordId);
        return this.apiService
          .read(ApiUrl)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataLearningPlanSuccess(<ILearningPlan[]>(
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
  removeData$: Observable<Action> = this.actions$
    .ofType<RemoveDataLearningPlan>(LearningPlanActionTypes.REMOVE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.LEARNING_PLAN_URLs.removeLearningPlan}/${payload.recordId}`, payload.recordId)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was removed successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataLearningPlan({ recordId: payload.eventType })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Removed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not removed.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Removed', message: `Something went wrong. Record was not removed.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataLearningPlan>(LearningPlanActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LEARNING_PLAN_URLs.deleteLearningPlan}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataLearningPlan({ recordId: payload.eventType })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  optOutData$: Observable<Action> = this.actions$
    .ofType<EmployeeOptOutEvent>(LearningPlanActionTypes.EMPLOYEE_OPTOUT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.LEARNING_PLAN_URLs.employeeOptOut}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was opt out successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataLearningPlan({ recordId: payload.eventType })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Opt-out', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not Opt-out.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Opt-out', message: `Something went wrong. Record was not Opt-out.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  enrollLearningPlanData$: Observable<Action> = this.actions$
    .ofType<EnrollLearningLibrary>(LearningPlanActionTypes.CREATE_ENROLL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.LEARNING_LIBRARY_URLs.enrollLearningLibraryData}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was enrolled successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Enrolled', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not Enrolled.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Enrolled', message: `Something went wrong. Record was not enrolled.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  applyLearningPlanData$: Observable<Action> = this.actions$
    .ofType<ApplyLearningLibrary>(LearningPlanActionTypes.CREATE_APPLY)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.LEARNING_LIBRARY_URLs.applyLearningLibraryData}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was applied successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Applied', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not applied.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Applied', message: `Something went wrong. Record was not applied.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  editLearningPlanData$: Observable<Action> = this.actions$
    .ofType<EditLearningPlan>(LearningPlanActionTypes.EDIT_EVENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEARNING_LIBRARY_URLs.editLearningLibraryData}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was updated successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataLearningPlan({ recordId: 7 })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not updated.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be updated', message: `Something went wrong. Record was not updated.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadLearningPlanGoto$: Observable<Action> = this.actions$
    .ofType<GotoDataLearningPlan>(LearningPlanActionTypes.GOTO_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LEARNING_PLAN_URLs.getGotoLearningPlan}/${payload.code}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new GotoDataLearningPlanSuccess(<ILearningPlan[]>(
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


  getApiUrl(id) {
    switch (id) {
      case 1: {
        return constants.LEARNING_PLAN_URLs.getEventOngoing;
      }
      case 2: {
        return constants.LEARNING_PLAN_URLs.getEventUpComing;
      }
      case 3: {
        return constants.LEARNING_PLAN_URLs.getEventCompleted;
      }
      case 4: {
        return constants.LEARNING_PLAN_URLs.getEventRecommended;
      }
      case 5: {
        return constants.LEARNING_PLAN_URLs.getEventApplication;
      }
      case 6: {
        return constants.LEARNING_PLAN_URLs.getEventHistory;
      }
      case 7: {
        return constants.LEARNING_PLAN_URLs.getEventMyEvents;
      }
      default: {
        return constants.LEARNING_PLAN_URLs.getEventOngoing;
      }
    }
  }
}
