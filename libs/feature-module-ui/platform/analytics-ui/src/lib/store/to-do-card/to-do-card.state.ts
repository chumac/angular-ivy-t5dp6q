import { IToDo, IAnniversary, IAnnouncement } from "@nutela/models/core-data";

export interface IToDoCardState {
  viewType: string;
  todos: IToDo[];
  anniversaries: IAnniversary[];
  announcements: IAnnouncement[];
}

export const initialToDoCardState: IToDoCardState = {
  viewType: 'Birthday',
  todos: null,
  anniversaries: null,
  announcements: null
}

