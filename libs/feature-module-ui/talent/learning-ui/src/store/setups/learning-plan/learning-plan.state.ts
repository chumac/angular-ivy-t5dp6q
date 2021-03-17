
import { ILearningPlan, IEmployeeOptOutEvent, ILearningApply, ILearningEnroll, IUpdateMyEvent } from '@nutela/models/talent/learning';

export interface ILearningPlanState {
  LearningPlanData: ILearningPlan[];
  employeeOptOut: IEmployeeOptOutEvent[];
  createApply: ILearningApply[];
  editMyEvent: IUpdateMyEvent[];
  createEnroll: ILearningEnroll[];
  LearningPlanGoto: any;
  document: any;
  showEditor: boolean;
  showEditEditor: boolean;
  showEnrollEditor: boolean;
  showApplyEditor: boolean;
  showViewer: boolean;
  showRecall: boolean;
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  addBtn: boolean;
  recallBtn: boolean;
  submitBtn: boolean;
  editBtn: boolean;
  viewBtn: boolean;
  deleteBtn: boolean;
  progressBtn: boolean;
  resetBtn: boolean;
}

export const initialLearningPlanState: ILearningPlanState = {
  LearningPlanData: [],
  employeeOptOut: [],
  createApply: [],
  editMyEvent: [],
  createEnroll: [],
  LearningPlanGoto: null,
  document: null,
  showEditEditor: false,
  showEnrollEditor: false,
  showApplyEditor: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showRecall: false,
  isProcessingDataGrid: false,
  addBtn: false,
  recallBtn: false,
  submitBtn: false,
  editBtn: false,
  viewBtn: false,
  deleteBtn: false,
  progressBtn: false,
  resetBtn: false,
}
