import { createFeatureSelector } from '@ngrx/store';

import { IDocumentState } from '../document';

export interface IRootState {
  document: IDocumentState;
}

export const initialState: IRootState = {
  document: null
};

export const getRootState = createFeatureSelector<IRootState>('documents');
