import { IQualificationCategory } from "@nutela/models/platform/lookup";

export interface IQualificationCategoryState {
  category: IQualificationCategory[];
  showEditor:boolean;
  isProcessing: boolean;
}

export const initialQualificationCategoryState: IQualificationCategoryState = {
  category: [],
  showEditor: false,
  isProcessing: false,
}

