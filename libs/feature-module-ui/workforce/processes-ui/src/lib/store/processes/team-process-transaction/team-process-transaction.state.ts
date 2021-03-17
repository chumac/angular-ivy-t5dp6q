import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export interface ITeamProcessTransactionState {
  teamProcessTransactionData: IProcessTransactionMaster[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  area: IProcessFormArea[];
}

export const initialTeamProcessTransactionState: ITeamProcessTransactionState = {
  teamProcessTransactionData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  area: []
}

