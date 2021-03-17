
import { IEventDetailPreRequisites, IEventDetailPreRequisitesType } from '@nutela/models/talent/learning';

export interface IPreRequisitesState {
  PreRequisitesData: IEventDetailPreRequisites[];
  PreRequisitesTypeData: IEventDetailPreRequisitesType[];
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

export const initialPreRequisitesState: IPreRequisitesState = {
  PreRequisitesData: [],
  PreRequisitesTypeData: [],
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
