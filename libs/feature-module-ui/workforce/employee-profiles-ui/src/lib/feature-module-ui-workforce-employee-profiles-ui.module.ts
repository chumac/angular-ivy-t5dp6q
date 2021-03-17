import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule, DxDropDownBoxModule, DxDataGridModule,DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { SharedUiModule } from '@nutela/shared/ui';
// For MDB Angular Pro
import { AccordionModule, WavesModule } from 'ng-uikit-pro-standard'

// For Angular Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { EmployeeProfileXsCardComponent } from './com-parts/employee-profile-xs-card/employee-profile-xs-card.component';
import { TeamCardComponent } from './com-parts/team-card/team-card.component';
//changes below
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { MyPersonalDataComponent } from './components/my-personal-data/my-personal-data.component';
import { EmployeeDataPanelComponent } from './com-parts/employee-data-panel/employee-data-panel.component';
import { ReboardEmployeeDataPanelComponent } from './com-parts/reboard-employee-data-panel/reboard-employee-data-panel.component';
import { NavigationPanelComponent } from './com-parts/navigation-panel/navigation-panel.component';
import { PersonalInformationComponent } from './com-parts/employee-info-panes/personal-information/personal-information.component';
import { PersonalInformationEditorComponent } from './com-parts/employee-info-panes/personal-information/personal-information-editor/personal-information-editor.component';
import { PersonalInformationViewerComponent } from './com-parts/employee-info-panes/personal-information/personal-information-viewer/personal-information-viewer.component';
import { ProfilePictureComponent } from './com-parts/employee-info-panes/profile-picture/profile-picture.component';
import { ContactComponent } from './com-parts/employee-info-panes/contact/contact.component';
import { ContactEditorComponent } from './com-parts/employee-info-panes/contact/contact-editor/contact-editor.component';
import { ContactViewerComponent } from './com-parts/employee-info-panes/contact/contact-viewer/contact-viewer.component';
import { IdentificationComponent } from './com-parts/employee-info-panes/identification/identification.component';
import { PaymentComponent } from './com-parts/employee-info-panes/payment/payment.component';
import { EmployeeInfoRootPaneComponent } from './com-parts/employee-info-panes/employee-info-root-pane/employee-info-root-pane.component';
import { WorkHistoryComponent } from './com-parts/employee-info-panes/work-history/work-history.component';
import { EducationalHistoryComponent } from './com-parts/employee-info-panes/educational-history/educational-history.component';
import { ProfessionalQualificationsComponent } from './com-parts/employee-info-panes/professional-qualifications/professional-qualifications.component';
import { DependantsComponent } from './com-parts/employee-info-panes/dependants/dependants.component';
import { BeneficiariesComponent } from './com-parts/employee-info-panes/beneficiaries/beneficiaries.component';
import { PersonalRefereesComponent } from './com-parts/employee-info-panes/personal-referees/personal-referees.component';
import { FamilyComponent } from './com-parts/employee-info-panes/family/family.component';
import { GuarantorsComponent } from './com-parts/employee-info-panes/guarantors/guarantors.component';
import { WorkHistoryEditorComponent } from './com-parts/employee-info-panes/work-history/work-history-editor/work-history-editor.component';
import { WorkHistoryViewerComponent } from './com-parts/employee-info-panes/work-history/work-history-viewer/work-history-viewer.component';
import { IdentificationEditorComponent } from './com-parts/employee-info-panes/identification/identification-editor/identification-editor.component';
import { IdentificationViewerComponent } from './com-parts/employee-info-panes/identification/identification-viewer/identification-viewer.component';
import { PaymentEditorComponent } from './com-parts/employee-info-panes/payment/payment-editor/payment-editor.component';
import { PaymentViewerComponent } from './com-parts/employee-info-panes/payment/payment-viewer/payment-viewer.component';
import { EducationalHistoryEditorComponent } from './com-parts/employee-info-panes/educational-history/educational-history-editor/educational-history-editor.component';
import { EducationalHistoryViewerComponent } from './com-parts/employee-info-panes/educational-history/educational-history-viewer/educational-history-viewer.component';
import { ProfessionalQualificationsEditorComponent } from './com-parts/employee-info-panes/professional-qualifications/professional-qualifications-editor/professional-qualifications-editor.component';
import { ProfessionalQualificationsViewerComponent } from './com-parts/employee-info-panes/professional-qualifications/professional-qualifications-viewer/professional-qualifications-viewer.component';
import { DependantsEditorComponent } from './com-parts/employee-info-panes/dependants/dependants-editor/dependants-editor.component';
import { DependantsViewerComponent } from './com-parts/employee-info-panes/dependants/dependants-viewer/dependants-viewer.component';
import { BeneficiariesEditorComponent } from './com-parts/employee-info-panes/beneficiaries/beneficiaries-editor/beneficiaries-editor.component';
import { BeneficiariesViewerComponent } from './com-parts/employee-info-panes/beneficiaries/beneficiaries-viewer/beneficiaries-viewer.component';
import { PersonalRefereesEditorComponent } from './com-parts/employee-info-panes/personal-referees/personal-referees-editor/personal-referees-editor.component';
import { PersonalRefereesViewerComponent } from './com-parts/employee-info-panes/personal-referees/personal-referees-viewer/personal-referees-viewer.component';
import { FamilyEditorComponent } from './com-parts/employee-info-panes/family/family-editor/family-editor.component';
import { FamilyViewerComponent } from './com-parts/employee-info-panes/family/family-viewer/family-viewer.component';
import { GuarantorsEditorComponent } from './com-parts/employee-info-panes/guarantors/guarantors-editor/guarantors-editor.component';
import { GuarantorsViewerComponent } from './com-parts/employee-info-panes/guarantors/guarantors-viewer/guarantors-viewer.component';
import { ProfilePictureEditorComponent } from './com-parts/employee-info-panes/profile-picture/profile-picture-editor/profile-picture-editor.component';
import { ProfilePictureViewerComponent } from './com-parts/employee-info-panes/profile-picture/profile-picture-viewer/profile-picture-viewer.component';
import { ReboardEmployeeProfileComponent } from './components/reboard-employee-profile/reboard-employee-profile.component';
import { PeoplesComponent } from './components/people/people.component';


