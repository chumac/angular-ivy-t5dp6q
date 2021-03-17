
import { IPlanOption, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IPlanOptionState {
  planOptionData: IPlanOption[];
  planList: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPlanOptionState: IPlanOptionState = {
  planOptionData: undefined,
  planList:[],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

