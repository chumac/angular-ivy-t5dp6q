import { createSelector } from '@ngrx/store';
import { IFacilitatorsState } from './facilitators.state';
import { getLearningState, ILearningState } from '../../../root/learning.state';

export const getFacilitatorsState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventFacilitators
);

export const getFacilitatorsData = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.FacilitatorsData
);

export const getDocumentFacilitatorsData = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.document
);

export const getImageFacilitatorsData = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.image
);

export const getFacilitatorsTypeData = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.FacilitatorsTypeData
);

export const isProcessingFacilitators = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.isProcessing
);

export const showEditorFacilitators = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.showEditor
);

export const showViewerFacilitators = createSelector(
  getFacilitatorsState,
  (state: IFacilitatorsState) => state.showViewer
);