import { ICompetencyProfile } from "@nutela/models/workforce/employee-profiles";

export interface ICompetencyProfileState {
  approvedData: ICompetencyProfile[];
  awaitingApprovalData: ICompetencyProfile[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCompetencyProfileState: ICompetencyProfileState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}