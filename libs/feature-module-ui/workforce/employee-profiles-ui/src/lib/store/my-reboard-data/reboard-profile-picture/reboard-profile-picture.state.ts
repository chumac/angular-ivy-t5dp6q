import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";

export interface IReboardProfilePictureState {
  employeePhoto: any,
  isProcessing: boolean,
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardProfilePictureState: IReboardProfilePictureState = {
  employeePhoto: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
