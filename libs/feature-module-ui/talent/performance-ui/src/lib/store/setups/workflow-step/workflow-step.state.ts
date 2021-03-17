
import { IWorkflowStep, IWorkflowDefinition } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IWorkflowStepState {
  workflowDefList: ISelectOption[];
  workflowStepData: IWorkflowStep[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialWorkflowStepState: IWorkflowStepState = {
  workflowDefList: [],
  workflowStepData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

