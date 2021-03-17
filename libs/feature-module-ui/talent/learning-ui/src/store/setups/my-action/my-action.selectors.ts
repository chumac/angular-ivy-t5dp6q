import { createSelector } from '@ngrx/store';
import { IMyActionState } from './my-action.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getMyActionState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventMyAction
);

export const getMyActionData = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.MyActionData
);

export const getFormMyActionData = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.MyFormActionData
);

export const isProcessingMyAction = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.isProcessing
);

export const showActionNominationEditorEvent = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.showActionNominationEditor
);

export const showActionFeedbackFormEditorEvent = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.showActionFeedbackFormEditor
);

export const showOptOutEditorMyAction = createSelector(
  getMyActionState,
  (state: IMyActionState) => state.showActionOptOutEditor
);