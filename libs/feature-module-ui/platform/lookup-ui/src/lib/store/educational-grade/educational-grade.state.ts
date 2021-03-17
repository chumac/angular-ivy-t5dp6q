import { IEducationGrades } from "@nutela/models/platform/lookup";

export interface IEducationGradesState {
  gradeData: IEducationGrades[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialEducationGradesState: IEducationGradesState = {
  gradeData: [],
  showEditor: false,
  isProcessing: false,
}

