
import { IPage } from '@nutela/models/talent/performance';
import { ISelectOption } from '@nutela/models/core-data';

export interface IPageState {
  pageData: IPage[];
  uncompletedPageData: IPage[];
  completedPageData: IPage[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  pageType: ISelectOption[];
}

export const initialPageState: IPageState = {
  pageData: [],
  uncompletedPageData: [],
  completedPageData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  pageType: []
}

