import { EmployeesDataHomeEffects } from '../employees-data-home/employees-data-home.effects';
import {
  ComprehensiveDataEffects,
  ImageEffects,
  GeneralEffects,
  ContactEffects,
  IdentificationEffects,
  TrainingHistoryEffects,
  CompetencyProfileEffects,
  PromotionHistoryEffects,
  TransferHistoryEffects,
  VacationHistoryEffects,
  PerformanceHistoryEffects,
  DisciplinaryActionEffects,
  ConfirmationInformationEffects,
  PayrollPaymentHistoryEffects,
  LoanHistoryEffects,
  WorkflowTransactionEffects,
  TeamEffects,
  SeparationEffects,
  PaymentEffects,
  HrDependantEffects,
  FamilyEffects,
  RefereeEffects,
  BeneficiaryEffects,
  GuarantorEffects,
  HRWorkHistoryEffects,
  EducationEffects,
  ProfessionalQualificationsEffects,
  HrCustomDataFormEffects
} from '../employee-detailed-area';
import { MyTeamEffects } from '../my-team';

import { CommendationEffects } from '../hr-transactions/commendation';
import { ConfirmationEffects } from '../hr-transactions/confirmation';
import { CustomUserGroupEffects } from '../hr-transactions/custom-user-group';
import { PromotionEffects } from '../hr-transactions/promotion';
import { TransferEffects } from '../hr-transactions/transfer';
import { DisciplinaryActionTransEffects } from '../hr-transactions/disciplinary-action';
import { SeparationTransactionEffects } from '../hr-transactions/separation';

import { CustomUserGroupSetupEffects } from '../setups/custom-user-group/custom-user-group.effects';
import { DisciplinaryActionSetupEffects } from '../setups/disciplinary-action/disciplinary-action.effects';
import { DisciplinaryRoleSetupEffects } from '../setups/disciplinary-role/disciplinary-role.effects';
import { PositionCategorySetupEffects } from '../setups/position-category/position-category.effects';
import { SeparationReasonSetupEffects } from '../setups/separation-reason/separation-reason.effects';
import { PositionSetupEffects } from '../setups/position/position.effects';
import { DesignationSetupEffects } from '../setups/designation/designation.effects';
import { GradeManagementEffects } from '../setups/grade-management/grade.effects';
import { ReInstateTransactionEffects } from '../hr-transactions/re-instate';
import { MultiJobRoleTransactionEffects } from '../hr-transactions/multi-job-role/multi-job-role.effects';
import { TeamDeploymentEffects } from '../team-deployments';
import {
  ReboardBeneficiaryEffects,
  ReboardContactEffects,
  ReboardDependantEffects,
  ReboardEducationEffects,
  ReboardFamilyEffects,
  ReboardGeneralEffects,
  ReboardIdentificationEffects,
  ReboardGuarantorEffects,
  ReboardPaymentEffects,
  ReboardProfilePictureEffects,
  ReboardWorkHistoryEffects,
  ReboardRefereeEffects,
  ReboardProfessionalQualificationsEffects
} from '../my-reboard-data';
import {
  HrReboardBeneficiaryEffects,
  HrReboardContactEffects,
  HrReboardDependantEffects,
  HrReboardEducationEffects,
  HrReboardFamilyEffects,
  HrReboardGeneralEffects,
  HrReboardIdentificationEffects,
  HrReboardGuarantorEffects,
  HrReboardPaymentEffects,
  HrReboardProfilePictureEffects,
  HrReboardWorkHistoryEffects,
  HrReboardRefereeEffects,
  HrReboardProfessionalQualificationsEffects,
  HrReboardComprehensiveDataEffects
} from '../hr-reboard-data';

export const employeesProfileEffects = [
  EmployeesDataHomeEffects,
  ComprehensiveDataEffects,
  ImageEffects,
  GeneralEffects,
  ContactEffects,
  IdentificationEffects,
  TrainingHistoryEffects,
  CompetencyProfileEffects,
  PromotionHistoryEffects,
  TransferHistoryEffects,
  VacationHistoryEffects,
  PerformanceHistoryEffects,
  DisciplinaryActionEffects,
  ConfirmationInformationEffects,
  PayrollPaymentHistoryEffects,
  LoanHistoryEffects,
  WorkflowTransactionEffects,
  TeamEffects,
  SeparationEffects,
  PaymentEffects,
  HrDependantEffects,
  FamilyEffects,
  RefereeEffects,
  BeneficiaryEffects,
  GuarantorEffects,
  HRWorkHistoryEffects,
  EducationEffects,
  ProfessionalQualificationsEffects,
  MyTeamEffects,
  CommendationEffects,
  ConfirmationEffects,
  CustomUserGroupEffects,
  PromotionEffects,
  TransferEffects,
  DisciplinaryActionTransEffects,
  SeparationTransactionEffects,

  ReboardBeneficiaryEffects,
  ReboardContactEffects,
  ReboardDependantEffects,
  ReboardEducationEffects,
  ReboardFamilyEffects,
  ReboardGeneralEffects,
  ReboardIdentificationEffects,
  ReboardGuarantorEffects,
  ReboardPaymentEffects,
  ReboardProfilePictureEffects,
  ReboardWorkHistoryEffects,
  ReboardRefereeEffects,
  ReboardProfessionalQualificationsEffects,

  HrReboardBeneficiaryEffects,
  HrReboardContactEffects,
  HrReboardDependantEffects,
  HrReboardEducationEffects,
  HrReboardFamilyEffects,
  HrReboardGeneralEffects,
  HrReboardIdentificationEffects,
  HrReboardGuarantorEffects,
  HrReboardPaymentEffects,
  HrReboardProfilePictureEffects,
  HrReboardWorkHistoryEffects,
  HrReboardRefereeEffects,
  HrReboardProfessionalQualificationsEffects,
  HrReboardComprehensiveDataEffects,

  CustomUserGroupSetupEffects,
  DisciplinaryActionSetupEffects,
  DisciplinaryRoleSetupEffects,
  PositionCategorySetupEffects,
  SeparationReasonSetupEffects,
  PositionSetupEffects,
  DesignationSetupEffects,
  GradeManagementEffects,
  ReInstateTransactionEffects,
  MultiJobRoleTransactionEffects,
  TeamDeploymentEffects,
  HrCustomDataFormEffects,
];
