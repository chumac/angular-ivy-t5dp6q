import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPeopleState } from './people.state';


const getPeopleState = createFeatureSelector<IPeopleState>('people');

export const getPeopleData = createSelector(
  getPeopleState,
  (state: IPeopleState) => state.peopleData
);
export const isProcessingPeople = createSelector(
  getPeopleState,
  (state: IPeopleState) => state.isProcessing
);

export const isLoadingPeople = createSelector(
  getPeopleState,
  (state: IPeopleState) => state.isLoading
);

export const showViewerPeople = createSelector(
  getPeopleState,
  (state: IPeopleState) => state.showViewer
);
