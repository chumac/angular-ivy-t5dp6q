
import { IRatingAssetDetail, IRatingAssetDefinition } from '@nutela/models/talent/performance';

export interface IRatingAssetDetailState {
  ratingAssetDetailData: IRatingAssetDetail[];
  ratingTableData: IRatingAssetDefinition[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialRatingAssetDetailState: IRatingAssetDetailState = {
  ratingAssetDetailData: [],
  ratingTableData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

