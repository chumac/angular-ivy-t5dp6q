import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


import { SharedAppGlobalModule, EllipsisPipe } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { performanceEffects, performanceReducers } from './store/root';
import { TargetType, VisibilityType, StringLimitPipe, PerspectiveType, RoleType, StepType, EligibilityRuleType, ValueTransform, BoolDisplay } from './pipes';

import { ManageReviewComponent } from './components/reviews/manage-review/manage-review.component';
import { ReviewStatusComponent } from './components/reviews/review-status/review-status.component';
import { OmiPanelComponent } from './com-parts/omi-panel/omi-panel.component';

import { ReviewStatusResolver } from './components/Reviews/review-status/review-status.resolver';
import { AppraisalFormsResolver } from './components/Reviews/appraisal-forms/appraisal-forms.resolver';

import { AppraisalFormsComponent } from './components/reviews/appraisal-forms/appraisal-forms.component';
import { PageNavigatorComponent } from './com-parts/page-navigator/page-navigator.component';
import { ContractPageComponent } from './com-parts/review-page-types/contract-page/contract-page.component';
import { KpiPageComponent } from './com-parts/review-page-types/kpi-page/kpi-page.component';
import { RatingPageComponent } from './com-parts/review-page-types/rating-page/rating-page.component';
import { ThreeSixtyRatingPageComponent } from './com-parts/review-page-types/three-sixty-rating-page/three-sixty-rating-page.component';
import { CustomPageComponent } from './com-parts/review-page-types/custom-page/custom-page.component';
import { CompetencyPageComponent } from './com-parts/review-page-types/competency-page/competency-page.component';
import { SubscriptionPageComponent } from './com-parts/review-page-types/subscription-page/subscription-page.component';
import { KpiRowTemplateComponent } from './com-parts/page-row-templates/kpi-row-template/kpi-row-template.component';
import { RatingRowTemplateComponent } from './com-parts/page-row-templates/rating-row-template/rating-row-template.component';

import {
  LoadObjectivesComponent,
  ManageObjectivesComponent,
  ProgressReportComponent,
  MultiEmployeeLoadObjectivesComponent,
  SingleEmployeeLoadObjectivesComponent,
  LibraryLoadObjectivesComponent,
  ObjectiveApprovalComponent,
} from './components/planning';
import {
  ObjectiveEditorComponent,
  ObjectiveViewerComponent,
  ObjectiveRecallComponent,
  ObjectiveMasterEditorComponent,
  ObjectiveMasterViewerComponent,
  MultiEmployeeLoadObjectivesEditorComponent,
  MultiEmployeeLoadObjectivesViewerComponent,
  ProgressDefinitionEditorComponent,
  ProgressTransactionEditorComponent,
  SingleEmployeeLoadObjectivesViewerComponent,
  SingleEmployeeLoadObjectivesEditorComponent,
  LibraryLoadObjectivesEditorComponent,
  LibraryLoadObjectivesViewerComponent
} from './components/common';

