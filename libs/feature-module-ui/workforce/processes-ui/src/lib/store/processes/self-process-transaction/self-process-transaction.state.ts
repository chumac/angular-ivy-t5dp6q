import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export interface ISelfProcessTransactionState {
  selfProcessTransactionData: IProcessTransactionMaster[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  area: IProcessFormArea[];
}

export const initialSelfProcessTransactionState: ISelfProcessTransactionState = {
  selfProcessTransactionData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  area: []
}

