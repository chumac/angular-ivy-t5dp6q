import { IProcessTransactionMaster, IProcessTransactionDetail, IProcessMetaData } from '@nutela/models/workforce/employee-profiles';

export interface IProcessFormWizardState {
  processMasterData: IProcessTransactionMaster;
  processDetailData: IProcessTransactionDetail[];
  wizardMetaData: IProcessMetaData;
  isProcessing: boolean;
  isProcessingMaster: boolean;
  isProcessingDetail: boolean;
  isSaving: boolean;
  isCompleting: boolean;
  isSubmitting: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialProcessFormWizardState: IProcessFormWizardState = {
  processMasterData: null,
  processDetailData: [],
  wizardMetaData: null,
  isProcessing: false,
  isProcessingMaster: false,
  isProcessingDetail: false,
  isSaving: false,
  isCompleting: false,
  isSubmitting: false,
  showEditor: false,
  showViewer: false,
}

