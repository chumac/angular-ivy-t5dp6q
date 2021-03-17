
import { ILearningLibrary, IEmployeeOptOutEvent, ILearningApply, ILearningEnroll } from '@nutela/models/talent/learning';

export interface ILearningLibraryState {
  LearningLibraryData: ILearningLibrary[];
  createApply: ILearningApply[];
  createEnroll: ILearningEnroll[];
  document: any;
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

export const initialLearningLibraryState: ILearningLibraryState = {
  LearningLibraryData: [],
  createApply: [],
  createEnroll: [],
  document: null,
  isProcessing: false,
  showEnrollEditor: false,
  showApplyEditor: false,
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
