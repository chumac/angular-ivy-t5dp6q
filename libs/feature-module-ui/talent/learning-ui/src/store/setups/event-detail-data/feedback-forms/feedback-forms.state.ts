
import { IEventDetail, IEventDetailCustomForms, IEventDetailFeedbackForms, IEventDetailFeedbackRole, IEventDetailFormAvailability } from '@nutela/models/talent/learning';

export interface IFeedbackFormsState {
  FeedbackFormsData: IEventDetailFeedbackForms[];
  CustomFormsData: IEventDetailCustomForms[];
  FeedbackFormsAvailabilityData: IEventDetailFormAvailability[]; 
  FeedbackFormsRoleData: IEventDetailFeedbackRole[];
  document: any;
  showEditor: boolean;
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

export const initialFeedbackFormsState: IFeedbackFormsState = {
  FeedbackFormsData: [],
  CustomFormsData: [],
  FeedbackFormsAvailabilityData: [], 
  FeedbackFormsRoleData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
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
