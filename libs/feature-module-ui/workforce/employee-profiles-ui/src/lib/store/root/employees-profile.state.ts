import { IEmployeesDataHomeState } from "../employees-data-home";
import { createFeatureSelector } from "@ngrx/store";
import { IComprehensiveDataState, IImageState, IGeneralState, IContactState,
         IIdentificationState, ITrainingHistoryState, ICompetencyProfileState,
         IPromotionHistoryState, ITransferHistoryState, IVacationHistoryState,
         IPerformanceHistoryState, IDisciplinaryActionState, IConfirmationInformationState,
         IPayrollPaymentHistoryState, ILoanHistoryState, ITeamState, ISeparationState,
         IPaymentState, IDependantState,IFamilyState, IRefereeState, IHRBeneficiaryState, IGuarantorState,
         IHRWorkHistoryState, IEducationState, IProfessionalQualificationsState, IHrCustomDataFormState} from "../employee-detailed-area";
import { IWorkflowTransactionState } from "../employee-detailed-area/workflow-transaction";
import { IMyTeamState } from "../my-team";

import { ICommendationState } from "../hr-transactions/commendation";
import { IConfirmationState } from "../hr-transactions/confirmation";
import { ICustomUserGroupState } from "../hr-transactions/custom-user-group";
import { IPromotionState } from "../hr-transactions/promotion";
import { ITransferState } from "../hr-transactions/transfer";
import { IDisciplinaryActionsState } from "../hr-transactions/disciplinary-action";
import { ISeparationTransactionState } from "../hr-transactions/separation";

import { ICustomUserGroupSetupState } from "../setups/custom-user-group/custom-user-group.state";
import { IDisciplinaryActionSetupState } from "../setups/disciplinary-action/disciplinary-action.state";
import { IDisciplinaryRoleSetupState } from "../setups/disciplinary-role/disciplinary-role.state";
import { IPositionCategorySetupState } from "../setups/position-category/position-category.state";
import { ISeparationReasonSetupState } from "../setups/separation-reason/separation-reason.state";
import { IPositionSetupState } from "../setups/position/position.state";
import { IDesignationSetupState } from "../setups/designation/designation.state";
import { IGradeManagementState } from "../setups/grade-management";
import { IReInstateTransactionState } from "../hr-transactions/re-instate";
import { IMultiJobRoleTransactionState } from "../hr-transactions/multi-job-role/multi-job-role.state";
import { ITeamDeploymentState } from "../team-deployments";
import { IReboardContactState, IReboardEducationState, IReboardBeneficiaryState, IReboardFamilyState, IReboardDependantState, IReboardGeneralState, IReboardGuarantorState, IReboardIdentificationState, IReboardPaymentState, IReboardProfessionalQualificationsState, IReboardProfilePictureState, IReboardRefereeState, IReboardWorkHistoryState } from "../my-reboard-data";
import { IHrReboardContactState, IHrReboardEducationState, IHrReboardBeneficiaryState, IHrReboardFamilyState, IHrReboardDependantState, IHrReboardGeneralState, IHrReboardGuarantorState, IHrReboardIdentificationState, IHrReboardPaymentState, IHrReboardProfessionalQualificationsState, IHrReboardProfilePictureState, IHrReboardRefereeState, IHrReboardWorkHistoryState, IHrReboardComprehensiveDataState } from "../hr-reboard-data";



export const getEmployeesProfileState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');

export interface IEmployeesProfileState {
  employeesDataHome: IEmployeesDataHomeState,
  comprehensiveData: IComprehensiveDataState,
  image: IImageState,
  general: IGeneralState,
  contact: IContactState,
  identification: IIdentificationState,
  payment: IPaymentState
  trainingHistory: ITrainingHistoryState,
  competencyProfile: ICompetencyProfileState,
  promotionHistory: IPromotionHistoryState,
  transferHistory: ITransferHistoryState,
  vacationHistory: IVacationHistoryState,
  performanceHistory: IPerformanceHistoryState,
  disciplinaryActions: IDisciplinaryActionState,
  confirmationInformation: IConfirmationInformationState,
  payrollPaymentHistory: IPayrollPaymentHistoryState,
  loanHistory: ILoanHistoryState,
  workflowTransaction: IWorkflowTransactionState,
  team: ITeamState,
  separation: ISeparationState,
  dependants: IDependantState,
  family: IFamilyState
  referees: IRefereeState,
  beneficiary: IHRBeneficiaryState,
  guarantor: IGuarantorState,
  workHistory: IHRWorkHistoryState,
  education: IEducationState,
  professionalQualifications: IProfessionalQualificationsState,
  myTeam: IMyTeamState,
  commendation: ICommendationState,
  confirmation: IConfirmationState,
  customUserGroup: ICustomUserGroupState,
  promotion: IPromotionState,
  transfer: ITransferState,
  disciplinaryAction: IDisciplinaryActionsState,
  separationTransaction: ISeparationTransactionState,

