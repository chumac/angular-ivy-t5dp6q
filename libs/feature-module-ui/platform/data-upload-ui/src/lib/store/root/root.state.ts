import { createFeatureSelector } from '@ngrx/store';
import { IUploadState } from '../upload';

export interface IDataUploadState {
  upload: IUploadState;
}

export const initialState: IDataUploadState = {
  upload: null
};

export const getRootState = createFeatureSelector<IDataUploadState>('data-upload');
