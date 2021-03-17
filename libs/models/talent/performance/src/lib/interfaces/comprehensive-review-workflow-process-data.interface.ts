import { IReviewWorkflowProcess } from "./review-workflow-process.interface";
import { IComprehensiveData } from "@nutela/models/workforce/employee-profiles";

export interface IComprehensiveReviewWorkflowProcessData {
  reviewWorkflowProcess: IReviewWorkflowProcess,
  employeeData: IComprehensiveData
}
