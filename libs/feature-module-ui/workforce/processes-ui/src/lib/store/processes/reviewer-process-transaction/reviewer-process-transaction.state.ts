import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';

export interface IReviewerProcessTransactionState {
  reviewerProcessTransactionData: IProcessTransactionMaster[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReviewerProcessTransactionState: IReviewerProcessTransactionState = {
  reviewerProcessTransactionData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
}

