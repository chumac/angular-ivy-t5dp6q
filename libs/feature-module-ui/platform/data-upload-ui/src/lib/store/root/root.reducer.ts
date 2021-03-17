import { ActionReducerMap } from '@ngrx/store';

import { IDataUploadState } from './root.state';
import { uploadReducer } from '../upload';

export const dataUploadReducer: ActionReducerMap<IDataUploadState> = {
  upload: uploadReducer,
};
