
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export interface IReboardProfessionalQualificationsState {
  data: IProfessionalQualification[];
  gridData: IProfessionalQualification[];
  document: any;
  inlineDocument: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardProfessionalQualificationsState: IReboardProfessionalQualificationsState = {
  data: [],
  gridData: [],
  document: null,
  inlineDocument: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

