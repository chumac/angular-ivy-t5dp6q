import { IFaculty } from "@nutela/models/platform/lookup";

export interface IFacultyState {
  facultyData: IFaculty[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;

}

export const initialFacultyState: IFacultyState = {
  facultyData: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
}

