import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from './app.state';
import * as foundationStore from '@nutela/store/modules/foundation';
import * as sharedStore from '@nutela/store/shared';
import { workLifeDataReducer, comprehensiveDataReducer, imageReducer, generalReducer, contactReducer, identificationReducer, paymentReducer, workHistoryReducer, educationReducer, professionalQualificationsReducer, dependantsReducer, beneficiaryReducer, refereeReducer, familyReducer, guarantorReducer, peopleReducer, profilePictureReducer, customDataFormReducer } from '@nutela/store/modules/workforce/employee-profiles';
import { reportReducer } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { notificationReducer } from 'libs/store/shared/src/lib/notification';
import { policyAgreementReducer } from 'libs/store/shared/src/lib/policy-agreement';

export const appRreducers: ActionReducerMap<IAppState> = {
  comprehensiveData: comprehensiveDataReducer,
  workLifeData: workLifeDataReducer,
  imageData: imageReducer,
  general: generalReducer,
  contact: contactReducer,
  identification: identificationReducer,
  payment: paymentReducer,
  workHistory: workHistoryReducer,
  education: educationReducer,
  professionalQualifications: professionalQualificationsReducer,
  dependants: dependantsReducer,
  beneficiaries: beneficiaryReducer,
  personalReferees: refereeReducer,
  family: familyReducer,
  guarantor: guarantorReducer,
  customDataForm: customDataFormReducer,
  lookupData: foundationStore.lookupDataReducer,
  businessOption: foundationStore.businessOptionReducer,
  selectOptionData: foundationStore.SelectOptionDataReducer,
  toast: sharedStore.toastReducer,
  fileDownloader: sharedStore.fileDownloaderReducer,
  people: peopleReducer,
  routingProgressBar: sharedStore.routingProgressBarReducer,
  profilePictureData: profilePictureReducer,
  report: reportReducer,
  notification: notificationReducer,
  policyAgreement: policyAgreementReducer
};
