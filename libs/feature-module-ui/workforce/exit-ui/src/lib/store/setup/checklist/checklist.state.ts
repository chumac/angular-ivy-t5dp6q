import { ISelectOption } from "@nutela/models/core-data";
import { IResignationLetter, IChecklistItem } from "../../../interfaces";



export interface IChecklistState {
  resignationLetter: IResignationLetter[];
  checklist: IChecklistItem[];
  validationRoleData: any[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  workflowDefinitions: any[];
  roles: any[];
  positions: any[];
}

export const initialChecklistState: IChecklistState = {
  resignationLetter: [],
  checklist: [],
  validationRoleData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  workflowDefinitions: null,
  roles: null,
  positions: null
};
