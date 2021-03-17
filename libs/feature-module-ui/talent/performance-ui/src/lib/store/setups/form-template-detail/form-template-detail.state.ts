
import { IFormTemplateDetail, IFormTemplate, IPage } from '@nutela/models/talent/performance';

export interface IFormTemplateDetailState {
  formTemplateDetailData: IFormTemplateDetail[];
  formTemplateList: IFormTemplate[];
  pageList: IPage[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialFormTemplateDetailState: IFormTemplateDetailState = {
  formTemplateDetailData: [],
  formTemplateList: [],
  pageList: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

