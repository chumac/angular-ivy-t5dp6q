import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

import { APPRAISAL_FORMS_DATA_URLs } from '../../../constants';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IEmployeePageScore } from '@nutela/models/talent/performance';
import { AppraisalFormsActionTypes, LoadEmployeeReviewFormsAppraisalForms, LoadEmployeeReviewFormsAppraisalFormsSuccess, LoadPageNavigatorAppraisalForms, LoadReviewWorkflowProcessAppraisalForms, LoadReviewWorkflowProcessAppraisalFormsSuccess, LoadEmployeeInformationReportKeyAppraisalForms, LoadEmployeePageScoresAppraisalForms, LoadEmployeePageScoresAppraisalFormsSuccess, ReLoadPageNavigatorAppraisalForms, LoadEmployeeConfirmationStatusAppraisalForms, LoadEmployeeConfirmationStatusAppraisalFormsSuccess } from './appraisal-forms.actions';
import { IPageNavigatorData } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class AppraisalFormsEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadEmployeeReviewForms$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeReviewFormsAppraisalForms>(AppraisalFormsActionTypes.LOAD_EMPLOYEE_REVIEW_FORMS),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(this.getReviewFormsUrl(payload.role, payload.selectedPlan, payload.employeeId)).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const employeeReviewForms = <IEmployeeReviewForm[]>(data.Results);

              // console.log('employeeReviewForms', employeeReviewForms);

              return from([
                new LoadEmployeeReviewFormsAppraisalFormsSuccess(employeeReviewForms),
                new LoadPageNavigatorAppraisalForms(this.getPageNavigatorList(employeeReviewForms))
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );

  getReviewFormsUrl(roleType: number, planId: number, employeeId: number): string {
    switch (roleType) {
      case RoleTypes.EMPLOYEE:
        return `${APPRAISAL_FORMS_DATA_URLs.getEmployeeReviewForms}/${planId}`;
      case RoleTypes.LINE_MANAGER:
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return `${APPRAISAL_FORMS_DATA_URLs.getAcceptRejectReviewForms}/${planId}`;
      case RoleTypes.REVIEWER_ASSESSING:
        return `${APPRAISAL_FORMS_DATA_URLs.getLineManagerTwoReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.REVIEWER_REVIEWING:
        return `${APPRAISAL_FORMS_DATA_URLs.getReviewerReviewForms}/${employeeId}/${planId}`;
      case RoleTypes.MODERATION:
        return `${APPRAISAL_FORMS_DATA_URLs.getModerationReviewForms}/${planId}/${employeeId}`;
      case RoleTypes.HR:
        return `${APPRAISAL_FORMS_DATA_URLs.getHRReviewForms}/${planId}/${employeeId}`;
    }
  }

  getPageNavigatorList(employeeReviewForms: IEmployeeReviewForm[]): IPageNavigatorData[] {
    let list: IPageNavigatorData[] = [];

    for (let item of employeeReviewForms) {
      if (item.AssetInfo) {
        let data = {
          id: item.id,
          description: item.AssetInfo.description,
          title: item.AssetInfo.title,
          subTitle: item.AssetInfo.sub_title,
          assetType: item.AssetInfo.asset_type,
          status: item.status,
          role: item.reviewer_role
        };

        list.push(data);
      }
    }

    return list;
  }

  @Effect()
  loadReviewWorkflowProcess$: Observable<Action> = this.actions$.pipe(
    ofType<LoadReviewWorkflowProcessAppraisalForms>(AppraisalFormsActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${APPRAISAL_FORMS_DATA_URLs.getReviewWorkflowProcessItem}/${payload}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IReviewWorkflowProcess>(data.Results[0]);

              // console.log('IReviewWorkflowProcess', result);
              // console.log('payload', payload);

              // console.log('getReviewWorkflowProcessItem url', `${APPRAISAL_FORMS_DATA_URLs.getReviewWorkflowProcessItem}/${payload}`);

              // console.log('LoadReviewWorkflowProcessAppraisalForms', data);

              return from([
                new LoadReviewWorkflowProcessAppraisalFormsSuccess(result)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );

  @Effect()
  loadEmployeeInformationReportKey$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeInformationReportKeyAppraisalForms>(AppraisalFormsActionTypes.LOAD_EMPLOYEE_INFORMATION_REPORT_KEY),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${APPRAISAL_FORMS_DATA_URLs.getEmployeeInformationReportKey}/${payload}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              return from([
                new ShowToast({
                  title: null,
                  message: 'Loading report ...',
                  type: ToastTypes.INFO
                }),
                new Download(data.Results[0])
              ]);
            } else {
              return from([
                new ShowToast({
                  title: null,
                  message: 'Report not available.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Report Could Not Be Loaded',
                message:
                  'Something went wrong. Report data could not be loaded.',
                type: ToastTypes.ERROR
              })
            )
          )
        )
      }
    )
  );






  @Effect()
  loadEmployeePageScores$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeePageScoresAppraisalForms>(AppraisalFormsActionTypes.LOAD_EMPLOYEE_PAGE_SCORES),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(this.getEmployeePageScoresUrl(payload.role, payload.selectedPlan, payload.employeeId, payload.roleScoreRequired)).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const employeePageScores = <IEmployeePageScore[]>(data.Results);

              console.log('employeePageScores', employeePageScores);

              return from([
                new LoadEmployeePageScoresAppraisalFormsSuccess(employeePageScores)
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );



  @Effect()
  reloadEmployeeReviewFormsForNavigation$: Observable<Action> = this.actions$.pipe(
    ofType<ReLoadPageNavigatorAppraisalForms>(AppraisalFormsActionTypes.RELOAD_PAGE_NAVIGATOR_LIST),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(this.getReviewFormsUrl(payload.role, payload.selectedPlan, payload.employeeId)).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const employeeReviewForms = <IEmployeeReviewForm[]>(data.Results);

              // console.log('employeeReviewForms', employeeReviewForms);

              return from([
                new LoadPageNavigatorAppraisalForms(this.getPageNavigatorList(employeeReviewForms))
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );



  @Effect()
  loadEmployeeConfirmationStatus$: Observable<Action> = this.actions$.pipe(
    ofType<LoadEmployeeConfirmationStatusAppraisalForms>(AppraisalFormsActionTypes.LOAD_EMPLOYEE_CONFIRMATION_STATUS),
    map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${APPRAISAL_FORMS_DATA_URLs.getEmployeeConfirmationStatus}/${payload.selectedPlan}/${payload.employeeId}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const confirmationStatus = (data.Results.length > 0)?data.Results[0].key:null;
              return from([
                new LoadEmployeeConfirmationStatusAppraisalFormsSuccess(confirmationStatus),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
            ])
          )
        )
      }
    )
  );



  getEmployeePageScoresUrl(roleType: number, planId: number, employeeId: number, roleScoreRequired: number): string {
    return `${APPRAISAL_FORMS_DATA_URLs.getEmployeePageScore}/${employeeId}/${planId}/${roleType}/${roleScoreRequired}`;
  }
}
