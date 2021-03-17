import { initialStaffCategoryState, IStaffCategoryState } from './staff-categories.state';
import { StaffCategoryActions, StaffCategoryActionTypes } from './staff-categories.actions';

export function staffCategoryReducer(
  state = initialStaffCategoryState,
  action: StaffCategoryActions
): IStaffCategoryState {
  switch (action.type) {
    case StaffCategoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case StaffCategoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case StaffCategoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case StaffCategoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case StaffCategoryActionTypes.LOAD_STAFF_CATEGORY_DATA_SUCCESS:
      return { ...state, staffData: action.payload };
    default: {
      return state;
    }
  }
}
