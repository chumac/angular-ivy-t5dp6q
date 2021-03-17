import { Action } from '@ngrx/store';

export enum FileDownloaderActionTypes {
  DOWNLOAD = '[FILE DOWNLOADER] Download',
}

export class Download implements Action {
  readonly type = FileDownloaderActionTypes.DOWNLOAD;

  constructor(public payload: { data: any }) {}
}

export type FileDownloaderActions = Download;
