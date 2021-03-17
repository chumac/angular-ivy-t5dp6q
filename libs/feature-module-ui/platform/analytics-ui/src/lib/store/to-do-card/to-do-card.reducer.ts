import { IToDoCardState, initialToDoCardState } from "./to-do-card.state";
import { ToDoCardActions, ToDoCardActionTypes } from "./to-do-card.actions";


export function toDoCardReducer(
  state = initialToDoCardState,
  action: ToDoCardActions
): IToDoCardState {
  switch (action.type) {
    case ToDoCardActionTypes.LOAD_TO_DOs_SUCCESS:
      return { ...state, todos: action.payload };
    case ToDoCardActionTypes.LOAD_ANNIVERSARIES_SUCCESS:
      return { ...state, anniversaries: action.payload };
    case ToDoCardActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS :
      return { ...state, announcements: action.payload };
    case ToDoCardActionTypes.VIEW_TYPE:
      return { ...state, viewType: action.payload };

    default: {
      return state;
    }
  }
}
