import { createSelector } from '@ngrx/store';

import { IRootState, getRootState } from '../root/root.state';
import { IDocumentState } from './document.state';

export const getDocumentState = createSelector(
  getRootState,
  (state: IRootState) => state.document
);

export const getDocumentData = createSelector(
  getDocumentState,
  (state: IDocumentState) => state.documentData
);
export const getDocumentType = createSelector(
  getDocumentState,
  (state: IDocumentState) => state.documentType
);
export const isProcessingDocument = createSelector(
  getDocumentState,
  (state: IDocumentState) => state.isProcessing
);
export const isLoadingDocument = createSelector(
  getDocumentState,
  (state: IDocumentState) => state.isLoading
);
