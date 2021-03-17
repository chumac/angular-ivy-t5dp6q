import { IQualifications } from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";

export interface IQualificationState {
  qualificationData: IQualifications[];
  showEditor:boolean;
  isProcessing: boolean;
 quaCategory: ISelectOption[];
}

export const initialQualificationState: IQualificationState = {
  qualificationData: [],
  showEditor: false,
  isProcessing: false,
  quaCategory:[],
}

