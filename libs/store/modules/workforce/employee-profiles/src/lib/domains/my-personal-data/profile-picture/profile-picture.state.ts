import { IProfilePicture } from "@nutela/models/workforce/employee-profiles";

export interface IProfilePictureState {
  approvedEmployeePhoto: any,
  awaitingApprovalEmployeePhoto: IProfilePicture,
  isProcessing: boolean,
  showEditor: boolean;
  showViewer: boolean;
}

export const initialProfilePictureState: IProfilePictureState = {
  approvedEmployeePhoto: null,
  awaitingApprovalEmployeePhoto: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
