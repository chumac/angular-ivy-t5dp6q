import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoryComponent, CourseCategoryEditorComponent, CourseComponent, CourseEditorComponent, CourseCategoryViewerComponent } from './components/setups'
import { learningEffects, learningReducers } from '../store/root';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { IgxGridModule, IgxListModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { TrainingRoomsComponent } from './components/setups/training-rooms/training-rooms.component';
import { CourseViewerComponent } from './components/setups/course/course-viewer/course-viewer.component';
import { TrainingRoomsViewerComponent } from './components/setups/training-rooms/training-rooms-viewer/training-rooms-viewer.component';
import { TrainingRoomsEditorComponent } from './components/setups/training-rooms/training-rooms-editor/training-rooms-editor.component';
import { EventDetailComponent } from './components/setups/event-detail/event-detail.component';
import { EventDetailRootPaneComponent } from './components/setups/event-detail-common-part/event-detail-root-pane/event-detail-root-pane.component';
import { EventDetailDataListingComponent } from './components/setups/event-detail-common-part/event-detail-data-listing/event-detail-data-listing.component';
import { EventDetailPreRequisitesViewerComponent } from './components/setups/event-detail-common-part/event-detail-pre-requisites/event-detail-pre-requisites-viewer/event-detail-pre-requisites-viewer.component';
import { ScheduleComponent } from './components/setups/event-detail-common-part/schedule/schedule.component';
import { EventDetailAssetsEditorComponent } from './components/setups/event-detail-common-part/event-detail-assets/event-detail-assets-editor/event-detail-assets-editor.component';
import { ScheduleEditorComponent } from './components/setups/event-detail-common-part/schedule/schedule-editor/schedule-editor.component';
import { EventDetailDataComponent } from './components/setups/event-detail-data/event-detail-data.component';
import { EventDetailEditorComponent } from './components/setups/event-detail/event-detail-editor/event-detail-editor.component';
import { EventDetailNavigationPanelComponent } from './components/setups/event-detail-common-part/event-detail-navigation-panel/event-detail-navigation-panel.component';
import { EventDetailPreRequisitesComponent } from './components/setups/event-detail-common-part/event-detail-pre-requisites/event-detail-pre-requisites.component';
import { EventDetailPreRequisitesEditorComponent } from './components/setups/event-detail-common-part/event-detail-pre-requisites/event-detail-pre-requisites-editor/event-detail-pre-requisites-editor.component';
import { ScheduleViewComponent } from './components/setups/event-detail-common-part/schedule/schedule-view/schedule-view.component';
import { EventDetailAssetsComponent } from './components/setups/event-detail-common-part/event-detail-assets/event-detail-assets.component';
import { EventDetailAssetsViewerComponent } from './components/setups/event-detail-common-part/event-detail-assets/event-detail-assets-viewer/event-detail-assets-viewer.component';
import { EventDetailFacilitatorsEditorComponent } from './components/setups/event-detail-common-part/event-detail-facilitators/event-detail-facilitators-editor/event-detail-facilitators-editor.component';
import { EventDetailFacilitatorsViewerComponent } from './components/setups/event-detail-common-part/event-detail-facilitators/event-detail-facilitators-viewer/event-detail-facilitators-viewer.component';
import { EventDetailFacilitatorsComponent } from './components/setups/event-detail-common-part/event-detail-facilitators/event-detail-facilitators.component';
import { EventDetailCloseComponent } from './components/setups/event-detail/event-detail-close/event-detail-close.component';
import { EventDetailFeedbackFormsComponent } from './components/setups/event-detail-common-part/event-detail-feedback-forms/event-detail-feedback-forms.component';
import { EventDetailFeedbackFormsEditorComponent } from './components/setups/event-detail-common-part/event-detail-feedback-forms/event-detail-feedback-forms-editor/event-detail-feedback-forms-editor.component';
import { EventDetailFeedbackFormsViewerComponent } from './components/setups/event-detail-common-part/event-detail-feedback-forms/event-detail-feedback-forms-viewer/event-detail-feedback-forms-viewer.component';
import { EventDetailParticipantsComponent } from './components/setups/event-detail-common-part/event-detail-participants/event-detail-participants.component';
import { EventDetailParticipantsEditorComponent } from './components/setups/event-detail-common-part/event-detail-participants/event-detail-participants-editor/event-detail-participants-editor.component';
import { EventDetailParticipantsViewComponent } from './components/setups/event-detail-common-part/event-detail-participants/event-detail-participants-view/event-detail-participants-view.component';
import { EventDetailNominationComponent } from './components/setups/event-detail/event-detail-nomination/event-detail-nomination.component';
import { LearningPlanComponent } from './components/setups/learning-plan/learning-plan.component';
import { LearningPlanOptOutEditorComponent } from './components/setups/learning-plan/learning-plan-optout-editor/learning-plan-optout-editor.component';
import { EventDetailParticipantsCriteriaComponent } from './components/setups/event-detail-common-part/event-detail-participants/event-detail-participants-criteria/event-detail-participants-criteria.component';
import { EventDetailDataPanelComponent } from './components/setups/event-detail-common-part/event-detail-data-panel/event-detail-data-panel.component';
import { LearningLibraryComponent } from './components/setups/learning-library/learning-library.component';
import { LearningPlanApplyEditorComponent } from './components/setups/learning-plan/learning-plan-apply-editor/learning-plan-apply-editor.component';
import { LearningPlanEnrollEditorComponent } from './components/setups/learning-plan/learning-plan-enroll-editor/learning-plan-enroll-editor.component';
import { LearningLibraryEnrollEditorComponent } from './components/setups/learning-library/learning-library-enroll-editor/learning-library-enroll-editor.component';
import { LearningLibraryApplyEditorComponent } from './components/setups/learning-library/learning-library-apply-editor/learning-library-apply-editor.component';
import { MyActionComponent } from './components/setups/my-action/my-action.component';
import { MyActionFacultyNominationComponent } from './components/setups/my-action/my-action-faculty-nomination/my-action-faculty-nomination.component';
import { MyActionOptOutComponent } from './components/setups/my-action/my-action-opt-out/my-action-opt-out.component';
import { MyActionFeedbackFormComponent } from './components/setups/my-action/my-action-feedback-form/my-action-feedback-form.component';
import { LearningPlanEditEditorComponent } from './components/setups/learning-plan/learning-plan-edit-editor/learning-plan-edit-editor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'learning-plan' },
      { path: 'learning-plan', component: LearningPlanComponent, data: { state: 'learning-plan', breadcrumb: 'Learning Plan' } },
      { path: 'learning-library', component: LearningLibraryComponent, data: { state: 'learning-library', breadcrumb: 'Learning Library' } },
      { path: 'event-view-data/:id', component: EventDetailDataComponent, data: { state: 'event-review-data', breadcrumb: 'Event View Data' } },
      { path: 'event-open-data/:id', component: EventDetailDataComponent, data: { state: 'event-open-data', breadcrumb: 'Event Open Data' } },
      { path: 'my-action', component: MyActionComponent, data: { state: 'my-action', breadcrumb: 'My Action' } },
      { path: 'manager-action', component: MyActionComponent, data: { state: 'manager-action', breadcrumb: 'Manager Action' } },
    ]
  },
  {
    path: 'admin', data: { role: 'HR_MEASURE', breadcrumb: 'HR Admin' },
    children: [
      { path: '', redirectTo: 'course-category' },
      { path: 'course-category', component: CourseCategoryComponent, data: { state: 'course-category', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Course Category' } },
      { path: 'course', component: CourseComponent, data: { state: 'course', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Course' } },
      { path: 'training-rooms', component: TrainingRoomsComponent, data: { state: 'training-rooms', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Training Rooms' } },
      { path: 'event-detail', component: EventDetailComponent, data: { state: 'event-detail', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Event Detail' } },
      { path: 'event-detail-data/:id', component: EventDetailDataComponent, data: { state: 'event-detail-data', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Event Detail Data' } },
      { path: 'event-review-data/:id', component: EventDetailDataComponent, data: { state: 'event-review-data', role: 'HR_MEASURE_HR_QUEUE', breadcrumb: 'Event Review Data' } },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('learning', learningReducers),
    EffectsModule.forRoot(learningEffects),
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
    IgxListModule,
  ],
  exports: [RouterModule],

  declarations: [
    CourseCategoryComponent,
    CourseCategoryViewerComponent,
    CourseCategoryEditorComponent,
    CourseComponent,
    CourseEditorComponent,
    TrainingRoomsComponent,
    CourseViewerComponent,
    TrainingRoomsViewerComponent,
    TrainingRoomsEditorComponent,
    EventDetailComponent,
    EventDetailDataComponent,
    EventDetailEditorComponent,
    EventDetailNavigationPanelComponent,
    EventDetailRootPaneComponent,
    EventDetailDataListingComponent,
    ScheduleComponent,
    EventDetailPreRequisitesComponent,
    EventDetailPreRequisitesEditorComponent,
    EventDetailPreRequisitesViewerComponent,
    EventDetailAssetsComponent,
    EventDetailAssetsEditorComponent,
    EventDetailAssetsViewerComponent,
    ScheduleEditorComponent,
    ScheduleViewComponent,
    EventDetailFacilitatorsComponent,
    EventDetailFacilitatorsEditorComponent,
    EventDetailFacilitatorsViewerComponent,
    EventDetailFeedbackFormsComponent,
    EventDetailFeedbackFormsEditorComponent,
    EventDetailFeedbackFormsViewerComponent,
    EventDetailCloseComponent,
    EventDetailParticipantsComponent,
    EventDetailParticipantsEditorComponent,
    EventDetailParticipantsViewComponent,
    EventDetailNominationComponent,
    EventDetailCloseComponent,
    LearningPlanComponent,
    LearningPlanOptOutEditorComponent,
    EventDetailParticipantsCriteriaComponent,
    EventDetailDataPanelComponent,
    LearningPlanApplyEditorComponent,
    LearningPlanEnrollEditorComponent,
    LearningLibraryEnrollEditorComponent,
    LearningLibraryApplyEditorComponent,
    LearningLibraryComponent,
    MyActionComponent,
    MyActionFacultyNominationComponent,
    MyActionOptOutComponent,
    MyActionFeedbackFormComponent,
    LearningPlanEditEditorComponent,
  ]
})

export class FeatureModuleUiTalentLearningUiModule { }
