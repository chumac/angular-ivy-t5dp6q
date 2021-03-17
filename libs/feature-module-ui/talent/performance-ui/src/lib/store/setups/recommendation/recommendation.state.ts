
import { IPerformanceRecommendation, IPlan } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IRecommendationState {
  recommendationData: IPerformanceRecommendation[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialRecommendationState: IRecommendationState = {
  recommendationData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

