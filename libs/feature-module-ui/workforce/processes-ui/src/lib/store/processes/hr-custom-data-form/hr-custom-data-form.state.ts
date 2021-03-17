import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';

export interface IHrCustomDataFormState {
  hrCustomDataFormData: IHrCustomDataForm[];
  isProcessing: boolean;
  isProcessingAlt: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrCustomDataFormState: IHrCustomDataFormState = {
  hrCustomDataFormData: [],
  isProcessing: false,
  isProcessingAlt: false,
  showEditor: false,
  showViewer: false
}

