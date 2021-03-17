import { ISalaryReviewPlan } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface ISalaryReviewState {
  data: any[];
  plansData: ISalaryReviewPlan[];
  detailData: any[];
  dataFiltered: any[];
  showEditor: boolean;
  showViewer: boolean;
  showDetailEditor: boolean;
  showDetailViewer: boolean;
  showPlanEditor: boolean;
  showPlanViewer: boolean;
  showProfileEditor: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  isLoadingPlans: boolean;
  statusList: ISelectOption[];
  payProfileList: ISelectOption[];

  eligibilityRuleList: ISelectOption[];
  reviewRuleList: ISelectOption[];
  allowanceRuleList: ISelectOption[];
  allowanceAffectedList: ISelectOption[];
  deductionRuleList: ISelectOption[];
  deductionAffectedList: ISelectOption[];

  allowanceList: ISelectOption[];
  deductionList: ISelectOption[];
  paygroupList: ISelectOption[];
  itemTypeList: ISelectOption[];
}

export const initialSalaryReviewState: ISalaryReviewState = {
  data: [],
  plansData: [],
  detailData: [],
  dataFiltered: [],
  showEditor: false,
  showViewer: false,


  showProfileEditor: false,
  isProcessing: false,
  isLoading:false,
  isLoadingPlans:false,
  statusList: null,
  payProfileList: null,

  showPlanEditor: false,
  showPlanViewer: false,
  eligibilityRuleList: null,
  allowanceRuleList: null,
  allowanceAffectedList: null,
  deductionRuleList: null,
  reviewRuleList: null,
  deductionAffectedList: null,

  showDetailEditor: false,
  showDetailViewer: false,
  deductionList: null,
  allowanceList: null,
  itemTypeList: null,
  paygroupList: null,
}