import { DashboardComponent } from './com-parts/hr-employee-info-panes/dashboard/dashboard.component';
import { DetailedInfoComponent } from './com-parts/hr-employee-info-panes/detailed-info/detailed-info.component';
import { SummaryViewerComponent } from './com-parts/hr-employee-info-panes/dashboard/summary-viewer/summary-viewer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { employeesProfileReducer, employeesProfileEffects } from './store/root';
import { HrNavigationPanelComponent } from './com-parts/hr-navigation-panel/hr-navigation-panel.component';
import { EmployeeRootPaneComponent } from './com-parts/hr-employee-info-panes/employee-root-pane/employee-root-pane.component';
import { HrBeneficiariesComponent } from './com-parts/hr-employee-info-panes/hr-beneficiaries/hr-beneficiaries.component';
import { HrDependantsComponent } from './com-parts/hr-employee-info-panes/hr-dependants/hr-dependants.component';
import { HrContactComponent } from './com-parts/hr-employee-info-panes/hr-contact/hr-contact.component';
import { HrGeneralInformationComponent } from './com-parts/hr-employee-info-panes/hr-general-information/hr-general-information.component';
import { HrProfilePictureComponent } from './com-parts/hr-employee-info-panes/hr-profile-picture/hr-profile-picture.component';
import { HrTrainingHistoryComponent } from './com-parts/hr-employee-info-panes/hr-training-history/hr-training-history.component';
import { HrTransferHistoryComponent } from './com-parts/hr-employee-info-panes/hr-transfer-history/hr-transfer-history.component';
import { HrVacationHistoryComponent } from './com-parts/hr-employee-info-panes/hr-vacation-history/hr-vacation-history.component';
import { HrPromotionHistoryComponent } from './com-parts/hr-employee-info-panes/hr-promotion-history/hr-promotion-history.component';
import { HrPerformanceHistoryComponent } from './com-parts/hr-employee-info-panes/hr-performance-history/hr-performance-history.component';
import { HrCompetencyProfileComponent } from './com-parts/hr-employee-info-panes/hr-competency-profile/hr-competency-profile.component';
import { HrDisciplinaryActionsComponent } from './com-parts/hr-employee-info-panes/hr-disciplinary-actions/hr-disciplinary-actions.component';
import { HrConfirmationInformationComponent } from './com-parts/hr-employee-info-panes/hr-confirmation-information/hr-confirmation-information.component';
import { HrPayrollPaymentHistoryComponent } from './com-parts/hr-employee-info-panes/hr-payroll-payment-history/hr-payroll-payment-history.component';
import { HrLoanHistoryComponent } from './com-parts/hr-employee-info-panes/hr-loan-history/hr-loan-history.component';
import { HrWorkflowTransactionComponent } from './com-parts/hr-employee-info-panes/hr-workflow-transaction/hr-workflow-transaction.component';
import { HrSeparateDataComponent } from './com-parts/hr-employee-info-panes/hr-separate-data/hr-separate-data.component';
import { HrTeamComponent } from './com-parts/hr-employee-info-panes/hr-team/hr-team.component';
import { HrProfessionalQualificationComponent } from './com-parts/hr-employee-info-panes/hr-professional-qualification/hr-professional-qualification.component';
import { HrRefereeComponent } from './com-parts/hr-employee-info-panes/hr-referee/hr-referee.component';
import { HrFamilyComponent } from './com-parts/hr-employee-info-panes/hr-family/hr-family.component';
import { HrGuarantorsComponent } from './com-parts/hr-employee-info-panes/hr-guarantors/hr-guarantors.component';
import { HrWorkHistoryComponent } from './com-parts/hr-employee-info-panes/hr-work-history/hr-work-history.component';
import { HrEducationalHistoryComponent } from './com-parts/hr-employee-info-panes/hr-educational-history/hr-educational-history.component';
import { HrIdentificationComponent } from './com-parts/hr-employee-info-panes/hr-identification/hr-identification.component';
import { HrPaymentsComponent } from './com-parts/hr-employee-info-panes/hr-payments/hr-payments.component';
import { HrBeneficiariesEditorComponent } from './com-parts/hr-employee-info-panes/hr-beneficiaries/hr-beneficiaries-editor/hr-beneficiaries-editor.component';
import { HrBeneficiariesViewerComponent } from './com-parts/hr-employee-info-panes/hr-beneficiaries/hr-beneficiaries-viewer/hr-beneficiaries-viewer.component';
import { HrCompetencyProfileViewerComponent } from './com-parts/hr-employee-info-panes/hr-competency-profile/hr-competency-profile-viewer/hr-competency-profile-viewer.component';
import { HrCompetencyProfileEditorComponent } from './com-parts/hr-employee-info-panes/hr-competency-profile/hr-competency-profile-editor/hr-competency-profile-editor.component';
import { HrConfirmationInformationEditorComponent } from './com-parts/hr-employee-info-panes/hr-confirmation-information/hr-confirmation-information-editor/hr-confirmation-information-editor.component';
import { HrConfirmationInformationViewerComponent } from './com-parts/hr-employee-info-panes/hr-confirmation-information/hr-confirmation-information-viewer/hr-confirmation-information-viewer.component';
import { HrContactViewerComponent } from './com-parts/hr-employee-info-panes/hr-contact/hr-contact-viewer/hr-contact-viewer.component';
import { HrContactEditorComponent } from './com-parts/hr-employee-info-panes/hr-contact/hr-contact-editor/hr-contact-editor.component';
import { HrDependantsEditorComponent } from './com-parts/hr-employee-info-panes/hr-dependants/hr-dependants-editor/hr-dependants-editor.component';
import { HrDependantsViewerComponent } from './com-parts/hr-employee-info-panes/hr-dependants/hr-dependants-viewer/hr-dependants-viewer.component';
import { HrDisciplinaryActionsViewerComponent } from './com-parts/hr-employee-info-panes/hr-disciplinary-actions/hr-disciplinary-actions-viewer/hr-disciplinary-actions-viewer.component';
import { HrDisciplinaryActionsEditorComponent } from './com-parts/hr-employee-info-panes/hr-disciplinary-actions/hr-disciplinary-actions-editor/hr-disciplinary-actions-editor.component';
import { HrEducationalHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-educational-history/hr-educational-history-editor/hr-educational-history-editor.component';
import { HrEducationalHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-educational-history/hr-educational-history-viewer/hr-educational-history-viewer.component';
import { HrFamilyViewerComponent } from './com-parts/hr-employee-info-panes/hr-family/hr-family-viewer/hr-family-viewer.component';
import { HrFamilyEditorComponent } from './com-parts/hr-employee-info-panes/hr-family/hr-family-editor/hr-family-editor.component';
import { HrGeneralInformationEditorComponent } from './com-parts/hr-employee-info-panes/hr-general-information/hr-general-information-editor/hr-general-information-editor.component';
import { HrGeneralInformationViewerComponent } from './com-parts/hr-employee-info-panes/hr-general-information/hr-general-information-viewer/hr-general-information-viewer.component';
import { HrGuarantorsViewerComponent } from './com-parts/hr-employee-info-panes/hr-guarantors/hr-guarantors-viewer/hr-guarantors-viewer.component';
import { HrGuarantorsEditorComponent } from './com-parts/hr-employee-info-panes/hr-guarantors/hr-guarantors-editor/hr-guarantors-editor.component';
import { HrIdentificationEditorComponent } from './com-parts/hr-employee-info-panes/hr-identification/hr-identification-editor/hr-identification-editor.component';
import { HrIdentificationViewerComponent } from './com-parts/hr-employee-info-panes/hr-identification/hr-identification-viewer/hr-identification-viewer.component';
import { HrLoanHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-loan-history/hr-loan-history-viewer/hr-loan-history-viewer.component';
import { HrLoanHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-loan-history/hr-loan-history-editor/hr-loan-history-editor.component';
import { HrPaymentsEditorComponent } from './com-parts/hr-employee-info-panes/hr-payments/hr-payments-editor/hr-payments-editor.component';
import { HrPaymentsViewerComponent } from './com-parts/hr-employee-info-panes/hr-payments/hr-payments-viewer/hr-payments-viewer.component';
import { HrPayrollPaymentHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-payroll-payment-history/hr-payroll-payment-history-viewer/hr-payroll-payment-history-viewer.component';
import { HrPayrollPaymentHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-payroll-payment-history/hr-payroll-payment-history-editor/hr-payroll-payment-history-editor.component';
import { HrPerformanceHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-performance-history/hr-performance-history-editor/hr-performance-history-editor.component';
import { HrPerformanceHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-performance-history/hr-performance-history-viewer/hr-performance-history-viewer.component';
import { HrProfessionalQualificationViewerComponent } from './com-parts/hr-employee-info-panes/hr-professional-qualification/hr-professional-qualification-viewer/hr-professional-qualification-viewer.component';
import { HrProfessionalQualificationEditorComponent } from './com-parts/hr-employee-info-panes/hr-professional-qualification/hr-professional-qualification-editor/hr-professional-qualification-editor.component';
import { HrProfilePictureEditorComponent } from './com-parts/hr-employee-info-panes/hr-profile-picture/hr-profile-picture-editor/hr-profile-picture-editor.component';
import { HrProfilePictureViewerComponent } from './com-parts/hr-employee-info-panes/hr-profile-picture/hr-profile-picture-viewer/hr-profile-picture-viewer.component';
import { HrPromotionHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-promotion-history/hr-promotion-history-viewer/hr-promotion-history-viewer.component';
import { HrPromotionHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-promotion-history/hr-promotion-history-editor/hr-promotion-history-editor.component';
import { HrRefereeEditorComponent } from './com-parts/hr-employee-info-panes/hr-referee/hr-referee-editor/hr-referee-editor.component';
import { HrRefereeViewerComponent } from './com-parts/hr-employee-info-panes/hr-referee/hr-referee-viewer/hr-referee-viewer.component';
import { HrSeparationViewerComponent } from './com-parts/hr-employee-info-panes/hr-separate-data/hr-separation-viewer/hr-separation-viewer.component';
import { HrSeparationEditorComponent } from './com-parts/hr-employee-info-panes/hr-separate-data/hr-separation-editor/hr-separation-editor.component';
import { HrTeamViewerComponent } from './com-parts/hr-employee-info-panes/hr-team/hr-team-viewer/hr-team-viewer.component';
import { HrTeamEditorComponent } from './com-parts/hr-employee-info-panes/hr-team/hr-team-editor/hr-team-editor.component';
import { HrTrainingHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-training-history/hr-training-history-editor/hr-training-history-editor.component';
import { HrTrainingHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-training-history/hr-training-history-viewer/hr-training-history-viewer.component';
import { HrTransferHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-transfer-history/hr-transfer-history-viewer/hr-transfer-history-viewer.component';
import { HrTransferHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-transfer-history/hr-transfer-history-editor/hr-transfer-history-editor.component';
import { HrVacationHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-vacation-history/hr-vacation-history-editor/hr-vacation-history-editor.component';
import { HrVacationHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-vacation-history/hr-vacation-history-viewer/hr-vacation-history-viewer.component';
import { HrWorkHistoryViewerComponent } from './com-parts/hr-employee-info-panes/hr-work-history/hr-work-history-viewer/hr-work-history-viewer.component';
import { HrWorkHistoryEditorComponent } from './com-parts/hr-employee-info-panes/hr-work-history/hr-work-history-editor/hr-work-history-editor.component';
import { HrWorkflowTransactionEditorComponent } from './com-parts/hr-employee-info-panes/hr-workflow-transaction/hr-workflow-transaction-editor/hr-workflow-transaction-editor.component';
import { HrWorkflowTransactionViewerComponent } from './com-parts/hr-employee-info-panes/hr-workflow-transaction/hr-workflow-transaction-viewer/hr-workflow-transaction-viewer.component';
import { HrTeamCardComponent } from './com-parts/hr-team-card/hr-team-card.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { PermittedGuard } from '@nutela/core';
import { PeopleViewerComponent } from './components/people/people-viewer/people-viewer.component';
import { MatDialogModule, MatMenuModule } from '@angular/material';
import { CommendationsComponent } from './components/common/hr-transactions/commendations/commendations.component';
import { ConfirmationsComponent } from './components/common/hr-transactions/confirmations/confirmations.component';
import { DisciplinaryActionsComponent } from './components/common/hr-transactions/disciplinary-actions/disciplinary-actions.component';
import { SeparationsComponent } from './components/common/hr-transactions/separations/separations.component';
import { TransfersComponent } from './components/common/hr-transactions/transfers/transfers.component';
import { TransferImportsComponent } from './components/common/hr-transactions/transfer-imports/transfer-imports.component';

import { PendingComponent, PromotionEditorComponent, SubmittedComponent } from './components/common/hr-transactions/promotions';
import { DisciplinaryActionEditorComponent } from './components/common/hr-transactions/disciplinary-actions/disciplinary-action-editor/disciplinary-action-editor.component';
import { CustomUserGroupSetupsComponent } from './components/setups/custom-user-group/custom-user-group-setups.component';
import { CustomUserGroupSetupsEditorComponent } from './components/setups/custom-user-group/custom-user-group-setups-editor/custom-user-group-setups-editor.component';
import { CustomUserGroupSetupsViewerComponent } from './components/setups/custom-user-group/custom-user-group-setups-viewer/custom-user-group-setups-viewer.component';
import { CustomUserGroupsComponent } from './components/common/hr-transactions/custom-user-groups/custom-user-groups.component';
import { CustomUserGroupsEditorComponent } from './components/common/hr-transactions/custom-user-groups/custom-user-groups-editor/custom-user-groups-editor.component';
import { CustomUserGroupsViewerComponent } from './components/common/hr-transactions/custom-user-groups/custom-user-groups-viewer/custom-user-groups-viewer.component';


import { DesignationComponent } from './components/setups/designation/designation.component';
import { DisciplinaryActionComponent } from './components/setups/disciplinary-action/disciplinary-action.component';
import { DisciplinaryRoleComponent } from './components/setups/disciplinary-role/disciplinary-role.component';
import { PositionComponent } from './components/setups/position/position.component';
import { PositionCategoryComponent } from './components/setups/position-category/position-category.component';
import { SeparationReasonComponent } from './components/setups/separation-reason/separation-reason.component';
import { SubmissionProcessEditorComponent } from './components/common/hr-transactions/promotions/pending/submission-process-editor/submission-process-editor.component';
import { DefineActionEditorComponent } from './components/setups/disciplinary-action/define-action-editor/define-action-editor.component';
import { DefineRoleEditorComponent } from './components/setups/disciplinary-role/define-role-editor/define-role-editor.component';
import { DefineDesignationEditorComponent } from './components/setups/designation/define-designation-editor/define-designation-editor.component';
import { ConfirmationsEditorComponent } from './components/common/hr-transactions/confirmations/confirmations-editor/confirmations-editor.component';
import { ConfirmationsViewerComponent } from './components/common/hr-transactions/confirmations/confirmations-viewer/confirmations-viewer.component';
import { CommendationsEditorComponent } from './components/common/hr-transactions/commendations/commendations-editor/commendations-editor.component';
import { CommendationsViewerComponent } from './components/common/hr-transactions/commendations/commendations-viewer/commendations-viewer.component';
import { SeparationEditorComponent } from './components/common/hr-transactions/separations/separation-editor/separation-editor.component';
import { SeparationViewerComponent } from './components/common/hr-transactions/separations/separation-viewer/separation-viewer.component';
import { TransferEditorComponent } from './components/common/hr-transactions/transfers/transfer-editor/transfer-editor.component';
import { SeparationReasonEditorComponent } from './components/setups/separation-reason/separation-reason-editor/separation-reason-editor.component';
import { PositionEditorComponent } from './components/setups/position/position-editor/position-editor.component';
import { PositionCategoryEditorComponent } from './components/setups/position-category/position-category-editor/position-category-editor.component';

import { PromotionViewerComponent } from './components/common/hr-transactions/promotions/promotion-viewer';
import { DisciplinaryActionViewerComponent } from './components/common/hr-transactions/disciplinary-actions/disciplinary-action-viewer';
import { PositionViewerComponent } from './components/setups/position/position-viewer/position-viewer.component';
import { TransferViewerComponent } from './components/common/hr-transactions/transfers/transfer-viewer/transfer-viewer.component';
import { GradeComponent } from './components/setups/grade/grade.component';
import { GradeEditorComponent } from './components/setups/grade/grade-editor/grade-editor.component';
import { ReInstateComponent } from './components/common/hr-transactions/re-instate/re-instate.component';
import { ReInstateEditorComponent } from './components/common/hr-transactions/re-instate/re-instate-editor/re-instate-editor.component';
import { TransferTreeComponent } from './components/common/hr-transactions/transfers/transfer-tree/transfer-tree.component';
import { MultiJobRolesComponent } from './components/common/hr-transactions/multi-job-roles/multi-job-roles.component';
import { MultiJobRolesEditorComponent } from './components/common/hr-transactions/multi-job-roles/multi-job-roles-editor/multi-job-roles-editor.component';
import { TeamDeploymentComponent } from './components/common/team-deployment/team-deployment.component';
import { TeamDeploymentEditorComponent } from './components/common/team-deployment/team-deployment-editor/team-deployment-editor.component';
import { TeamDeploymentViewerComponent } from './components/common/team-deployment/team-deployment-viewer/team-deployment-viewer.component';
import { MyReboardDataComponent } from './components/my-reboard-data/my-reboard-data.component';
import { HrReboardDataComponent } from './components/hr-reboard-data/hr-reboard-data.component';
import { ReboardGuard } from 'libs/core/src/lib/guards/reboard.guard';
import { ReboardInfoRootPaneComponent } from './com-parts/reboard-employee-info-panes/reboard-info-root-pane/reboard-info-root-pane.component';
import { HrReboardInfoRootPaneComponent } from './com-parts/hr-reboard-employee-info-panes/hr-reboard-info-root-pane/hr-reboard-info-root-pane.component';
import { ReboardNavigationPanelComponent } from './com-parts/reboard-navigation-panel/reboard-navigation-panel.component';
import { HrReboardNavigationPanelComponent } from './com-parts/hr-reboard-navigation-panel/hr-reboard-navigation-panel.component';
import { ReboardWorkHistoryComponent, ReboardWorkHistoryEditorComponent, ReboardWorkHistoryViewerComponent, ReboardRefereesComponent, ReboardRefereesEditorComponent, ReboardRefereesViewerComponent, ReboardProfilePictureComponent, ReboardProfilePictureEditorComponent, ReboardProfilePictureViewerComponent, ReboardProQualificationsComponent, ReboardProQualificationsEditorComponent, ReboardProQualificationsViewerComponent, ReboardPersonalInfoComponent, ReboardPersonalInfoEditorComponent, ReboardPersonalInfoViewerComponent, ReboardPaymentComponent, ReboardPaymentEditorComponent, ReboardPaymentViewerComponent, ReboardIdentificationComponent, ReboardIdentificationEditorComponent, ReboardIdentificationViewerComponent, ReboardGuarantorsComponent, ReboardGuarantorsEditorComponent, ReboardGuarantorsViewerComponent, ReboardFamilyComponent, ReboardFamilyEditorComponent, ReboardFamilyViewerComponent, ReboardEduHistoryComponent, ReboardEduHistoryEditorComponent, ReboardEduHistoryViewerComponent, ReboardDependantsComponent, ReboardDependantsEditorComponent, ReboardDependantsViewerComponent, ReboardContactComponent, ReboardContactViewerComponent, ReboardContactEditorComponent, ReboardBeneficiariesComponent, ReboardBeneficiariesEditorComponent, ReboardBeneficiariesViewerComponent } from './com-parts/reboard-employee-info-panes';
import { HrReboardWorkHistoryComponent, HrReboardWorkHistoryEditorComponent, HrReboardWorkHistoryViewerComponent, HrReboardRefereesComponent, HrReboardRefereesEditorComponent, HrReboardRefereesViewerComponent, HrReboardProfilePictureComponent, HrReboardProfilePictureEditorComponent, HrReboardProfilePictureViewerComponent, HrReboardProQualificationsComponent, HrReboardProQualificationsEditorComponent, HrReboardProQualificationsViewerComponent, HrReboardPersonalInfoComponent, HrReboardPersonalInfoEditorComponent, HrReboardPersonalInfoViewerComponent, HrReboardPaymentComponent, HrReboardPaymentEditorComponent, HrReboardPaymentViewerComponent, HrReboardIdentificationComponent, HrReboardIdentificationEditorComponent, HrReboardIdentificationViewerComponent, HrReboardGuarantorsComponent, HrReboardGuarantorsEditorComponent, HrReboardGuarantorsViewerComponent, HrReboardFamilyComponent, HrReboardFamilyEditorComponent, HrReboardFamilyViewerComponent, HrReboardEduHistoryComponent, HrReboardEduHistoryEditorComponent, HrReboardEduHistoryViewerComponent, HrReboardDependantsComponent, HrReboardDependantsEditorComponent, HrReboardDependantsViewerComponent, HrReboardContactComponent, HrReboardContactViewerComponent, HrReboardContactEditorComponent, HrReboardBeneficiariesComponent, HrReboardBeneficiariesEditorComponent, HrReboardBeneficiariesViewerComponent } from './com-parts/hr-reboard-employee-info-panes';
import { FeatureModuleUiApprovalsUiModule } from '@nutela/feature-module-ui/approvals-ui';

import { CustomDataFormsComponent } from './com-parts/employee-info-panes/custom-data-form/custom-data-forms.component';
import { CustomDataFormsEditorComponent } from './com-parts/employee-info-panes/custom-data-form/custom-data-forms-editor/custom-data-forms-editor.component';
import { CustomDataFormsViewerComponent } from './com-parts/employee-info-panes/custom-data-form/custom-data-forms-viewer/custom-data-forms-viewer.component';
import { HrCustomDataFormsComponent } from './com-parts/hr-employee-info-panes/hr-custom-data-form/hr-custom-data-forms.component';
import { HrCustomDataFormsEditorComponent } from './com-parts/hr-employee-info-panes/hr-custom-data-form/hr-custom-data-forms-editor/hr-custom-data-forms-editor.component';
import { HrCustomDataFormsViewerComponent } from './com-parts/hr-employee-info-panes/hr-custom-data-form/hr-custom-data-forms-viewer/hr-custom-data-forms-viewer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FeatureModuleUiWorkforceProcessesUiModule } from '@nutela/feature-module-ui/workforce/processes-ui';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-data',
        component: MyPersonalDataComponent,
        canActivate: [ReboardGuard],
        data: { state: 'myData', breadcrumb: 'My Data', reboard: false }
      },
      {
        path: 'my-reboarding',
        component: MyReboardDataComponent,
        data: { state: 'myReboard', breadcrumb: 'My Reboarding Data', reboard: true },
      },
      {
        path: 'my-team',
        component: MyTeamComponent,
        data: { state: 'myTeam', breadcrumb: 'My Team' }
      },
      {
        path: 'people',
        component: PeoplesComponent,
        data: { state: 'people', breadcrumb: 'People' }
      },
      {
        path: 'team-deployment',
        component: TeamDeploymentComponent,
        data: { state: 'team-deployment', breadcrumb: 'team-deployment' }
      }
    ],
  },
  {
    path: 'admin', data: { role: 'HR_ADMINISTRATION', breadcrumb: 'HR Admin' },
    // path: 'admin', data: { role: 'HR_ADMINISTRATION', breadcrumb: 'My Data' }, canActivateChild: [PermittedGuard],
    children: [
      {
        path: 'employees',
        component: EmployeeProfileComponent,
        data: { state: 'employee-profiles', breadcrumb: 'Employees' }
      },
      {
        path: 'employee-details/:employeeId',
        component: DetailedInfoComponent,
        data: {
          breadcrumb: { alias: 'employeeName'}
        }
      },
      {
        path: 'reboarding',
        component: ReboardEmployeeProfileComponent,
        data: {
          breadcrumb: { alias: 'employeeName'}
        }
      },
      {
        path: 'reboard-details/:employeeId',
        component: HrReboardDataComponent,
        data: {
          breadcrumb: { alias: 'employeeName'}
        }
      },
      {
        path: 'separations',
        component: SeparationsComponent,
        data: { state: 'separations', breadcrumb: 'Separations' }
      },
      {
        path: 'reInstate',
        component: ReInstateComponent,
        data: { state: 'reInstate', breadcrumb: 'Re Instatement' }
      },
      {
        path: 'transfers',
        component: TransfersComponent,
        data: { state: 'transfers', breadcrumb: 'Transfers' }
      },
      {
        path: 'transfers/:name',
        component: TransferImportsComponent,
        data: { state: 'transfers', breadcrumb: { alias: 'transferName'} }
      },
      {
        path: 'promotions',
        component: PendingComponent,
        data: { state: 'promotions', breadcrumb: 'Promotions' }
      },
      {
        path: 'promotions/:name',
        component: SubmittedComponent,
        data: { state: 'promotions', breadcrumb: 'promotionName' }
      },
      {
        path: 'disciplinary-actions',
        component: DisciplinaryActionsComponent,
        data: { state: 'disciplinary-actions', breadcrumb: 'Disciplinary Actions' }
      },
      {
        path: 'commendations',
        component: CommendationsComponent,
        data: { state: 'commendations', breadcrumb: 'Commendations' }
      },
      {
        path: 'confirmations',
        component: ConfirmationsComponent,
        data: { state: 'confirmations', breadcrumb: 'Confirmations' }
      },
      {
        path: 'custom-staff-group',
        component: CustomUserGroupsComponent,
        data: { state: 'custom-staff-group', breadcrumb: 'Custom Staff Group' }
      },
      {
        path: 'custom-user-group',
        component: CustomUserGroupSetupsComponent,
        data: { state: 'custom-user-group', breadcrumb: 'Custom User Group' }
      },
      {
        path: 'designation',
        component: DesignationComponent,
        data: { state: 'designation', breadcrumb: 'Designation' }
      },
      {
        path: 'disciplinary-action',
        component: DisciplinaryActionComponent,
        data: { state: 'disciplinary-action', breadcrumb: 'Disciplinary Action' }
      },
      {
        path: 'disciplinary-role',
        component: DisciplinaryRoleComponent,
        data: { state: 'disciplinary-role', breadcrumb: 'Disciplinary Role' }
      },
      {
        path: 'position',
        component: PositionComponent,
        data: { state: 'position', breadcrumb: 'Positions' }
      },
      {
        path: 'position-category',
        component: PositionCategoryComponent,
        data: { state: 'position-category', breadcrumb: 'Position Category' }
      },
      {
        path: 'separation-reason',
        component: SeparationReasonComponent,
        data: { state: 'separation-reason', breadcrumb: 'Separation Reason' }
      },
      {
        path: 'grade-management',
        component: GradeComponent,
        data: { state: 'grade-management', breadcrumb: 'Grade Management' }
      },
      {
        path: 'multi-job-roles',
        component: MultiJobRolesComponent,
        data: { state: 'multi-job-roles' }
      }
    ]
  },
  // {
  //   path: 'admin', data: { role: 'HR_TRANSACTIONS', breadcrumb: 'My Data' }, canActivateChild: [],
  //   children: [
  //     {
  //       path: 'seperation-transaction',
  //       component: SeperationTransactionComponent,
  //       data: { state: 'seperation-transaction', breadcrumb: 'My Data' }
  //     },
  //     {
  //       path: 'transfer-transaction',
  //       component: TransferTransactionComponent,
  //       data: { state: 'transfer-transaction', breadcrumb: 'My Data' }
  //     },
  //     {
  //       path: 'promotion-transaction',
  //       component: PromotionTransactionComponent,
  //       data: { state: 'promotion-transaction', breadcrumb: 'My Data' }
  //     },
  //     {
  //       path: 'disciplinary-actions-transaction',
  //       component: DisciplinaryActionsTransactionComponent,
  //       data: { state: 'disciplinary-actions-transaction', breadcrumb: 'My Data' }
  //     },
  //     {
  //       path: 'commendation-transaction',
  //       component: CommendationTransactionComponent,
  //       data: { state: 'commendation-transaction', breadcrumb: 'My Data' }
  //     },
  //     {
  //       path: 'confirmation-transaction',
  //       component: ConfirmationTransactionComponent,
  //       data: { state: 'confirmation-transaction' }
  //     }
  //   ]
  // }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxLookupModule,
    AccordionModule,
    WavesModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    // InfiniteScrollModule,
    MatDialogModule,
    MatMenuModule,
    MDBBootstrapModulesPro.forRoot(),
    IgxGridModule.forRoot(),
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
    SharedUiModule,
    SharedAppGlobalModule,
    FeatureModuleUiApprovalsUiModule,
    FeatureModuleUiWorkforceProcessesUiModule,
    StoreModule.forFeature('employeesProfile', employeesProfileReducer),
    EffectsModule.forRoot(employeesProfileEffects),
    RouterModule.forChild(routes),
    Ng2SearchPipeModule
  ],
  declarations: [
    TeamCardComponent,
    EmployeeProfileXsCardComponent,
    MyPersonalDataComponent,
    EmployeeDataPanelComponent,
    NavigationPanelComponent,
    PersonalInformationComponent,
    ProfilePictureComponent,
    ContactComponent,
    IdentificationComponent,
    PaymentComponent,
    EmployeeInfoRootPaneComponent,
    WorkHistoryComponent,
    EducationalHistoryComponent,
    ProfessionalQualificationsComponent,
    DependantsComponent,
    BeneficiariesComponent,
    PersonalRefereesComponent,
    FamilyComponent,
    GuarantorsComponent,
    CustomDataFormsComponent,
    PersonalInformationEditorComponent,
    PersonalInformationViewerComponent,
    ContactEditorComponent,
    ContactViewerComponent,
    WorkHistoryEditorComponent,
    WorkHistoryViewerComponent,
    IdentificationEditorComponent,
    IdentificationViewerComponent,
    PaymentEditorComponent,
    PaymentViewerComponent,
    EducationalHistoryEditorComponent,
    EducationalHistoryViewerComponent,
    ProfessionalQualificationsEditorComponent,
    ProfessionalQualificationsViewerComponent,
    DependantsEditorComponent,
    DependantsViewerComponent,
    BeneficiariesEditorComponent,
    BeneficiariesViewerComponent,
    PersonalRefereesEditorComponent,
    PersonalRefereesViewerComponent,
    FamilyEditorComponent,
    FamilyViewerComponent,
    GuarantorsEditorComponent,
    GuarantorsViewerComponent,
    CustomDataFormsEditorComponent,
    CustomDataFormsViewerComponent,
    ProfilePictureEditorComponent,
    ProfilePictureViewerComponent,
    ReboardEmployeeProfileComponent,
    PeoplesComponent,

    ReboardInfoRootPaneComponent,
    ReboardEmployeeDataPanelComponent,
    ReboardNavigationPanelComponent,
    ReboardWorkHistoryComponent,
    ReboardWorkHistoryEditorComponent,
    ReboardWorkHistoryViewerComponent,
    ReboardEduHistoryComponent,
    ReboardEduHistoryEditorComponent,
    ReboardEduHistoryViewerComponent,
    ReboardRefereesComponent,
    ReboardRefereesEditorComponent,
    ReboardRefereesViewerComponent,
    ReboardProfilePictureComponent,
    ReboardProfilePictureEditorComponent,
    ReboardProfilePictureViewerComponent,
    ReboardProQualificationsComponent,
    ReboardProQualificationsEditorComponent,
    ReboardProQualificationsViewerComponent,
    ReboardPersonalInfoComponent,
    ReboardPersonalInfoEditorComponent,
    ReboardPersonalInfoViewerComponent,
    ReboardPaymentComponent,
    ReboardPaymentEditorComponent,
    ReboardPaymentViewerComponent,
    ReboardIdentificationComponent,
    ReboardIdentificationEditorComponent,
    ReboardIdentificationViewerComponent,
    ReboardGuarantorsComponent,
    ReboardGuarantorsEditorComponent,
    ReboardGuarantorsViewerComponent,
    ReboardFamilyComponent,
    ReboardFamilyEditorComponent,
    ReboardFamilyViewerComponent,
    ReboardDependantsComponent,
    ReboardDependantsEditorComponent,
    ReboardDependantsViewerComponent,
    ReboardContactComponent,
    ReboardContactEditorComponent,
    ReboardContactViewerComponent,
    ReboardBeneficiariesComponent,
    ReboardBeneficiariesEditorComponent,
    ReboardBeneficiariesViewerComponent,

    HrReboardInfoRootPaneComponent,
    HrReboardDataComponent,
    HrReboardNavigationPanelComponent,
    HrReboardWorkHistoryComponent,
    HrReboardWorkHistoryEditorComponent,
    HrReboardWorkHistoryViewerComponent,
    HrReboardEduHistoryComponent,
    HrReboardEduHistoryEditorComponent,
    HrReboardEduHistoryViewerComponent,
    HrReboardRefereesComponent,
    HrReboardRefereesEditorComponent,
    HrReboardRefereesViewerComponent,
    HrReboardProfilePictureComponent,
    HrReboardProfilePictureEditorComponent,
    HrReboardProfilePictureViewerComponent,
    HrReboardProQualificationsComponent,
    HrReboardProQualificationsEditorComponent,
    HrReboardProQualificationsViewerComponent,
    HrReboardPersonalInfoComponent,
    HrReboardPersonalInfoEditorComponent,
    HrReboardPersonalInfoViewerComponent,
    HrReboardPaymentComponent,
    HrReboardPaymentEditorComponent,
    HrReboardPaymentViewerComponent,
    HrReboardIdentificationComponent,
    HrReboardIdentificationEditorComponent,
    HrReboardIdentificationViewerComponent,
    HrReboardGuarantorsComponent,
    HrReboardGuarantorsEditorComponent,
    HrReboardGuarantorsViewerComponent,
    HrReboardFamilyComponent,
    HrReboardFamilyEditorComponent,
    HrReboardFamilyViewerComponent,
    HrReboardDependantsComponent,
    HrReboardDependantsEditorComponent,
    HrReboardDependantsViewerComponent,
    HrReboardContactComponent,
    HrReboardContactEditorComponent,
    HrReboardContactViewerComponent,
    HrReboardBeneficiariesComponent,
    HrReboardBeneficiariesEditorComponent,
    HrReboardBeneficiariesViewerComponent,

    //changes below
    DashboardComponent,
    DetailedInfoComponent,
    SummaryViewerComponent,
    HrNavigationPanelComponent,
    EmployeeRootPaneComponent,
    HrBeneficiariesComponent,
    HrDependantsComponent,
    HrContactComponent,
    HrGeneralInformationComponent,
    HrProfilePictureComponent,
    HrTrainingHistoryComponent,
    HrTransferHistoryComponent,
    HrVacationHistoryComponent,
    HrPromotionHistoryComponent,
    HrPerformanceHistoryComponent,
    HrCompetencyProfileComponent,
    HrDisciplinaryActionsComponent,
    HrConfirmationInformationComponent,
    HrPayrollPaymentHistoryComponent,
    HrLoanHistoryComponent,
    HrWorkflowTransactionComponent,
    HrSeparateDataComponent,
    HrTeamComponent,
    HrProfessionalQualificationComponent,
    HrRefereeComponent,
    HrFamilyComponent,
    HrGuarantorsComponent,
    HrWorkHistoryComponent,
    HrEducationalHistoryComponent,
    HrIdentificationComponent,
    HrPaymentsComponent,
    HrBeneficiariesEditorComponent,
    HrBeneficiariesViewerComponent,
    HrCompetencyProfileViewerComponent,
    HrCompetencyProfileEditorComponent,
    HrConfirmationInformationEditorComponent,
    HrConfirmationInformationViewerComponent,
    HrContactViewerComponent,
    HrContactEditorComponent,
    HrDependantsEditorComponent,
    HrDependantsViewerComponent,
    HrDisciplinaryActionsViewerComponent,
    HrDisciplinaryActionsEditorComponent,
    HrEducationalHistoryEditorComponent,
    HrEducationalHistoryViewerComponent,
    HrFamilyViewerComponent,
    HrFamilyEditorComponent,
    HrGeneralInformationEditorComponent,
    HrGeneralInformationViewerComponent,
    HrGuarantorsViewerComponent,
    HrGuarantorsEditorComponent,
    HrIdentificationEditorComponent,
    HrIdentificationViewerComponent,
    HrLoanHistoryViewerComponent,
    HrLoanHistoryEditorComponent,
    HrPaymentsEditorComponent,
    HrPaymentsViewerComponent,
    HrPayrollPaymentHistoryViewerComponent,
    HrPayrollPaymentHistoryEditorComponent,
    HrPerformanceHistoryEditorComponent,
    HrPerformanceHistoryViewerComponent,
    HrProfessionalQualificationViewerComponent,
    HrProfessionalQualificationEditorComponent,
    HrProfilePictureEditorComponent,
    HrProfilePictureViewerComponent,
    HrPromotionHistoryViewerComponent,
    HrPromotionHistoryEditorComponent,
    HrRefereeEditorComponent,
    HrRefereeViewerComponent,
    HrSeparationViewerComponent,
    HrSeparationEditorComponent,
    HrTeamViewerComponent,
    HrTeamEditorComponent,
    HrTrainingHistoryEditorComponent,
    HrTrainingHistoryViewerComponent,
    HrTransferHistoryViewerComponent,
    HrTransferHistoryEditorComponent,
    HrVacationHistoryEditorComponent,
    HrVacationHistoryViewerComponent,
    HrWorkHistoryViewerComponent,
    HrWorkHistoryEditorComponent,
    HrWorkflowTransactionEditorComponent,
    HrWorkflowTransactionViewerComponent,
    HrTeamCardComponent,
    HrCustomDataFormsComponent,
    HrCustomDataFormsEditorComponent,
    HrCustomDataFormsViewerComponent,
    EmployeeProfileComponent,
    MyTeamComponent,
    PeopleViewerComponent,
    CommendationsComponent,
    ConfirmationsComponent,
    DisciplinaryActionsComponent,
    PendingComponent,
    PromotionEditorComponent,
    SeparationsComponent,
    TransfersComponent,
    TransferImportsComponent,
    SubmittedComponent,
    DisciplinaryActionEditorComponent,
    CustomUserGroupSetupsComponent,
    CustomUserGroupSetupsEditorComponent,
    CustomUserGroupSetupsViewerComponent,
    CustomUserGroupsComponent,
    CustomUserGroupsEditorComponent,
    CustomUserGroupsViewerComponent,
    DesignationComponent,
    DisciplinaryActionComponent,
    DisciplinaryRoleComponent,
    PositionComponent,
    PositionCategoryComponent,
    SeparationReasonComponent,
    SubmissionProcessEditorComponent,
    DefineActionEditorComponent,
    DefineRoleEditorComponent,
    DefineDesignationEditorComponent,
    ConfirmationsEditorComponent,
    ConfirmationsViewerComponent,
    CommendationsEditorComponent,
    CommendationsViewerComponent,
    SeparationEditorComponent,
    SeparationViewerComponent,
    TransferEditorComponent,
    SeparationReasonEditorComponent,
    PositionEditorComponent,
    PositionCategoryEditorComponent,
    PromotionViewerComponent,
    DisciplinaryActionViewerComponent,
    PositionViewerComponent,
    TransferViewerComponent,
    GradeComponent,
    GradeEditorComponent,
    ReInstateComponent,
    ReInstateEditorComponent,
    TransferTreeComponent,
    MultiJobRolesComponent,
    MultiJobRolesEditorComponent,
    TeamDeploymentComponent,
    TeamDeploymentEditorComponent,
    TeamDeploymentViewerComponent,
    MyReboardDataComponent
  ],
  entryComponents: [PeopleViewerComponent],
  providers: [],
  exports: [
    TeamCardComponent,
    EmployeeProfileXsCardComponent,
    MyPersonalDataComponent,
    EmployeeDataPanelComponent,
    DetailedInfoComponent,
    SeparationEditorComponent,
    CustomDataFormsEditorComponent
  ]
})
export class FeatureModuleUiWorkforceEmployeeProfilesUiModule { }
