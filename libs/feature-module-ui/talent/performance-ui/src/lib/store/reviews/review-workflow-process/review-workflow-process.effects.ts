import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import { REVIEW_WORKFLOW_PROCESS_DATA_URLs } from '../../../constants';

import { RetrieveFirstWorkflowProcessStepReviewWorkflowProcess, ReviewWorkflowProcessActionTypes, LoadDataReviewWorkflowProcess, LoadDataReviewWorkflowProcessSuccess, NotLoadingDataReviewWorkflowProcess, InitializeAppraisalReviewWorkflowProcess, InitializeAppraisalByPlanIdReviewWorkflowProcess, ReappraiseReviewWorkflowProcess, ReRouteAppraisalWorkflowProcess, MutateResultReviewWorkflowProcess, RestartReviewWorkflowProcess, MoveToHRReviewWorkflowProcess, MoveToModerationReviewWorkflowProcess } from './review-workflow-process.actions';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { ClearDataAppraisalStatus, LoadDataAppraisalStatus } from '../appraisal-status';
import { RoleTypes } from '../../../enumerations';

@Injectable()
export class ReviewWorkflowProcessEffects {

  constructor(private actions$: Actions, private router: Router, private apiService: ApiService) {}

  @Effect()
  getFirstWorkflowProcessStep$: Observable<Action> = this.actions$.pipe(
    ofType<RetrieveFirstWorkflowProcessStepReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.RETRIEVE_FIRST_WORKFLOW_PROCESS_STEP),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.getData}/${payload.selectedPlan}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const results = <IReviewWorkflowProcess[]>(data.Results);
              const result = results.filter(result => result.step === 1).shift() ;

              const workflowProcessId = result?result.workflow_process_id:0;

              this.router.navigate([`${STANDARD_ROUTES.selfServiceAppraisalForms}/${workflowProcessId}`]);

              return from([]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadReviewWorkflowProcess$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.getData}/${payload}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IReviewWorkflowProcess[]>(data.Results);

              return from([
                new LoadDataReviewWorkflowProcessSuccess(result),
                new NotLoadingDataReviewWorkflowProcess()
              ]);
            } else {
              return from([
                new NotLoadingDataReviewWorkflowProcess()
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingDataReviewWorkflowProcess(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            ])
          )
        )
      }
    )
  );

  @Effect()
  initializeAppraisal$: Observable<Action> = this.actions$
    .ofType<InitializeAppraisalReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.INITIALIZE_APPRAISAL)
    .pipe(
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.initializeAppraisal}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `All employee appraisals have been initialized.`, type: ToastTypes.SUCCESS}),
                  new NotLoadingDataReviewWorkflowProcess(),
                  new ClearDataAppraisalStatus()
                ]);
              } else {
                return from([
                  new NotLoadingDataReviewWorkflowProcess(),
                  new ShowToast({title: 'Employee Appraisals Could Not Be Initialized', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisals could not be Initialized.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingDataReviewWorkflowProcess(),
                new ShowToast({title: 'Employee Appraisals Could Not Be Initialized', message: `Something went wrong. Employee Appraisals could not be Initialized.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  initializeAppraisalById$: Observable<Action> = this.actions$
    .ofType<InitializeAppraisalByPlanIdReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.INITIALIZE_APPRAISAL_BY_PLAN_ID)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.initializeAppraisal}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `All employee appraisals have been initialized.`, type: ToastTypes.SUCCESS}),
                  new NotLoadingDataReviewWorkflowProcess(),
                  new LoadDataAppraisalStatus(payload)
                ]);
              } else {
                return from([
                  new NotLoadingDataReviewWorkflowProcess(),
                  new ShowToast({title: 'Employee Appraisals Could Not Be Initialized', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisals could not be Initialized.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingDataReviewWorkflowProcess(),
                new ShowToast({title: 'Employee Appraisals Could Not Be Initialized', message: `Something went wrong. Employee Appraisals could not be Initialized.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  reappraise$: Observable<Action> = this.actions$
    .ofType<ReappraiseReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.REAPPRAISE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.reappraise}/${payload.employeeId}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Employee appraisal has been reset.`, type: ToastTypes.SUCCESS}),
                  new LoadDataAppraisalStatus(payload.planId)
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Employee Appraisal Could Not Be Reset', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisal could not be reset.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Employee Appraisals Could Not Be Reset', message: `Something went wrong. Employee Appraisal could not be reset.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  restart$: Observable<Action> = this.actions$
    .ofType<RestartReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.RESTART)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.restart}/${payload.employeeId}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Employee appraisal has been restarted.`, type: ToastTypes.SUCCESS}),
                  new LoadDataAppraisalStatus(payload.planId)
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Employee Appraisal Could Not Be Restarted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisal could not be restarted.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Employee Appraisals Could Not Be Restarted', message: `Something went wrong. Employee Appraisal could not be restarted.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  rerouteAppraisal$: Observable<Action> = this.actions$
    .ofType<ReRouteAppraisalWorkflowProcess>(ReviewWorkflowProcessActionTypes.RE_REROUTE_APPRAISAL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        let url = '';
        if (payload.role === RoleTypes.HR)  {
          url = `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.rerouteHR}`;
        } else if (payload.role === RoleTypes.MODERATION) {
          url = `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.rerouteModeration}`;
        } else if (payload.role ===  RoleTypes.REVIEWER_REVIEWING) {
          url = `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.rerouteReviewer}`;
        }

        const body = {
          employee_id : payload.employeeId,
          plan_id : payload.planId,
          reroute_from : payload.rerouteFrom,
          reroute_to : payload.rerouteTo
        }

        return this.apiService
          .create(url, body)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Employee appraisal has been re-routed.`, type: ToastTypes.SUCCESS}),
                  new NotLoadingDataReviewWorkflowProcess(),
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Employee Appraisal Could Not Be Re-routed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisal could not be re-routed.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Employee Appraisals Could Not Be Re-routed', message: `Something went wrong. Employee Appraisal could not be re-routed.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  moveToHR$: Observable<Action> = this.actions$
    .ofType<MoveToHRReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.MOVE_TO_HR)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.moveToHR}/${payload.employeeId}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Employee appraisal moved to HR.`, type: ToastTypes.SUCCESS}),
                  new LoadDataAppraisalStatus(payload.planId)
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Employee Appraisal Could Not Be Moved To HR', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisal could not be moved to HR.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Employee Appraisal Could Not Be Moved To HR', message: `Something went wrong. Employee Appraisal could not be moved to HR.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  moveToModeration$: Observable<Action> = this.actions$
    .ofType<MoveToModerationReviewWorkflowProcess>(ReviewWorkflowProcessActionTypes.MOVE_TO_MODERATION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.moveToModeration}/${payload.employeeId}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Employee appraisal moved to Moderation.`, type: ToastTypes.SUCCESS}),
                  new LoadDataAppraisalStatus(payload.planId)
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Employee Appraisal Could Not Be Moved To Moderation', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Employee Appraisal could not be moved to Moderation.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Employee Appraisal Could Not Be Moved To Moderation', message: `Something went wrong. Employee Appraisal could not be moved to Moderation.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );




}
