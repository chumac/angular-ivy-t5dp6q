import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDocumentTagsState } from './document-tags.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getDocumentTagsState = createSelector(getState, (state: ILookupState) => state.documentTags);

export const getDocumentTags = createSelector(
  getDocumentTagsState,
  (state: IDocumentTagsState) => state.documentTagData
);

export const showEditorDocumentTags = createSelector(
  getDocumentTagsState,
  (state: IDocumentTagsState) => state.showEditor
);


export const isProcessingDocumentTags = createSelector(
  getDocumentTagsState,
  (state: IDocumentTagsState) => state.isProcessing
);


