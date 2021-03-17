import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IImageState } from './image.state';

export const getImageState = createFeatureSelector<IImageState>('imageData');

export const getEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.employeePhoto
);

export const getReportsToEmployeePhoto = createSelector(
  getImageState,
  (state: IImageState) => state.reportsToEmployeePhoto
);

export const getSignature = createSelector(
  getImageState,
  (state: IImageState) => state.signature
);
