import { ToastEffects, FileDownloaderEffects } from '@nutela/store/shared';
import {
  LookupDataEffects,
  BusinessOptionDataEffects
} from '@nutela/store/modules/foundation';
import {
  ComprehensiveDataEffects,
  WorkLifeDataEffects,
  ImageEffects,
  GeneralEffects,
  ContactEffects,
  IdentificationEffects,
  PaymentEffects,
  WorkHistoryEffects,
  EducationEffects,
  ProfessionalQualificationsEffects,
  DependantEffects,
  BeneficiaryEffects,
  RefereeEffects,
  FamilyEffects,
  GuarantorEffects,
  PeopleEffects,
  ProfilePictureEffects,
  CustomDataFormEffects
} from '@nutela/store/modules/workforce/employee-profiles';
import { ReportEffects } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { NotificationEffects } from 'libs/store/shared/src/lib/notification/notification.effects';
import { PolicyAgreementEffects } from 'libs/store/shared/src/lib/policy-agreement/policy-agreement.effects';

export const appEffects = [
  ToastEffects,
  FileDownloaderEffects,
  LookupDataEffects,
  BusinessOptionDataEffects,
  ComprehensiveDataEffects,
  WorkLifeDataEffects,
  ImageEffects,
  GeneralEffects,
  ContactEffects,
  IdentificationEffects,
  PaymentEffects,
  WorkHistoryEffects,
  EducationEffects,
  ProfessionalQualificationsEffects,
  DependantEffects,
  BeneficiaryEffects,
  RefereeEffects,
  FamilyEffects,
  GuarantorEffects,
  CustomDataFormEffects,
  PeopleEffects,
  ProfilePictureEffects,
  ReportEffects,
  NotificationEffects,
  PolicyAgreementEffects
];
