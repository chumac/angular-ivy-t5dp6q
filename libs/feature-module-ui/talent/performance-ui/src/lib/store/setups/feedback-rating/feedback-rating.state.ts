
import { IFeedbackRating, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IFeedbackRatingState {
  feedbackRatingData: IFeedbackRating[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialFeedbackRatingState: IFeedbackRatingState = {
  feedbackRatingData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