import {
  PlansComponent,
  PlansEditorComponent,
  PlansViewerComponent,
  PerspectivesComponent,
  PerspectivesEditorComponent,
  PerspectivesViewerComponent,
  ObjectivesComponent,
  ObjectivesEditorComponent,
  ObjectivesViewerComponent,
  PlanOptionsComponent,
  PlanOptionsEditorComponent,
  PlanOptionsViewerComponent,
  WorkflowStepsComponent,
  WorkflowStepsEditorComponent,
  WorkflowStepsViewerComponent,
  WorkflowDefinitionsComponent,
  WorkflowDefinitionsEditorComponent,
  WorkflowDefinitionsViewerComponent,
  PagesComponent,
  PagesEditorComponent,
  PagesViewerComponent,
  ObjectiveRatingsComponent,
  ObjectiveRatingsEditorComponent,
  ObjectiveRatingsViewerComponent,
  RatingAssetDetailsComponent,
  RatingAssetDetailsEditorComponent,
  RatingAssetDetailsViewerComponent,
  RatingAssetDefinitionsComponent,
  RatingAssetDefinitionsEditorComponent,
  RatingAssetDefinitionsViewerComponent,
  FormTemplatesComponent,
  FormTemplatesEditorComponent,
  FormTemplatesViewerComponent,
  FormTemplateDetailsComponent,
  FormTemplateDetailsEditorComponent,
  FormTemplateDetailsViewerComponent,
  ContractPageDefinitionsComponent,
  ContractPageDefinitionsEditorComponent,
  ContractPageDefinitionsViewerComponent,
  SubscriptionDefinitionsComponent,
  SubscriptionDefinitionsEditorComponent,
  SubscriptionDefinitionsViewerComponent,
  LineManagersComponent,
  LineManagersEditorComponent,
  LineManagersViewerComponent,
  PerspectiveRatingsComponent,
  PerspectiveRatingsEditorComponent,
  PerspectiveRatingsViewerComponent,
  SectionsComponent,
  SectionsEditorComponent,
  SectionsViewerComponent,
  HurdlesComponent,
  HurdlesEditorComponent,
  HurdlesViewerComponent,
  ExemptsComponent,
  ExemptsEditorComponent,
  ExemptsViewerComponent,
  Configuration360sComponent,
  Configuration360sEditorComponent,
  Configuration360sViewerComponent,
  ControlsComponent,
  ControlsEditorComponent,
  ControlsViewerComponent,
  Ecosystem360sComponent,
  Ecosystem360sEditorComponent,
  Ecosystem360sViewerComponent,
  RoleWeightsComponent,
  RoleWeightsEditorComponent,
  RoleWeightsViewerComponent,
} from './components/setups';
import { ProfilePageComponent } from './com-parts/pages/profile-page/profile-page.component';
import { ModeratorSummaryPageComponent } from './com-parts/pages/summary-pages/moderator-summary-page/moderator-summary-page.component';
import { HrSummaryPageComponent } from './com-parts/pages/summary-pages/hr-summary-page/hr-summary-page.component';
import { ReviewerSummaryPageComponent } from './com-parts/pages/summary-pages/reviewer-summary-page/reviewer-summary-page.component';
import { EmployeeSummaryPageComponent } from './com-parts/pages/summary-pages/employee-summary-page/employee-summary-page.component';
import { SummaryPageStatusRowComponent } from './com-parts/summary-page-status-row/summary-page-status-row.component';
import { SupervisorSummaryPageComponent } from './com-parts/pages/summary-pages/supervisor-summary-page/supervisor-summary-page.component';
import { EmployeeArSummaryPageComponent } from './com-parts/pages/summary-pages/employee-ar-summary-page/employee-ar-summary-page.component';
import { ProgressChartComponent } from './com-parts/progress-chart/progress-chart.component';
import { CommentBoxComponent } from './com-parts/comment-box/comment-box.component';
import { SlTimelineComponent } from './com-parts/sl-timeline/sl-timeline.component';
import { SlTimelineAvatarComponent } from './com-parts/sl-timeline-avatar/sl-timeline-avatar.component';
import { ProgressDefinitionPaneComponent } from './com-parts/progress-definition-pane/progress-definition-pane.component';
import { SlCommentComponent } from './com-parts/sl-comment/sl-comment.component';
import { ThreeSixtyRatingRowTemplateComponent } from './com-parts/page-row-templates/three-sixty-rating-row-template/three-sixty-rating-row-template.component';
import { ReviewProgressComponent } from './components/Reviews/review-progress/review-progress.component';
import { TeamReviewComponent } from './components/Reviews/team-review/team-review.component';
import { SupervisorTwoSummaryPageComponent } from './com-parts/pages/summary-pages/supervisor-two-summary-page/supervisor-two-summary-page.component';
import { ModerationQueueComponent } from './components/queues/moderation-queue/moderation-queue.component';
import { HrQueueComponent } from './components/queues/hr-queue/hr-queue.component';
import { PermittedGuard } from '@nutela/core';
import { SubscriptionRowTemplateComponent } from './com-parts/page-row-templates/subscription-row-template/subscription-row-template.component';
import { AppraisalStatusComponent } from './components/reviews/appraisal-status/appraisal-status.component';
import { RatingFeedbackPageComponent } from './com-parts/review-page-types/rating-feedback-page/rating-feedback-page.component';
import { RatingFeedbackRowTemplateComponent } from './com-parts/page-row-templates/rating-feedback-row-template/rating-feedback-row-template.component';
import { AppraisalRerouteComponent } from './components/common/appraisal-reroute/appraisal-reroute.component';
import { PageScoreComponent } from './components/common/page-score/page-score.component';
import { ProgressDefinitionWidgetComponent } from './com-parts/progress-definition-widget/progress-definition-widget.component';
import { ProgressTransactionWidgetComponent } from './com-parts/progress-transaction-widget/progress-transaction-widget.component';
import { ProgressTransactionCommentWidgetComponent } from './com-parts/progress-transaction-comment-widget/progress-transaction-comment-widget.component';
import { LmManageObjectivesComponent } from './components/planning/lm-manage-objectives/lm-manage-objectives.component';
import { CommentAttachmentComponent } from './com-parts/comment-attachment/comment-attachment.component';
import { ObjectiveFeedbackComponent } from './components/common/objective-feedback/objective-feedback.component';
import { TeamFeedbackReviewComponent } from './components/Reviews/team-feedback-review/team-feedback-review.component';
import { FeedbackComponent } from './components/setups/feedback/feedback.component';
import { FeedbackEditorComponent } from './components/setups/feedback/feedback-editor/feedback-editor.component';
import { FeedbackViewerComponent } from './components/setups/feedback/feedback-viewer/feedback-viewer.component';
// Feed back questions
import { FeedbackQuestionsComponent } from './components/setups/feedback-questions/feedback-questions.component';
import { FeedbackQuestionsEditorComponent } from './components/setups/feedback-questions/feedback-questions-editor/feedback-questions-editor.component';
import { FeedbackQuestionsViewerComponent } from './components/setups/feedback-questions/feedback-questions-viewer/feedback-questions-viewer.component';
import { ObjectiveFeedbackEditorComponent } from './components/common/objective-feedback/objective-feedback-editor/objective-feedback-editor.component';
// Feed back ratings
import { FeedbackRatingsComponent } from './components/setups/feedback-ratings/feedback-ratings.component';
import { FeedbackRatingsEditorComponent } from './components/setups/feedback-ratings/feedback-ratings-editor/feedback-ratings-editor.component';
import { FeedbackRatingsViewerComponent } from './components/setups/feedback-ratings/feedback-ratings-viewer/feedback-ratings-viewer.component';
// Recommendations
import { RecommendationsComponent } from './components/setups/recommendations/recommendations.component';
import { RecommendationsEditorComponent } from './components/setups/recommendations/recommendations-editor/recommendations-editor.component';
import { RecommendationsViewerComponent } from './components/setups/recommendations/recommendations-viewer/recommendations-viewer.component';
import { PerformanceDashboardsComponent } from './components/dashboard/performance-dashboards.component';
import { DashboardStatusTileComponent } from './com-parts/dashboard-status-tile/dashboard-status-tile.component';
import { DashboardObjectiveTileComponent } from './com-parts/dashboard-objective-tile/dashboard-objective-tile.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'manage-review' },
      { path: 'dashboard', component: PerformanceDashboardsComponent, data: { state: 'dashboard', breadcrumb: 'Dashboard' } },
      { path: 'load-objectives', component: LoadObjectivesComponent, data: { state: 'load-objectives', breadcrumb: 'Load Objectives' } },
      { path: 'manage-objectives', component: ManageObjectivesComponent, data: { state: 'manage-objectives', breadcrumb: 'Manage Objectives' } },
      { path: 'lm-manage-objectives', component: LmManageObjectivesComponent, data: { state: 'lm-manage-objectives', breadcrumb: 'Manage Objectives as Line Manager' } },
      { path: 'progress-report/:id', component: ProgressReportComponent, data: { state: 'progress-report', breadcrumb: 'Progress Report' } },
      { path: 'objective-editor', component: ObjectiveEditorComponent, data: { state: 'objective-editor', breadcrumb: 'Edit Objective' } },

      { path: 'single-employee-load-objectives', component: SingleEmployeeLoadObjectivesComponent, data: { state: 'single-employee-load-objectives', breadcrumb: 'Load Objectives for Single Employee' } },

      { path: 'appraisal-forms/:id', component: AppraisalFormsComponent, resolve: { appraisalForms: AppraisalFormsResolver }, data: { state: 'appraisal-forms', breadcrumb: 'Appraisal Forms' } },

      { path: 'manage-review', component: ManageReviewComponent, data: { state: 'manage-review', breadcrumb: 'Manage Review' } },
      { path: 'review-progress', component: ReviewProgressComponent, data: { state: 'review-progress', breadcrumb: 'Review Progress' } },
      { path: 'team-review', component: TeamReviewComponent, data: { state: 'team-review', breadcrumb: 'Team Review' } },
      { path: 'objective-approval/:employeeId/:planId/:actionType', component: ObjectiveApprovalComponent, data: { state: 'objective-approval', breadcrumb: 'Objective Approval' } },
      { path: 'objective-feedback', component: ObjectiveFeedbackComponent, data: { state: 'objective-feedback', breadcrumb: 'objective-feedback' } },
      { path: 'team-feedback-review/:id', component: TeamFeedbackReviewComponent, data: { state: 'team-feedback-review', breadcrumb: 'team-feedback-review' } },

    ]
  },
  {
    path: 'admin', data: { role: 'HR_MEASURE', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'plans' },
      { path: 'hr-queue', component: HrQueueComponent, data: { state: 'hr-queue', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'HR Queue' } },
      { path: 'moderation-queue', component: ModerationQueueComponent, data: { state: 'moderation-queue', role: 'HR_MEASURE_MODERATION_QUEUE', breadcrumb: 'Moderation Queue' } },

      { path: 'multi-employee-load-objectives', component: MultiEmployeeLoadObjectivesComponent, data: { state: 'multi-employee-load-objectives', breadcrumb: 'Load Objectives for Multiple Employees' } },
      { path: 'library-load-objectives', component: LibraryLoadObjectivesComponent, data: { state: 'library-load-objectives', breadcrumb: 'Library Load Objectives' } },

      { path: 'plans', component: PlansComponent, data: { state: 'plans', breadcrumb: 'Plans' } },
      { path: 'feedback-session/:id', component: FeedbackComponent, data: { state: 'feedback-session', breadcrumb: 'feedback-session' } },
      { path: 'feedback-comment-box', component: FeedbackQuestionsComponent, data: { state: 'feedback-comment-box', breadcrumb: 'feedback-comment-box' } },
      { path: 'feedback-ratings', component: FeedbackRatingsComponent, data: { state: 'feedback-ratings', breadcrumb: 'feedback-ratings' } },
      { path: 'perspectives', component: PerspectivesComponent, data: { state: 'perspectives', breadcrumb: 'Perspectives' } },
      { path: 'objectives', component: ObjectivesComponent, data: { state: 'objectives', breadcrumb: 'Objectives' } },
      { path: 'plan-options/:id', component: PlanOptionsComponent, data: { state: 'plan-options', breadcrumb: 'Plan Options' } },
      { path: 'workflow-steps/:id', component: WorkflowStepsComponent, data: { state: 'workflow-steps', breadcrumb: 'Workflow Steps' } },
      { path: 'workflow-definitions', component: WorkflowDefinitionsComponent, data: { state: 'workflow-definitions', breadcrumb: 'Workflow Definitions' } },
      { path: 'pages', component: PagesComponent, data: { state: 'pages', breadcrumb: 'Pages' } },
      { path: 'subscription-definitions', component: SubscriptionDefinitionsComponent, data: { state: 'subscriptions-definitions', breadcrumb: 'Subscription Definitions' } },
      { path: 'contract-page-definitions', component: ContractPageDefinitionsComponent, data: { state: 'contract-page-definition', breadcrumb: 'Contract Page Definitions' } },
      { path: 'objective-ratings', component: ObjectiveRatingsComponent, data: { state: 'objective-ratings', breadcrumb: 'Objective Ratings' } },
      { path: 'rating-asset-details/:id', component: RatingAssetDetailsComponent, data: { state: 'rating-asset-details', breadcrumb: 'Rating Asset Details' } },
      { path: 'rating-asset-definitions', component: RatingAssetDefinitionsComponent, data: { state: 'rating-asset-definitions', breadcrumb: 'Rating Asset Definitions' } },
      { path: 'form-templates', component: FormTemplatesComponent, data: { state: 'form-templates', breadcrumb: 'Form Templates' } },
      { path: 'form-template-details/:id', component: FormTemplateDetailsComponent, data: { state: 'form-templates-details', breadcrumb: 'Form Template Details' } },
      { path: 'line-managers', component: LineManagersComponent, data: { state: 'line-managers', breadcrumb: 'Line Managers' } },
      { path: 'perspective-ratings/:id', component: PerspectiveRatingsComponent, data: { state: 'perspective-ratings', breadcrumb: 'Perspective Ratings' } },
      { path: 'sections', component: SectionsComponent, data: { state: 'sections', breadcrumb: 'Sections' } },
      { path: 'hurdles', component: HurdlesComponent, data: { state: 'hurdles', breadcrumb: 'Hurdles' } },
      { path: 'exempts', component: ExemptsComponent, data: { state: 'exempts', breadcrumb: 'Exempts' } },
      { path: 'configuration360s', component: Configuration360sComponent, data: { state: 'configuration360s', breadcrumb: 'Configuration 360s' } },
      { path: 'controls', component: ControlsComponent, data: { state: 'controls', breadcrumb: 'Controls' } },
      { path: 'ecosystem360s', component: Ecosystem360sComponent, data: { state: 'ecosystem360s', breadcrumb: 'Ecosystem 360s' } },
      { path: 'role-weights', component: RoleWeightsComponent, data: { state: 'role-weights', breadcrumb: 'Role Weights' } },
      { path: 'appraisal-status', component: AppraisalStatusComponent, data: { state: 'appraisal-status', breadcrumb: 'Appraisal Status' } },
      { path: 'recommendations', component: RecommendationsComponent, data: { state: 'recommendations', breadcrumb: 'recommendations' } },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    DxListModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    StoreModule.forFeature('performance', performanceReducers),
    EffectsModule.forRoot(performanceEffects),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot()
  ],
  declarations: [
    ManageReviewComponent,
    ReviewStatusComponent,
    OmiPanelComponent,
    AppraisalFormsComponent,
    PageNavigatorComponent,
    ContractPageComponent,
    KpiPageComponent,
    RatingPageComponent,
    ThreeSixtyRatingPageComponent,
    CustomPageComponent,
    CompetencyPageComponent,
    SubscriptionPageComponent,
    KpiRowTemplateComponent,
    RatingRowTemplateComponent,
    SubscriptionRowTemplateComponent,

    HrQueueComponent,
    ModerationQueueComponent,
    TeamReviewComponent,

    TargetType,
    VisibilityType,
    StringLimitPipe,
    PerspectiveType,
    RoleType,
    StepType,
    EligibilityRuleType,
    ValueTransform,
    BoolDisplay,
    EllipsisPipe,
    LoadObjectivesComponent,
    ManageObjectivesComponent,
    ObjectiveApprovalComponent,
    ObjectiveEditorComponent,
    ObjectiveViewerComponent,
    ObjectiveRecallComponent,
    ObjectiveMasterEditorComponent,
    ObjectiveMasterViewerComponent,
    ProgressReportComponent,
    ProgressDefinitionEditorComponent,
    ProgressTransactionEditorComponent,
    MultiEmployeeLoadObjectivesComponent,
    MultiEmployeeLoadObjectivesEditorComponent,
    MultiEmployeeLoadObjectivesViewerComponent,
    SingleEmployeeLoadObjectivesComponent,
    SingleEmployeeLoadObjectivesViewerComponent,
    SingleEmployeeLoadObjectivesEditorComponent,
    LibraryLoadObjectivesComponent,
    LibraryLoadObjectivesEditorComponent,
    LibraryLoadObjectivesViewerComponent,
    PlansComponent,
    PlansEditorComponent,
    PlansViewerComponent,
    PerspectivesComponent,
    PerspectivesEditorComponent,
    PerspectivesViewerComponent,
    ObjectivesComponent,
    ObjectivesEditorComponent,
    ObjectivesViewerComponent,
    PlanOptionsComponent,
    PlanOptionsEditorComponent,
    PlanOptionsViewerComponent,
    WorkflowStepsComponent,
    WorkflowStepsEditorComponent,
    WorkflowStepsViewerComponent,
    WorkflowDefinitionsComponent,
    WorkflowDefinitionsEditorComponent,
    WorkflowDefinitionsViewerComponent,
    PagesComponent,
    PagesEditorComponent,
    PagesViewerComponent,
    ObjectiveRatingsComponent,
    ObjectiveRatingsEditorComponent,
    ObjectiveRatingsViewerComponent,
    RatingAssetDetailsComponent,
    RatingAssetDetailsEditorComponent,
    RatingAssetDetailsViewerComponent,
    RatingAssetDefinitionsComponent,
    RatingAssetDefinitionsEditorComponent,
    RatingAssetDefinitionsViewerComponent,
    FormTemplatesComponent,
    FormTemplatesEditorComponent,
    FormTemplatesViewerComponent,
    FormTemplateDetailsComponent,
    FormTemplateDetailsEditorComponent,
    FormTemplateDetailsViewerComponent,
    ContractPageDefinitionsComponent,
    ContractPageDefinitionsEditorComponent,
    ContractPageDefinitionsViewerComponent,
    SubscriptionDefinitionsComponent,
    SubscriptionDefinitionsEditorComponent,
    SubscriptionDefinitionsViewerComponent,
    LineManagersComponent,
    LineManagersEditorComponent,
    LineManagersViewerComponent,
    PerspectiveRatingsComponent,
    PerspectiveRatingsEditorComponent,
    PerspectiveRatingsViewerComponent,
    SectionsComponent,
    SectionsEditorComponent,
    SectionsViewerComponent,
    HurdlesComponent,
    HurdlesEditorComponent,
    HurdlesViewerComponent,
    ExemptsComponent,
    ExemptsEditorComponent,
    ExemptsViewerComponent,
    Configuration360sComponent,
    Configuration360sEditorComponent,
    Configuration360sViewerComponent,
    ControlsComponent,
    ControlsEditorComponent,
    ControlsViewerComponent,
    Ecosystem360sComponent,
    Ecosystem360sEditorComponent,
    Ecosystem360sViewerComponent,
    RoleWeightsComponent,
    RoleWeightsEditorComponent,
    RoleWeightsViewerComponent,
    ProfilePageComponent,
    ModeratorSummaryPageComponent,
    HrSummaryPageComponent,
    ReviewerSummaryPageComponent,
    EmployeeSummaryPageComponent,
    SummaryPageStatusRowComponent,
    SupervisorSummaryPageComponent,
    EmployeeArSummaryPageComponent,
    ProgressChartComponent,
    CommentBoxComponent,
    SlTimelineComponent,
    SlTimelineAvatarComponent,
    ProgressDefinitionPaneComponent,
    SlCommentComponent,
    ThreeSixtyRatingRowTemplateComponent,
    ReviewProgressComponent,
    SupervisorTwoSummaryPageComponent,
    SupervisorTwoSummaryPageComponent,
    ModerationQueueComponent,
    HrQueueComponent,
    AppraisalStatusComponent,
    RatingFeedbackPageComponent,
    RatingFeedbackRowTemplateComponent,
    AppraisalRerouteComponent,
    PageScoreComponent,
    ProgressDefinitionWidgetComponent,
    ProgressTransactionWidgetComponent,
    ProgressTransactionCommentWidgetComponent,
    LmManageObjectivesComponent,
    CommentAttachmentComponent,
    ObjectiveFeedbackComponent,
    TeamFeedbackReviewComponent,
    FeedbackComponent,
    FeedbackEditorComponent,
    FeedbackViewerComponent,
    FeedbackQuestionsComponent,
    FeedbackQuestionsEditorComponent,
    FeedbackQuestionsViewerComponent,
    ObjectiveFeedbackEditorComponent,
    FeedbackRatingsComponent,
    FeedbackRatingsEditorComponent,
    FeedbackRatingsViewerComponent,
    RecommendationsComponent,
    RecommendationsEditorComponent,
    RecommendationsViewerComponent,
    PerformanceDashboardsComponent,
    DashboardStatusTileComponent,
    DashboardObjectiveTileComponent
  ],
  exports: [RouterModule, SlTimelineAvatarComponent, ProgressDefinitionWidgetComponent, ProgressTransactionWidgetComponent, ProgressTransactionCommentWidgetComponent],
  providers: [ReviewStatusResolver, AppraisalFormsResolver],
  entryComponents: [ModerationQueueComponent, HrQueueComponent, ContractPageComponent, KpiPageComponent, RatingPageComponent, ThreeSixtyRatingPageComponent, RatingFeedbackPageComponent, CustomPageComponent, CompetencyPageComponent, SubscriptionPageComponent, ProfilePageComponent, EmployeeSummaryPageComponent, SupervisorSummaryPageComponent, SupervisorTwoSummaryPageComponent, EmployeeArSummaryPageComponent, HrSummaryPageComponent, ModeratorSummaryPageComponent,ReviewerSummaryPageComponent,SlCommentComponent, ProgressChartComponent, AppraisalRerouteComponent, PageScoreComponent, ProgressDefinitionWidgetComponent, ProgressTransactionWidgetComponent, ProgressTransactionCommentWidgetComponent ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModuleUiTalentPerformanceUiModule { }

