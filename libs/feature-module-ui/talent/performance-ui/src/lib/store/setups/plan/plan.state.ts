
import { IPlan } from '@nutela/models/talent/performance';

export interface IPlanState {
  planData: IPlan[];
  currentPlan: IPlan;
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPlanState: IPlanState = {
  planData: [],
  currentPlan: null,
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

