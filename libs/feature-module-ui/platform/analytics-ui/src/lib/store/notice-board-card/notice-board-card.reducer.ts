import { INoticeBoardCardState, initialNoticeBoardCardState } from "./notice-board-card.state";
import { NoticeBoardCardActions, NoticeBoardCardActionTypes } from "./notice-board-card.actions";


export function noticeBoardCardReducer(
  state = initialNoticeBoardCardState,
  action: NoticeBoardCardActions
): INoticeBoardCardState {
  switch (action.type) {
    case NoticeBoardCardActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS :
      return { ...state, announcements: action.payload };
    case NoticeBoardCardActionTypes.VIEW_TYPE:
      return { ...state, viewType: action.payload };

    default: {
      return state;
    }
  }
}
