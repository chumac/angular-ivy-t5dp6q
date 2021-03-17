
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export interface IHrReboardProfessionalQualificationsState {
  data: IProfessionalQualification[];
  document: any;
  inlineDocument: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardProfessionalQualificationsState: IHrReboardProfessionalQualificationsState = {
  data: [],
  document: null,
  inlineDocument: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

