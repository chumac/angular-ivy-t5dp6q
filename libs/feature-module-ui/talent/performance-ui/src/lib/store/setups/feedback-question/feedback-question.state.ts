
import { IFeedbackQuestion, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IFeedbackQuestionState {
  feedbackQuestionData: IFeedbackQuestion[];
  planList: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialFeedbackQuestionState: IFeedbackQuestionState = {
  feedbackQuestionData: [],
  planList:[],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

