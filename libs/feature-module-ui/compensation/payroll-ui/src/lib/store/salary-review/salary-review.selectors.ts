import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISalaryReviewState } from './salary-review.state';
import { IRootState } from '../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getSalaryState = createSelector(getState, (state: IRootState) => state.salary);

export const getReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.plansData
);

export const getReviewGroups = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.data
);

export const getReviewPlanDetails = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.detailData
);

export const getReviewGroupsFiltered = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.dataFiltered
);

export const showEditorReviewPlanDetail = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showDetailEditor
);

export const showViewerReviewPlanDetail = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showDetailViewer
);

export const showEditorReviewPlan = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showPlanEditor
);

export const showViewerReviewPlan = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showPlanViewer
);

export const showEditorReviewGroup = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showEditor
);

export const showViewerReviewGroup = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.showViewer
);

export const isProcessingReview = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.isProcessing
);

export const isLoadingReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.isLoadingPlans
);

export const isLoadingReviews = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.isLoading
);

export const getStatusListReviewGroups = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.statusList
);

export const getPayrollProfileListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.payProfileList
);

export const getAllowanceListReviewPlanDetails = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.allowanceList
);

export const getDeductionListReviewPlanDetails = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.deductionList
);

export const getItemTypeListReviewPlanDetails = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.itemTypeList
);

export const getReviewRuleListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.reviewRuleList
);

export const getPaygroupListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.paygroupList
);

export const getEligibilityRuleListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.eligibilityRuleList
);

export const getAllowanceRuleListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.allowanceRuleList
);

export const getAllowanceAffectedListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.allowanceAffectedList
);

export const getDeductionRuleListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.deductionRuleList
);

export const getDeductionAffectedListReviewPlans = createSelector(
  getSalaryState,
  (state: ISalaryReviewState) => state.deductionAffectedList
);
