import { IFileDownloaderState, initialFileDownloaderState } from "./file-downloader.state";
import { FileDownloaderActions, FileDownloaderActionTypes } from "./file-downloader.actions";

export function fileDownloaderReducer(state: IFileDownloaderState = initialFileDownloaderState, action: FileDownloaderActions) {
  switch(action.type) {
    default:
      return state;
  }
}
