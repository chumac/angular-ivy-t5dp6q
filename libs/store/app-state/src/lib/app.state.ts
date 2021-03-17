import { RouterReducerState } from '@ngrx/router-store';
import {ISelectOptionDataState, IBusinessOptionDataState } from '@nutela/store/modules/foundation';
import { ILookupDataState } from 'libs/store/modules/foundation/src/lib/lookup-data';
import { IToastState, IFileDownloaderState, IRoutingProgressBarState } from '@nutela/store/shared';
import { IWorkLifeDataState, IComprehensiveDataState, IImageState, IGeneralState, IContactState, IIdentificationState, IPaymentState, IWorkHistoryState, IEducationState, IProfessionalQualificationsState, IDependantState, IBeneficiaryState, IRefereeState, IFamilyState, IGuarantorState, IPeopleState, IProfilePictureState, ICustomDataFormState } from '@nutela/store/modules/workforce/employee-profiles';
import { IReportState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { INotificationState } from 'libs/store/shared/src/lib/notification';
import { IPolicyAgreementState } from 'libs/store/shared/src/lib/policy-agreement';

export interface IAppState {
  router?: RouterReducerState;
  comprehensiveData: IComprehensiveDataState;
  workLifeData: IWorkLifeDataState;
  imageData: IImageState;
  general: IGeneralState;
  contact: IContactState;
  identification: IIdentificationState;
  payment: IPaymentState;
  workHistory: IWorkHistoryState;
  education: IEducationState;
  professionalQualifications: IProfessionalQualificationsState;
  dependants: IDependantState;
  beneficiaries: IBeneficiaryState;
  personalReferees: IRefereeState;
  family: IFamilyState;
  guarantor: IGuarantorState;
  customDataForm: ICustomDataFormState;
  lookupData: ILookupDataState;
  businessOption: IBusinessOptionDataState;
  selectOptionData: ISelectOptionDataState;
  toast: IToastState;
  fileDownloader: IFileDownloaderState;
  people: IPeopleState;
  routingProgressBar: IRoutingProgressBarState;
  profilePictureData: IProfilePictureState;
  report: IReportState;
  notification: INotificationState;
  policyAgreement: IPolicyAgreementState;
}

export const initialAppState: IAppState = {
  comprehensiveData: null,
  workLifeData: null,
  imageData: null,
  general: null,
  contact: null,
  identification: null,
  payment: null,
  workHistory: null,
  education: null,
  professionalQualifications: null,
  dependants: null,
  beneficiaries: null,
  personalReferees: null,
  family: null,
  guarantor: null,
  customDataForm: null,
  lookupData: null,
  businessOption: null,
  selectOptionData: null,
  toast: null,
  fileDownloader: null,
  people: null,
  routingProgressBar: null,
  profilePictureData: null,
  report: null,
  notification: null,
  policyAgreement: null,
};

export function getInitialAppState(): IAppState {
  return initialAppState;
}

export const getAppState = (state: IAppState) => state;

