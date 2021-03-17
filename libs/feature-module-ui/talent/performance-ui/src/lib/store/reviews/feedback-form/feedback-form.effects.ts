import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import {
  ApiService,
  toastOptionsError,
  UtilService
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import { FEEDBACK_FORM_DATA_URLs } from '../../../constants';

import {
  IFeedbackMetadata,
  IFeedbackObjectiveMaster,
  IFeedbackObjectiveDetail,
  IFeedbackRating,
  IReviewWorkflowProcess
} from '@nutela/models/talent/performance';
import {
  FeedbackFormActionTypes,
  LoadEmployeeObjectiveMastersFeedbackForm,
  LoadEmployeeObjectiveMastersFeedbackFormSuccess,
  LoadEmployeeInfoFeedbackFormSuccess,
  LoadEmployeeObjectiveDetailsFeedbackForm,
  LoadEmployeeObjectiveDetailsFeedbackFormSuccess,
  SaveEmployeeObjectiveDetailsFeedbackForm,
  SaveEmployeeObjectiveDetailsFeedbackFormSuccess,
  SaveEmployeeObjectiveMastersFeedbackForm,
  SaveEmployeeObjectiveMastersFeedbackFormSuccess,
  isLoadingMastersFeedbackForm,
  isLoadingDetailsFeedbackForm,
  LoadRatingsFeedbackForm,
  LoadRatingsFeedbackFormSuccess,
  SubmitEmployeeObjectiveFeedbackForm,
  isSubmittingFeedbackForm,
  LoadLMTeamFeedbackForm,
  LoadLMTeamFeedbackFormSuccess,
  isLoadingTeamFeedbackForm,
  LoadLMObjectiveMastersFeedbackForm,
  LoadLMObjectiveMastersFeedbackFormSuccess,
  LoadLMObjectiveDetailsFeedbackForm,
  LoadLMObjectiveDetailsFeedbackFormSuccess,
  SaveLMObjectiveMastersFeedbackForm,
  SaveLMObjectiveDetailsFeedbackForm,
  SubmitLMObjectiveFeedbackForm,
  LoadEmployeeCanProvideFeedback,
  LoadEmployeeCanProvideFeedbackSuccess,
  StartEmployeeObjectiveFeedback,
  StartEmployeeObjectiveFeedbackSuccess,
  LoadHRTeamFeedbackForm,
  LoadHRTeamFeedbackFormSuccess,
  LoadHRObjectiveDetailsFeedbackForm,
  LoadHRObjectiveDetailsFeedbackFormSuccess,
  LoadHRObjectiveMastersFeedbackForm,
  LoadHRObjectiveMastersFeedbackFormSuccess,
  HRCloseSingleFeedbackForm,
  HRCloseMultipleFeedbackForm,
  HRInitiateFeedbackForm,
  NotProcessingFeedbackForm,
  LoadLMTeamCountFeedbackForm,
  LoadLMTeamCountFeedbackFormSuccess,
  LoadLMObjectiveDetailsAltFeedbackForm,
  LoadLMObjectiveDetailsAltFeedbackFormSuccess,
  LoadHREmployeeObjectiveDetailsFeedbackForm,
  LoadHREmployeeObjectiveDetailsFeedbackFormSuccess,
  LoadHRLineManagerObjectiveDetailsFeedbackForm,
  LoadHRLineManagerObjectiveDetailsFeedbackFormSuccess,
  isCompletingMastersFeedbackForm,
  isCompletingDetailsFeedbackForm
} from './feedback-form.actions';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { Router } from '@angular/router';

@Injectable()
export class FeedbackFormEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router
  ) {}

  @Effect()
  loadCanProvideFeedback$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeCanProvideFeedback>(
      FeedbackFormActionTypes.LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK
    ),
    switchMap(() => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_can_provide_feedback}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <boolean>data.Results[0];
              return from([new LoadEmployeeCanProvideFeedbackSuccess(result?true:false)]);
            } else {
              return from([
                new LoadEmployeeCanProvideFeedbackSuccess(false),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  startEmployeeFeedback$: Observable<Action> = this.actions$.pipe(
    ofType<StartEmployeeObjectiveFeedback>(
      FeedbackFormActionTypes.START_EMPLOYEE_FEEDBACK
    ),
    map(action=> action.payload),
    switchMap((payload) => {
      return this.apiService
        .read(
          `${FEEDBACK_FORM_DATA_URLs.start_employee_feedback}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new NotProcessingFeedbackForm(),
                new StartEmployeeObjectiveFeedbackSuccess(true),
              ]);
            } else {
              return from([
                new NotProcessingFeedbackForm(),
                new StartEmployeeObjectiveFeedbackSuccess(false),
                new ShowToast({
                  title: 'Feedback Could Not Be Started',
                  message:
                    'Something went wrong. Feedback could not be started. Contact Administrator.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingFeedbackForm(),
              new ShowToast({
                title: 'Feedback Could Not Be Started',
                message:
                  'Something went wrong. Feedback could not be started. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadEmployeeFeedbackObectiveMasters$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeObjectiveMastersFeedbackForm>(
      FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS
    ),
    switchMap(() => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_employee_objective_masters}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IFeedbackObjectiveMaster[]>data.Results;
              return from([
                new LoadEmployeeObjectiveMastersFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new LoadEmployeeObjectiveMastersFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadEmployeeFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeObjectiveDetailsFeedbackForm>(
      FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS
    ),
    switchMap(() => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_employee_objective_details}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IFeedbackObjectiveDetail[]>data.Results;
              return from([
                new LoadEmployeeObjectiveDetailsFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new LoadEmployeeObjectiveDetailsFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadFeedbackRatings$: Observable<Action> = this.actions$.pipe(
    ofType<LoadRatingsFeedbackForm>(
      FeedbackFormActionTypes.LOAD_FEEDBACK_RATINGS
    ),
    switchMap(() => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_feedback_ratings}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = this.utilService.transformToSelectDataList(
                data.Results,
                'id',
                'description'
              );
              return from([new LoadRatingsFeedbackFormSuccess(result)]);
            } else {
              return from([
                new LoadRatingsFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  saveEmployeeFeedbackObectiveMasters$: Observable<Action> = this.actions$.pipe(
    ofType<SaveEmployeeObjectiveMastersFeedbackForm>(
      FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.save_employee_objective_masters}?planID=${
            payload.planId
          }`,
          payload.values
        )
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new LoadEmployeeObjectiveMastersFeedbackForm(),
                new isLoadingMastersFeedbackForm(false),
                new isCompletingMastersFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new LoadEmployeeObjectiveMastersFeedbackForm(),
                new isLoadingMastersFeedbackForm(false),
                new isCompletingMastersFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be saved. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new isLoadingMastersFeedbackForm(false),
              new isCompletingMastersFeedbackForm(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  'Something went wrong. Form data could not be saved. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  saveEmployeeFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
    ofType<SaveEmployeeObjectiveDetailsFeedbackForm>(
      FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(`${FEEDBACK_FORM_DATA_URLs.save_employee_objective_details}`, payload.values)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new LoadEmployeeObjectiveDetailsFeedbackForm(),
                new isLoadingDetailsFeedbackForm(false),
                new isCompletingDetailsFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new LoadEmployeeObjectiveDetailsFeedbackForm(),
                new isLoadingDetailsFeedbackForm(false),
                new isCompletingDetailsFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be saved. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new isLoadingDetailsFeedbackForm(false),
              new isCompletingDetailsFeedbackForm(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  'Something went wrong. Form data could not be saved. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  submitEmployeeFeedbackObective$: Observable<Action> = this.actions$.pipe(
    ofType<SubmitEmployeeObjectiveFeedbackForm>(
      FeedbackFormActionTypes.SUBMIT_EMPLOYEE_FEEDBACK_OBJECTIVE
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.submit_employee_objective}/${payload}`,
          null
        )
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new LoadEmployeeObjectiveMastersFeedbackForm(),
                new LoadEmployeeObjectiveDetailsFeedbackForm(),
                new isSubmittingFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was submitted successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                // new LoadEmployeeObjectiveMastersFeedbackForm(),
                // new LoadEmployeeObjectiveDetailsFeedbackForm(),
                new isSubmittingFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Submitted',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be submitted. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Submitted',
                message:
                  'Something went wrong. Form data could not be submitted. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  // Line Manager Effects

  @Effect()
  loadLMTeamCountFeedback$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLMTeamCountFeedbackForm>(
      FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_COUNT
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_line_manager_team_count}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <number>data.Results[0];
              return from([
                new isLoadingTeamFeedbackForm(false),
                new LoadLMTeamCountFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new isLoadingTeamFeedbackForm(false),
                new LoadLMTeamCountFeedbackFormSuccess(null),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadLMTeamFeedback$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLMTeamFeedbackForm>(
      FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_line_manager_team}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IPersonal[]>data.Results;
              return from([
                new isLoadingTeamFeedbackForm(false),
                new LoadLMTeamFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new isLoadingTeamFeedbackForm(false),
                new LoadLMTeamFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadLMFeedbackObectiveMasters$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLMObjectiveMastersFeedbackForm>(
      FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_lm_objective_masters}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IFeedbackObjectiveMaster[]>data.Results;
              return from([
                new LoadLMObjectiveMastersFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new LoadLMObjectiveMastersFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadLMFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLMObjectiveDetailsFeedbackForm>(
      FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_lm_objective_details}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IFeedbackObjectiveDetail[]>data.Results;
              return from([
                new LoadLMObjectiveDetailsFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new LoadLMObjectiveDetailsFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  loadLMFeedbackObectiveDetailsAlt$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLMObjectiveDetailsAltFeedbackForm>(
      FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${FEEDBACK_FORM_DATA_URLs.load_lm_objective_details_alt}/${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IFeedbackObjectiveDetail[]>data.Results;
              return from([
                new LoadLMObjectiveDetailsAltFeedbackFormSuccess(result)
              ]);
            } else {
              return from([
                new LoadLMObjectiveDetailsAltFeedbackFormSuccess([]),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  saveLMFeedbackObectiveMasters$: Observable<Action> = this.actions$.pipe(
    ofType<SaveLMObjectiveMastersFeedbackForm>(
      FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_MASTERS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.save_lm_objective_masters}?planID=${
            payload.planId
          }&employeeID=${payload.employeeId}`,
          payload.values
        )
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new LoadLMObjectiveMastersFeedbackForm(payload.employeeId),
                new isLoadingMastersFeedbackForm(false),
                new isCompletingMastersFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new LoadLMObjectiveMastersFeedbackForm(payload.employeeId),
                new isLoadingMastersFeedbackForm(false),
                new isCompletingMastersFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be saved. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new isLoadingMastersFeedbackForm(false),
              new isCompletingMastersFeedbackForm(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  'Something went wrong. Form data could not be saved. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  saveLMFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
    ofType<SaveLMObjectiveDetailsFeedbackForm>(
      FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_DETAILS
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.save_lm_objective_details}`,
          payload.values
        )
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new LoadLMObjectiveDetailsFeedbackForm(payload.employeeId),
                new isLoadingDetailsFeedbackForm(false),
                new isCompletingDetailsFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new LoadLMObjectiveDetailsFeedbackForm(payload.employeeId),
                new isLoadingDetailsFeedbackForm(false),
                new isCompletingDetailsFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be saved. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new isLoadingDetailsFeedbackForm(false),
              new isCompletingDetailsFeedbackForm(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  'Something went wrong. Form data could not be saved. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

  @Effect()
  submitLMFeedbackObective$: Observable<Action> = this.actions$.pipe(
    ofType<SubmitLMObjectiveFeedbackForm>(
      FeedbackFormActionTypes.SUBMIT_LM_FEEDBACK_OBJECTIVE
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.submit_lm_objective}/${payload.planId}/${
            payload.employeeId
          }`,
          null
        )
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              this.router.navigate([`${STANDARD_ROUTES.teamReview}`]);
              return from([
                // new LoadLMObjectiveMastersFeedbackForm(payload.employeeId),
                // new LoadLMObjectiveDetailsFeedbackForm(payload.employeeId),
                new isSubmittingFeedbackForm(false),
                new ShowToast({
                  title: null,
                  message: `Your data was submitted successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                // new LoadLMObjectiveMastersFeedbackForm(payload.employeeId),
                // new LoadLMObjectiveDetailsFeedbackForm(payload.employeeId),
                new isSubmittingFeedbackForm(false),
                new ShowToast({
                  title: 'Data Could Not Be Submitted',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be submitted. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Submitted',
                message:
                  'Something went wrong. Form data could not be submitted. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

    // HR Effects

    @Effect()
    loadHRTeamFeedback$: Observable<Action> = this.actions$.pipe(
      ofType<LoadHRTeamFeedbackForm>(
        FeedbackFormActionTypes.LOAD_HR_FEEDBACK_TEAM
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${FEEDBACK_FORM_DATA_URLs.load_hr_team}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const result = <IReviewWorkflowProcess[]>data.Results;
                return from([
                  // new isLoadingTeamFeedbackForm(false),
                  new LoadHRTeamFeedbackFormSuccess(result)
                ]);
              } else {
                return from([
                  // new isLoadingTeamFeedbackForm(false),
                  new LoadHRTeamFeedbackFormSuccess([]),
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );

    @Effect()
    loadHRFeedbackObectiveMasters$: Observable<Action> = this.actions$.pipe(
      ofType<LoadHRObjectiveMastersFeedbackForm>(
        FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${FEEDBACK_FORM_DATA_URLs.load_hr_objective_masters}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const result = <IFeedbackObjectiveMaster[]>data.Results;
                return from([
                  new LoadHRObjectiveMastersFeedbackFormSuccess(result)
                ]);
              } else {
                return from([
                  new LoadHRObjectiveMastersFeedbackFormSuccess([]),
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );
  
    @Effect()
    loadHRFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
      ofType<LoadHRObjectiveDetailsFeedbackForm>(
        FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${FEEDBACK_FORM_DATA_URLs.load_hr_objective_details}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const result = <IFeedbackObjectiveDetail[]>data.Results;
                return from([
                  new LoadHRObjectiveDetailsFeedbackFormSuccess(result)
                ]);
              } else {
                return from([
                  new LoadHRObjectiveDetailsFeedbackFormSuccess([]),
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );


    @Effect()
    loadHREmployeeFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
      ofType<LoadHREmployeeObjectiveDetailsFeedbackForm>(
        FeedbackFormActionTypes.LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${FEEDBACK_FORM_DATA_URLs.load_hr_emp_objective_details}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const result = <IFeedbackObjectiveDetail[]>data.Results;
                return from([
                  new LoadHREmployeeObjectiveDetailsFeedbackFormSuccess(result)
                ]);
              } else {
                return from([
                  new LoadHREmployeeObjectiveDetailsFeedbackFormSuccess([]),
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );

    @Effect()
    loadHRLineManagerFeedbackObectiveDetails$: Observable<Action> = this.actions$.pipe(
      ofType<LoadHRLineManagerObjectiveDetailsFeedbackForm>(
        FeedbackFormActionTypes.LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${FEEDBACK_FORM_DATA_URLs.load_hr_lm_objective_details}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                const result = <IFeedbackObjectiveDetail[]>data.Results;
                return from([
                  new LoadHRLineManagerObjectiveDetailsFeedbackFormSuccess(result)
                ]);
              } else {
                return from([
                  new LoadHRLineManagerObjectiveDetailsFeedbackFormSuccess([]),
                  new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );

    // HR Effects
    @Effect()
    hrInitiateFeedbackForm$: Observable<Action> = this.actions$.pipe(
      ofType<HRInitiateFeedbackForm>(
        FeedbackFormActionTypes.HR_INITIATE_FEEDBACK_FORM
      ),
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${FEEDBACK_FORM_DATA_URLs.hr_initiate_feedback}/${payload.planId}`).pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new isSubmittingFeedbackForm(false),
                  new ShowToast({
                    title: null,
                    message: `Feed back data was initiated successfully.`,
                    type: ToastTypes.SUCCESS
                  })
                ]);
              } else {
                return from([
                  new isSubmittingFeedbackForm(false),
                  new ShowToast({
                    title: 'Data Could Not Be Initiated',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be initiated. Error occured.',
                    type: ToastTypes.ERROR
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Initiated',
                  message:
                    'Something went wrong. Form data could not be initiated. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );
    
  @Effect()
  hrCloseSingleFeedbackObective$: Observable<Action> = this.actions$.pipe(
    ofType<HRCloseSingleFeedbackForm>(
      FeedbackFormActionTypes.CLOSE_SINGLE_HR_FEEDBACK_OBJECTIVE
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.close_single_feedback_form}/${payload.planId}/${payload.employeeId}`, null).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new isSubmittingFeedbackForm(false),
                new LoadHRTeamFeedbackForm(payload.planId),
                new ShowToast({
                  title: null,
                  message: `Feed back data was closed successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new isSubmittingFeedbackForm(false),
                new LoadHRTeamFeedbackForm(payload.planId),
                new ShowToast({
                  title: 'Data Could Not Be Closed',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be closed. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Closed',
                message:
                  'Something went wrong. Form data could not be closed. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );

      
  @Effect()
  hrCloseMultipleFeedbackObective$: Observable<Action> = this.actions$.pipe(
    ofType<HRCloseMultipleFeedbackForm>(
      FeedbackFormActionTypes.CLOSE_MULTIPLE_HR_FEEDBACK_OBJECTIVE
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .update(
          `${FEEDBACK_FORM_DATA_URLs.close_multiple_feedback_form}/${payload.planId}`, payload.employeeIds).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new isSubmittingFeedbackForm(false),
                new LoadHRTeamFeedbackForm(payload.planId),
                new ShowToast({
                  title: null,
                  message: `Feed back data was closed successfully.`,
                  type: ToastTypes.SUCCESS
                })
              ]);
            } else {
              return from([
                new isSubmittingFeedbackForm(false),
                new LoadHRTeamFeedbackForm(payload.planId),
                new ShowToast({
                  title: 'Data Could Not Be Closed',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : 'Something went wrong. Form data could not be closed. Error occured.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Closed',
                message:
                  'Something went wrong. Form data could not be closed. Error occured.',
                type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );
}
