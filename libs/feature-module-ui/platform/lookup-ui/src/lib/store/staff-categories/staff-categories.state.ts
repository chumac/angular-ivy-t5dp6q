import { IStaffCategory } from "@nutela/models/platform/lookup";

export interface IStaffCategoryState {
  staffData: IStaffCategory[];
  showEditor:boolean;
  isProcessing: boolean;

}

export const initialStaffCategoryState: IStaffCategoryState = {
  staffData: [],
  showEditor: false,
  isProcessing: false,
}

