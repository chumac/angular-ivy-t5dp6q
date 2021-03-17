import { IReviewChecklist } from "libs/models/workforce/exit/src/lib/interfaces";
import { ISelectOption } from "@nutela/models/core-data";
import { IResignationLetter } from "../../interfaces";



export interface IResignState {
  resignationLetter: IResignationLetter[];
  reviewChecklist: IReviewChecklist[];
  exitCompletedUrl: string[];
  exitInterviewStatus: string[];
  processTableData: any[];


  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showViewerProcessTable: boolean;
  showViewerChecklist: boolean;

}

export const initialResignState: IResignState = {
  resignationLetter: [],
  reviewChecklist: [],
  exitCompletedUrl: [],
  exitInterviewStatus: [],
  processTableData: [],

  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showViewerProcessTable: false,
  showViewerChecklist: false,

};
