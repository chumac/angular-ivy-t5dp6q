
import { IObjectiveRating } from '@nutela/models/talent/performance';

export interface IObjectiveRatingState {
  objectiveRatingData: IObjectiveRating[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialObjectiveRatingState: IObjectiveRatingState = {
  objectiveRatingData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

