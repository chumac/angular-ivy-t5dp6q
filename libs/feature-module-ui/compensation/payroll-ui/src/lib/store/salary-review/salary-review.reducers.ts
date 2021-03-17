import { initialSalaryReviewState, ISalaryReviewState } from './salary-review.state';
import { SalaryReviewActions, SalaryReviewActionTypes } from './salary-review.actions';

export function salaryReviewReducer(
  state = initialSalaryReviewState,
  action: SalaryReviewActions
): ISalaryReviewState {
  switch (action.type) {
    case SalaryReviewActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SalaryReviewActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SalaryReviewActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SalaryReviewActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SalaryReviewActionTypes.SHOW_PLAN_EDITOR:
      return { ...state, showPlanEditor: true };
    case SalaryReviewActionTypes.HIDE_PLAN_EDITOR:
      return { ...state, showPlanEditor: false };
    case SalaryReviewActionTypes.SHOW_PLAN_VIEWER:
      return { ...state, showPlanViewer: true };
    case SalaryReviewActionTypes.HIDE_PLAN_VIEWER:
      return { ...state, showPlanViewer: false };
    case SalaryReviewActionTypes.SHOW_DETAIL_EDITOR:
      return { ...state, showDetailEditor: true };
    case SalaryReviewActionTypes.HIDE_DETAIL_EDITOR:
      return { ...state, showDetailEditor: false };
    case SalaryReviewActionTypes.SHOW_DETAIL_VIEWER:
      return { ...state, showDetailViewer: true };
    case SalaryReviewActionTypes.HIDE_DETAIL_VIEWER:
      return { ...state, showDetailViewer: false };
    case SalaryReviewActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SalaryReviewActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SalaryReviewActionTypes.LOADING:
      return { ...state, isLoading: true };
    case SalaryReviewActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case SalaryReviewActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case SalaryReviewActionTypes.LOAD_PLAN_DATA_SUCCESS:
      return { ...state, plansData: action.payload };
    case SalaryReviewActionTypes.LOAD_DATA_FILTERED:
      console.log(state.data)
      console.log(action.payload.statusId)
      return { ...state, dataFiltered: state.data.filter(val => typeof action.payload.statusId === 'number' ? val.status === action.payload.statusId : val) };
    case SalaryReviewActionTypes.LOAD_STATUS_LIST_SUCCESS:
      return { ...state, statusList: action.payload };
    case SalaryReviewActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payProfileList: action.payload };
    case SalaryReviewActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS:
      return { ...state, allowanceList: action.payload };
    case SalaryReviewActionTypes.LOAD_ITEM_TYPE_LIST_SUCCESS:
      return { ...state, itemTypeList: action.payload };
    case SalaryReviewActionTypes.LOAD_REVIEW_RULE_LIST_SUCCESS:
      return { ...state, reviewRuleList: action.payload };
    case SalaryReviewActionTypes.LOAD_ALLOWANCE_AFFECTED_LIST_SUCCESS:
      return { ...state, allowanceAffectedList: action.payload };
    case SalaryReviewActionTypes.LOAD_ALLOWANCE_RULE_LIST_SUCCESS:
      return { ...state, allowanceRuleList: action.payload };
    case SalaryReviewActionTypes.LOAD_DEDUCTION_LIST_SUCCESS:
      return { ...state, deductionList: action.payload };
    case SalaryReviewActionTypes.LOAD_DEDUCTION_AFFECTED_LIST_SUCCESS:
      return { ...state, deductionAffectedList: action.payload };
    case SalaryReviewActionTypes.LOAD_DEDUCTION_RULE_LIST_SUCCESS:
      return { ...state, deductionRuleList: action.payload };
    case SalaryReviewActionTypes.LOAD_ELIGIBILITY_RULE_LIST_SUCCESS:
      return { ...state, eligibilityRuleList: action.payload };
    case SalaryReviewActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    default: {
      return state;
    }
  }
}
