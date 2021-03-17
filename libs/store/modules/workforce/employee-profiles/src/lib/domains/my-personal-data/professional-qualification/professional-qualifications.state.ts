
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export interface IProfessionalQualificationsState {
  approvedData: IProfessionalQualification[];
  awaitingApprovalData: IProfessionalQualification[];
  approvedDataMap: {[key: number]: IProfessionalQualification};
  document: any;
  inlineDocument: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialProfessionalQualificationsState: IProfessionalQualificationsState = {
  approvedData: [],
  awaitingApprovalData: [],
  approvedDataMap: {},
  document: null,
  inlineDocument: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

