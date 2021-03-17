import { ActionReducerMap } from '@ngrx/store';

import { IEmployeesProfileState } from './employees-profile.state';

import { employeesDataHomeReducer } from '../employees-data-home/employees-data-home.reducers';
import { comprehensiveDataReducer, imageReducer, generalReducer, contactReducer,
         identificationReducer, trainingHistoryReducer, competencyProfileReducer,
         promotionHistoryReducer, transferHistoryReducer, vacationHistoryReducer,
         performanceHistoryReducer, disciplinaryActionReducer, confirmationInformationReducer,
         payrollPaymentHistoryReducer, loanHistoryReducer, workflowTransactionReducer,
         teamReducer, separationReducer, paymentReducer, dependantsReducer, familyReducer,
         refereeReducer,HRbeneficiaryReducer, guarantorReducer, HRworkHistoryReducer,
         educationReducer, professionalQualificationsReducer, hrCustomDataFormReducer } from '../employee-detailed-area';
import { myTeamReducer } from '../my-team';

import { commendationReducer } from '../hr-transactions/commendation';
import { confirmationReducer } from '../hr-transactions/confirmation';
import { customUserGroupReducer } from '../hr-transactions/custom-user-group';
import { promotionReducer } from '../hr-transactions/promotion';
import { transferReducer } from '../hr-transactions/transfer';
import { disciplinaryActionTransReducer } from '../hr-transactions/disciplinary-action';
import { separationTransactionReducer } from '../hr-transactions/separation';

import { customUserGroupSetupReducer } from '../setups/custom-user-group/custom-user-group.reducers';
import { disciplinaryActionSetupReducer } from '../setups/disciplinary-action/disciplinary-action.reducers';
import { disciplinaryRoleSetupReducer } from '../setups/disciplinary-role/disciplinary-role.reducers';
import { positionCategorySetupReducer } from '../setups/position-category/position-category.reducers';
import { separationReasonSetupReducer } from '../setups/separation-reason/separation-reason.reducers';
import { positionSetupReducer } from '../setups/position/position.reducers';
import { designationSetupReducer } from '../setups/designation/designation.reducers';
import { gradeManagementReducer } from '../setups/grade-management/grade.reducers';
import { reInstateTransactionReducer } from '../hr-transactions/re-instate';
import { multiJobRoleTransactionReducer } from '../hr-transactions/multi-job-role/multi-job-role.reducers';
import { teamDeploymentReducer } from '../team-deployments';

import { reboardContactReducer, reboardEducationReducer, reboardBeneficiaryReducer, reboardFamilyReducer, reboardGeneralReducer, reboardIdentificationReducer, reboardPaymentReducer, reboardProfessionalQualificationsReducer, reboardWorkHistoryReducer, reboardRefereeReducer, reboardDependantsReducer, reboardGuarantorReducer, reboardProfilePictureReducer, reboardComprehensiveDataReducer } from '../my-reboard-data';
import { hrReboardContactReducer, hrReboardEducationReducer, hrReboardBeneficiaryReducer, hrReboardFamilyReducer, hrReboardGeneralReducer, hrReboardIdentificationReducer, hrReboardPaymentReducer, hrReboardProfessionalQualificationsReducer, hrReboardWorkHistoryReducer, hrReboardRefereeReducer, hrReboardDependantsReducer, hrReboardGuarantorReducer, hrReboardProfilePictureReducer, hrReboardComprehensiveDataReducer } from '../hr-reboard-data';





export const employeesProfileReducer: ActionReducerMap<IEmployeesProfileState> = {
  employeesDataHome: employeesDataHomeReducer,
  comprehensiveData: comprehensiveDataReducer,
  image: imageReducer,
  general: generalReducer,
  contact: contactReducer,
  identification: identificationReducer,
  payment: paymentReducer,
  trainingHistory: trainingHistoryReducer,
  competencyProfile: competencyProfileReducer,
  promotionHistory: promotionHistoryReducer,
  transferHistory: transferHistoryReducer,
  vacationHistory: vacationHistoryReducer,
  performanceHistory: performanceHistoryReducer,
  disciplinaryActions: disciplinaryActionReducer,
  confirmationInformation: confirmationInformationReducer,
  payrollPaymentHistory: payrollPaymentHistoryReducer,
  loanHistory: loanHistoryReducer,
  workflowTransaction: workflowTransactionReducer,
  team: teamReducer,
  separation: separationReducer,
  dependants: dependantsReducer,
  family: familyReducer,
  referees: refereeReducer,
  beneficiary: HRbeneficiaryReducer,
  guarantor:guarantorReducer,
  workHistory:HRworkHistoryReducer,
  education:educationReducer,
  professionalQualifications: professionalQualificationsReducer,
  myTeam: myTeamReducer,
  commendation: commendationReducer,
  confirmation: confirmationReducer,
  customUserGroup: customUserGroupReducer,
  promotion: promotionReducer,
  transfer: transferReducer,
  disciplinaryAction: disciplinaryActionTransReducer,
  separationTransaction: separationTransactionReducer,

  customUserGroupSetup: customUserGroupSetupReducer,
  disciplinaryActionSetup: disciplinaryActionSetupReducer,
  disciplinaryRoleSetup: disciplinaryRoleSetupReducer,
  positionCategorySetup: positionCategorySetupReducer,
  separationReasonSetup: separationReasonSetupReducer,
  positionSetup: positionSetupReducer,
  designationSetup: designationSetupReducer,
  gradeManagement: gradeManagementReducer,
  reInstateTransaction : reInstateTransactionReducer,
  multiJobRoleTransaction:multiJobRoleTransactionReducer,
  teamDeployment: teamDeploymentReducer,
  hrCustomDataForm: hrCustomDataFormReducer,


  reboardContact: reboardContactReducer,
  reboardEducation: reboardEducationReducer,
  reboardBeneficiary: reboardBeneficiaryReducer,
  reboardDependant: reboardDependantsReducer,
  reboardFamily: reboardFamilyReducer,
  reboardGeneral: reboardGeneralReducer,
  reboardGuarantor: reboardGuarantorReducer,
  reboardIdentification: reboardIdentificationReducer,
  reboardPayment: reboardPaymentReducer,
  reboardProfessionalQualification: reboardProfessionalQualificationsReducer,
  reboardProfilePicture: reboardProfilePictureReducer,
  reboardReferee: reboardRefereeReducer,
  reboardWorkHistory: reboardWorkHistoryReducer,

  hrReboardContact: hrReboardContactReducer,
  hrReboardEducation: hrReboardEducationReducer,
  hrReboardBeneficiary: hrReboardBeneficiaryReducer,
  hrReboardDependant: hrReboardDependantsReducer,
  hrReboardFamily: hrReboardFamilyReducer,
  hrReboardGeneral: hrReboardGeneralReducer,
  hrReboardGuarantor: hrReboardGuarantorReducer,
  hrReboardIdentification: hrReboardIdentificationReducer,
  hrReboardPayment: hrReboardPaymentReducer,
  hrReboardProfessionalQualification: hrReboardProfessionalQualificationsReducer,
  hrReboardProfilePicture: hrReboardProfilePictureReducer,
  hrReboardReferee: hrReboardRefereeReducer,
  hrReboardWorkHistory: hrReboardWorkHistoryReducer,
  hrReboardComprehensiveData: hrReboardComprehensiveDataReducer
};
