import { IEducationalCourses } from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";


export interface IEducationalCoursesState {
  educationalCoursesData: IEducationalCourses[];
  showEditor:boolean;
  isProcessing: boolean;
  category: ISelectOption[];
}

export const initialEducationalCoursesState: IEducationalCoursesState = {
  educationalCoursesData: [],
  showEditor: false,
  isProcessing: false,
  category: []
}