  customUserGroupSetup: ICustomUserGroupSetupState,
  disciplinaryActionSetup: IDisciplinaryActionSetupState,
  disciplinaryRoleSetup: IDisciplinaryRoleSetupState,
  positionCategorySetup: IPositionCategorySetupState,
  separationReasonSetup: ISeparationReasonSetupState,
  positionSetup: IPositionSetupState,
  designationSetup: IDesignationSetupState,
  gradeManagement: IGradeManagementState,
  reInstateTransaction: IReInstateTransactionState,
  multiJobRoleTransaction:IMultiJobRoleTransactionState,
  teamDeployment: ITeamDeploymentState,
  hrCustomDataForm: IHrCustomDataFormState,

  reboardContact: IReboardContactState,
  reboardEducation: IReboardEducationState,
  reboardBeneficiary: IReboardBeneficiaryState,
  reboardDependant: IReboardDependantState,
  reboardFamily: IReboardFamilyState,
  reboardGeneral: IReboardGeneralState,
  reboardGuarantor: IReboardGuarantorState,
  reboardIdentification: IReboardIdentificationState,
  reboardPayment: IReboardPaymentState,
  reboardProfessionalQualification: IReboardProfessionalQualificationsState,
  reboardProfilePicture: IReboardProfilePictureState,
  reboardReferee: IReboardRefereeState,
  reboardWorkHistory: IReboardWorkHistoryState,

  hrReboardComprehensiveData: IHrReboardComprehensiveDataState,
  hrReboardContact: IHrReboardContactState,
  hrReboardEducation: IHrReboardEducationState,
  hrReboardBeneficiary: IHrReboardBeneficiaryState,
  hrReboardDependant: IHrReboardDependantState,
  hrReboardFamily: IHrReboardFamilyState,
  hrReboardGeneral: IHrReboardGeneralState,
  hrReboardGuarantor: IHrReboardGuarantorState,
  hrReboardIdentification: IHrReboardIdentificationState,
  hrReboardPayment: IHrReboardPaymentState,
  hrReboardProfessionalQualification: IHrReboardProfessionalQualificationsState,
  hrReboardProfilePicture: IHrReboardProfilePictureState,
  hrReboardReferee: IHrReboardRefereeState,
  hrReboardWorkHistory: IHrReboardWorkHistoryState
}

export const initialState: IEmployeesProfileState = {
  employeesDataHome: null,
  comprehensiveData: null,
  image: null,
  general: null,
  contact: null,
  identification: null,
  payment: null,
  trainingHistory: null,
  competencyProfile: null,
  promotionHistory: null,
  transferHistory: null,
  vacationHistory: null,
  performanceHistory: null,
  disciplinaryActions: null,
  confirmationInformation: null,
  payrollPaymentHistory: null,
  loanHistory: null,
  workflowTransaction: null,
  team: null,
  separation: null,
  dependants:null,
  family:null,
  referees:null,
  beneficiary:null,
  guarantor:null,
  workHistory:null,
  education:null,
  professionalQualifications: null,
  myTeam: null,
  commendation: null,
  confirmation: null,
  customUserGroup: null,
  promotion:null,
  transfer: null,
  disciplinaryAction: null,
  separationTransaction: null,

  customUserGroupSetup: null,
  disciplinaryActionSetup: null,
  disciplinaryRoleSetup: null,
  positionCategorySetup: null,
  separationReasonSetup: null,
  positionSetup: null,
  designationSetup: null,
  gradeManagement: null,
  reInstateTransaction: null,
  multiJobRoleTransaction:null,
  teamDeployment: null,
  hrCustomDataForm: null,


  reboardContact: null,
  reboardEducation: null,
  reboardBeneficiary: null,
  reboardDependant: null,
  reboardFamily: null,
  reboardGeneral: null,
  reboardGuarantor: null,
  reboardIdentification: null,
  reboardPayment: null,
  reboardProfessionalQualification: null,
  reboardProfilePicture: null,
  reboardReferee: null,
  reboardWorkHistory: null,

  hrReboardComprehensiveData: null,
  hrReboardContact: null,
  hrReboardEducation: null,
  hrReboardBeneficiary: null,
  hrReboardDependant: null,
  hrReboardFamily: null,
  hrReboardGeneral: null,
  hrReboardGuarantor: null,
  hrReboardIdentification: null,
  hrReboardPayment: null,
  hrReboardProfessionalQualification: null,
  hrReboardProfilePicture: null,
  hrReboardReferee: null,
  hrReboardWorkHistory: null,
}
