import { IToDo, IAnniversary, IAnnouncement } from "@nutela/models/core-data";

export interface INoticeBoardCardState {
  viewType: string;
  announcements: IAnnouncement[];
}

export const initialNoticeBoardCardState: INoticeBoardCardState = {
  viewType: 'ToDos',
  announcements: null
}

