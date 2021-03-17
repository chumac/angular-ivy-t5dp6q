
import { IManagerOptOutEvent, IMyAction, IFeedBackForm } from '@nutela/models/talent/learning';

export interface IMyActionState {
  MyActionData: IMyAction[];
  MyFormActionData: IFeedBackForm[];
  managerOptOut: IManagerOptOutEvent[];
  saveFeedbackForm: IFeedBackForm[];
  showActionOptOutEditor: boolean;
  showActionFeedbackFormEditor: boolean;
  showActionNominationEditor: boolean;
  showEnrollEditor: boolean;
  showApplyEditor: boolean;
  showViewer: boolean;
  showRecall: boolean;
  isProcessing: boolean;
  isProcessingDataGrid: boolean;
  addBtn: boolean;
  recallBtn: boolean;
  submitBtn: boolean;
  editBtn: boolean;
  viewBtn: boolean;
  deleteBtn: boolean;
  progressBtn: boolean;
  resetBtn: boolean;
}

export const initialMyActionState: IMyActionState = {
  MyActionData: [],
  MyFormActionData: [],
  managerOptOut: [],
  saveFeedbackForm: [],
  showEnrollEditor: false,
  showActionNominationEditor: false,
  showActionFeedbackFormEditor: false,
  showApplyEditor: false,
  isProcessing: false,
  showActionOptOutEditor: false,
  showViewer: false,
  showRecall: false,
  isProcessingDataGrid: false,
  addBtn: false,
  recallBtn: false,
  submitBtn: false,
  editBtn: false,
  viewBtn: false,
  deleteBtn: false,
  progressBtn: false,
  resetBtn: false,
}
