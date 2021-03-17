
import { ISection, IPage } from '@nutela/models/talent/performance';

export interface ISectionState {
  sectionData: ISection[];
  customPagesList: IPage[];
  document: any;
  isProcessing: boolean;
  isProcessingGrid: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialSectionState: ISectionState = {
  sectionData: [],
  customPagesList: [],
  document: null,
  isProcessing: false,
  isProcessingGrid: false,
  showEditor: false,
  showViewer: false,
}

