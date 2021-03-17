import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export interface IHrProcessTransactionState {
  hrProcessTransactionData: IProcessTransactionMaster[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  area: IProcessFormArea[];
}

export const initialHrProcessTransactionState: IHrProcessTransactionState = {
  hrProcessTransactionData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  area: []
}

