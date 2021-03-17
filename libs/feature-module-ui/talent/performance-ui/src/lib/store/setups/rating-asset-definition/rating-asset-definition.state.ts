
import { IRatingAssetDefinition, IPage } from '@nutela/models/talent/performance';

export interface IRatingAssetDefinitionState {
  ratingAssetDefinitionData: IRatingAssetDefinition[];
  pageList: IPage[];
  document: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialRatingAssetDefinitionState: IRatingAssetDefinitionState = {
  ratingAssetDefinitionData: [],
  pageList: [],
  document: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false
}

