import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  SalaryReviewActionTypes,
  NotProcessingReview,
  NotLoadingReviews,

  LoadStatusListReviewGroups,
  LoadStatusListReviewGroupsSuccess,
  LoadReviewGroups,
  LoadReviewGroupsSuccess,
  ArchiveReviewGroup,
  ExecuteReviewGroup,
  ReverseReviewGroup,
  HideEditorReviewGroup,
  SaveReviewGroup,
  UpdateReviewGroup,

  LoadReviewPlans,
  LoadReviewPlansSuccess,
  HideEditorReviewPlan,
  SaveReviewPlan,
  UpdateReviewPlan,
  ArchiveReviewPlan,
  ExecuteReviewPlan,
  ReverseReviewPlan,
  LoadAllowanceRuleListReviewPlans,
  LoadAllowanceRuleListReviewPlansSuccess,
  LoadAllowanceAffectedListReviewPlans,
  LoadAllowanceAffectedListReviewPlansSuccess,
  LoadDeductionRuleListReviewPlans,
  LoadDeductionRuleListReviewPlansSuccess,
  LoadDeductionAffectedListReviewPlans,
  LoadDeductionAffectedListReviewPlansSuccess,
  LoadEligibilityRuleListReviewPlans,
  LoadEligibilityRuleListReviewPlansSuccess,
  LoadPayrollProfileListReviewPlans,
  LoadPayrollProfileListReviewPlansSuccess,
  LoadPaygroupListReviewPlans,
  LoadPaygroupListReviewPlansSuccess,
  LoadReviewRuleListReviewPlans,
  LoadReviewRuleListReviewPlansSuccess,

  SaveReviewPlanDetail,
  LoadReviewPlanDetails,
  HideEditorReviewPlanDetail,
  UpdateReviewPlanDetail,
  LoadReviewPlanDetailsSuccess,
  LoadItemTypeListReviewPlanDetailsSuccess,
  LoadItemTypeListReviewPlanDetails,
  LoadDeductionListReviewPlanDetails,
  LoadDeductionListReviewPlanDetailsSuccess,
  LoadAllowanceListReviewPlanDetails,
  LoadAllowanceListReviewPlanDetailsSuccess,

} from './salary-review.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../root/root.state';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class SalaryReviewEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }

  @Effect()
  loadReviewGroups$: Observable<Action> = this.actions$
    .ofType<LoadReviewGroups>(SalaryReviewActionTypes.LOAD_DATA)
      .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.groupData)
          .pipe(
            map((data: any) => {
              console.log('review groups data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingReviews());
                return new LoadReviewGroupsSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingReviews());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingReviews(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveGroupData$: Observable<Action> = this.actions$
    .ofType<SaveReviewGroup>(SalaryReviewActionTypes.SAVE_GROUP)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('review GROUP formdata', JSON.stringify(payload.data));
        return this.apiService
          .create(constants.SALARY_URLs.addGroup, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReview(),
                  new HideEditorReviewGroup(),
                  new LoadReviewGroups()
                ]);
              } else {
                return from([
                  new NotProcessingReview(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateGroupData$: Observable<Action> = this.actions$
    .ofType<UpdateReviewGroup>(SalaryReviewActionTypes.UPDATE_GROUP)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data update', JSON.stringify(payload.data));
        return this.apiService
          .update(`${constants.SALARY_URLs.updateGroup}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReview(),
                  new HideEditorReviewPlan(),
                  new LoadReviewGroups()
                ]);
              } else {
                return from([
                  new NotProcessingReview(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteGroupData$: Observable<Action> = this.actions$
    .ofType<ArchiveReviewGroup>(SalaryReviewActionTypes.DELETE_GROUP)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.deleteGroup}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewGroups()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  executeGroupData$: Observable<Action> = this.actions$
    .ofType<ExecuteReviewGroup>(SalaryReviewActionTypes.EXECUTE_GROUP)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.executeGroup}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was executed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewGroups()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Executed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not executed.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Executed', message: `Something went wrong. Record was not executed.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  reverseGroupData$: Observable<Action> = this.actions$
    .ofType<ReverseReviewGroup>(SalaryReviewActionTypes.REVERSE_GROUP)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.reverseGroup}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was reversed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewGroups()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Reversed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not reversed.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Reversed', message: `Something went wrong. Record was not reversed.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );




  @Effect()
  loadReviewPlans$: Observable<Action> = this.actions$
    .ofType<LoadReviewPlans>(SalaryReviewActionTypes.LOAD_PLAN_DATA)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SALARY_URLs.planData}/${payload.profileId}/${payload.groupId}`)
          .pipe(
            map((data: any) => {
              console.log('review plans data', data);
              if (data.Success) {
                  this.store.dispatch(new NotLoadingReviews());
                  return new LoadReviewPlansSuccess(data.Results);
              } else {
                  this.store.dispatch(new NotLoadingReviews());
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingReviews(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    savePlanData$: Observable<Action> = this.actions$
      .ofType<SaveReviewPlan>(SalaryReviewActionTypes.SAVE_PLAN)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('review plan formdata',JSON.stringify(payload.data));
          return this.apiService
            .create(constants.SALARY_URLs.addPlan, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingReview(),
                    new HideEditorReviewPlan(),
                    new LoadReviewPlans({groupId: payload.groupId, profileId: payload.profileId})
                  ]);
                } else {
                  return from([
                    new NotProcessingReview(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updatePlanData$: Observable<Action> = this.actions$
    .ofType<UpdateReviewPlan>(SalaryReviewActionTypes.UPDATE_PLAN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data update', JSON.stringify(payload.data));
        return this.apiService
          .update(`${constants.SALARY_URLs.updatePlan}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReview(),
                  new HideEditorReviewPlan(),
                  new LoadReviewPlans({ groupId: payload.groupId, profileId: payload.profileId })
                ]);
              } else {
                return from([
                  new NotProcessingReview(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  deletePlanData$: Observable<Action> = this.actions$
    .ofType<ArchiveReviewPlan>(SalaryReviewActionTypes.DELETE_PLAN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.deletePlan}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewPlans({ groupId: payload.groupId, profileId: payload.profileId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  executePlanData$: Observable<Action> = this.actions$
    .ofType<ExecuteReviewPlan>(SalaryReviewActionTypes.EXECUTE_PLAN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.executePlan}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was executed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewPlans({ groupId: payload.groupId, profileId: payload.profileId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Executed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not executed.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Executed', message: `Something went wrong. Record was not executed.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  reversePlanData$: Observable<Action> = this.actions$
    .ofType<ReverseReviewPlan>(SalaryReviewActionTypes.REVERSE_PLAN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SALARY_URLs.reversePlan}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was reversed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadReviewPlans({ groupId: payload.groupId, profileId: payload.profileId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Reversed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not reversed.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be reversed', message: `Something went wrong. Record was not reversed.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );







  @Effect()
  loadReviewPlanDetails$: Observable<Action> = this.actions$
    .ofType<LoadReviewPlanDetails>(SalaryReviewActionTypes.LOAD_DETAILS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SALARY_URLs.getPlanDetail}/${payload.planId}`)
          .pipe(
            map((data: any) => {
              console.log('review plans details data', data.Results);
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingReviews());
                return new LoadReviewPlanDetailsSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingReviews());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingReviews(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    savePlanDetail$: Observable<Action> = this.actions$
      .ofType<SaveReviewPlanDetail>(SalaryReviewActionTypes.SAVE_PLAN_DETAIL)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('review plan detail formdata',JSON.stringify(payload.data));
          return this.apiService
            .create(constants.SALARY_URLs.addPlanDetail, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingReview(),
                    new HideEditorReviewPlanDetail(),
                    new LoadReviewPlanDetails({planId: payload.data.salary_review_id})
                  ]);
                } else {
                  return from([
                    new NotProcessingReview(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updatePlanDetail$: Observable<Action> = this.actions$
    .ofType<UpdateReviewPlanDetail>(SalaryReviewActionTypes.UPDATE_PLAN_DETAIL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data PLAN DETAIL update', JSON.stringify(payload.data));
        return this.apiService
          .update(`${constants.SALARY_URLs.updatePlanDetail}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReview(),
                  new HideEditorReviewPlanDetail(),
                  new LoadReviewPlanDetails({ planId: payload.data.salary_review_id })
                ]);
              } else {
                return from([
                  new NotProcessingReview(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReview(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );






  @Effect()
  loadStatusList$: Observable<Action> = this.actions$
    .ofType<LoadStatusListReviewGroups>(SalaryReviewActionTypes.LOAD_STATUS_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.statusList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log('status list', data.Results);
                const transformed = this.utilService.transformToSelectDataList(data.Results, "id", "description");
                return new LoadStatusListReviewGroupsSuccess(transformed);
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileList$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListReviewPlans>(SalaryReviewActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.payrollProfileList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "payroll_profile_id", "description");
              if (data.Success && data.Results) {
                return new LoadPayrollProfileListReviewPlansSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadReviewRuleList$: Observable<Action> = this.actions$
    .ofType<LoadReviewRuleListReviewPlans>(SalaryReviewActionTypes.LOAD_REVIEW_RULE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.reviewRuleList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadReviewRuleListReviewPlansSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAllowanceAffectedList$: Observable<Action> = this.actions$
    .ofType<LoadAllowanceAffectedListReviewPlans>(SalaryReviewActionTypes.LOAD_ALLOWANCE_AFFECTED_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.allowanceAffectedList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('allowance affected data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadAllowanceAffectedListReviewPlansSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAllowanceRuleList$: Observable<Action> = this.actions$
    .ofType<LoadAllowanceRuleListReviewPlans>(SalaryReviewActionTypes.LOAD_ALLOWANCE_RULE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.allowanceRuleList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('allowance rule', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadAllowanceRuleListReviewPlansSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAllowanceList$: Observable<Action> = this.actions$
    .ofType<LoadAllowanceListReviewPlanDetails>(SalaryReviewActionTypes.LOAD_ALLOWANCE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.SALARY_URLs.allowanceList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "allowance_id", "description");
              if (data.Success && data.Results) {
                return new LoadAllowanceListReviewPlanDetailsSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
  );

  @Effect()
  loadDeductionList$: Observable<Action> = this.actions$
    .ofType<LoadDeductionListReviewPlanDetails>(SalaryReviewActionTypes.LOAD_DEDUCTION_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.deductionList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const deductions = this.utilService.transformToSelectDataList(data.Results, "deduction_id", "description");
              if (data.Success && data.Results) {
                return new LoadDeductionListReviewPlanDetailsSuccess(<ISelectOption[]>(
                  deductions
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadItemTypeList$: Observable<Action> = this.actions$
    .ofType<LoadItemTypeListReviewPlanDetails>(SalaryReviewActionTypes.LOAD_ITEM_TYPE_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.itemTypeList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const itemTypes = this.utilService.transformToSelectDataList(data.Results, "deduction_id", "description");
              if (data.Success && data.Results) {
                return new LoadItemTypeListReviewPlanDetailsSuccess(<ISelectOption[]>(
                  itemTypes
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadDeductionAffectedList$: Observable<Action> = this.actions$
    .ofType<LoadDeductionAffectedListReviewPlans>(SalaryReviewActionTypes.LOAD_DEDUCTION_AFFECTED_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.deductionAffectedList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const deductions = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadDeductionAffectedListReviewPlansSuccess(<ISelectOption[]>(
                  deductions
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadDeductionRuleList$: Observable<Action> = this.actions$
    .ofType<LoadDeductionRuleListReviewPlans>(SalaryReviewActionTypes.LOAD_DEDUCTION_RULE_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.deductionRuleList)
          .pipe(
            map((data: any) => {
              console.log('deduction rule data', data);
              const deductionRules = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadDeductionRuleListReviewPlansSuccess(<ISelectOption[]>(
                  deductionRules
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadEligibilityRuleList$: Observable<Action> = this.actions$
    .ofType<LoadEligibilityRuleListReviewPlans>(SalaryReviewActionTypes.LOAD_ELIGIBILITY_RULE_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.eligibilityRuleList)
          .pipe(
            map((data: any) => {
              console.log('deduction rule data', data);
              const deductions = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success && data.Results) {
                return new LoadEligibilityRuleListReviewPlansSuccess(<ISelectOption[]>(
                  deductions
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaygroupList$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListReviewPlans>(SalaryReviewActionTypes.LOAD_PAYGROUP_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SALARY_URLs.paygroupList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const paygroups = this.utilService.transformToSelectDataList(data.Results, "payrgroup_id", "description");
              if (data.Success && data.Results) {
                return new LoadPaygroupListReviewPlansSuccess(<ISelectOption[]>(
                  paygroups
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
}

