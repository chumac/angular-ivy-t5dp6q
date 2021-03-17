import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";

export interface IHrReboardProfilePictureState {
  employeePhoto: any,
  isProcessing: boolean,
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardProfilePictureState: IHrReboardProfilePictureState = {
  employeePhoto: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
