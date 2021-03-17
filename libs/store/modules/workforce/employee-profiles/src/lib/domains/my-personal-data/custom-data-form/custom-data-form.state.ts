import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';

export interface ICustomDataFormState {
  customDataFormData: ICustomDataForm[];
  isProcessing: boolean;
  isProcessingAlt: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCustomDataFormState: ICustomDataFormState = {
  customDataFormData: [],
  isProcessing: false,
  isProcessingAlt: false,
  showEditor: false,
  showViewer: false
}

