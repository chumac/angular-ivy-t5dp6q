
import { IFeedbackSession, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IFeedbackSessionState {
  feedbackSessionData: IFeedbackSession[];
  planList: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialFeedbackSessionState: IFeedbackSessionState = {
  feedbackSessionData: [],
  planList:[],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

