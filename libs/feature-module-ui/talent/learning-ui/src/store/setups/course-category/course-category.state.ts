
import { ICourseCategory } from '@nutela/models/talent/learning';

export interface ICourseCategoryState {
  courseCategoryData: ICourseCategory[];
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

export const initialCourseCategoryState: ICourseCategoryState = {
  courseCategoryData: [],
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
