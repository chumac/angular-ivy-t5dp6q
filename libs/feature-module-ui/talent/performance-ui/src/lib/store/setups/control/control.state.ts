
import { IControl, IPage, ISection } from '@nutela/models/talent/performance';

export interface IControlState {
  controlData: IControl[];
  sectionList: ISection[];
  customPagesList: IPage[];
  document: any;
  isProcessing: boolean;
  isProcessingGrid: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialControlState: IControlState = {
  controlData: [],
  sectionList: [],
  customPagesList: [],
  document: null,
  isProcessing: false,
  isProcessingGrid: false,
  showEditor: false,
  showViewer: false
}

