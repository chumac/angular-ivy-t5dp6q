import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IFeedBackFormState } from './feedback-form.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getFeedbackFormState = createSelector(getState, (state: IPerformanceState) => state.feedbackForm);

export const getEmployeeInfoFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.employeeInfo);
export const getMetaDataFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.feedbackMetaData);

export const getCanProvideEmployeeFeedback = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.canEmployeeProvideFeedback);
export const getStartEmployeeFeedback = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.startEmployeeFeedback);
export const getEmployeeObjectiveMasterFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.employeeObjectiveMaster);
export const getEmployeeObjectiveDetailFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.employeeObjectiveDetail);

export const getProcessingFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.processing);
export const getProcessingMastersFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.processingMasters);
export const getProcessingDetailsFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.processingDetails);
export const getCompletingMastersFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.completingMasters);
export const getCompletingDetailsFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.completingDetails);

export const getSubmittingFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.submittingObjective);
export const getLoadingTeamFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.loadingTeam);

export const getRatingsFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.feedbackRatings);

export const getLMTeamCountFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.lmTeamCount);
export const getLMTeamListFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.lmTeamList);
export const getLMObjectiveMasterFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.lmObjectiveMaster);
export const getLMObjectiveDetailFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.lmObjectiveDetail);
export const getLMObjectiveDetailAltFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.lmObjectiveDetailAlt);

export const getHRTeamListFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.hrTeamList);
export const getHRObjectiveMasterFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.hrObjectiveMaster);
export const getHRObjectiveDetailFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.hrObjectiveDetail);
export const getHREmpObjectiveDetailFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.hrEmpObjectiveDetail);
export const getHRLMObjectiveDetailFeedbackForm = createSelector(getFeedbackFormState, (state: IFeedBackFormState) => state.hrLMObjectiveDetail);





