import { IEmployeeReviewForm, IReviewWorkflowProcess, IEmployeePageScore } from "@nutela/models/talent/performance";
import { IPageNavigatorData } from "../../../models";

export interface IAppraisalFormsState {
  employeeReviewForms: IEmployeeReviewForm[];
  pageNavigatorList: IPageNavigatorData[];
  saveContinueDisabledStatus: boolean;
  reviewWorkflowProcess: IReviewWorkflowProcess;
  employeePageScores: IEmployeePageScore[];
  employeeConfirmationStatus: string;
}

export const initialAppraisalFormsState: IAppraisalFormsState = {
  employeeReviewForms: [],
  pageNavigatorList: [],
  saveContinueDisabledStatus: false,
  reviewWorkflowProcess: null,
  employeePageScores: null,
  employeeConfirmationStatus: null

}

