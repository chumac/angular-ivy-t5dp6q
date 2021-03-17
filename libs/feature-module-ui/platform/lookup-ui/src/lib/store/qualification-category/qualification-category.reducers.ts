import { initialQualificationCategoryState, IQualificationCategoryState } from './qualification-category.state';
import { QualificationCategoryActions, QualificationCategoryActionTypes } from './qualification-category.actions';

export function qualificationCategoryReducer(
  state = initialQualificationCategoryState,
  action: QualificationCategoryActions
): IQualificationCategoryState {
  switch (action.type) {
    case QualificationCategoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case QualificationCategoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case QualificationCategoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case QualificationCategoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case QualificationCategoryActionTypes.LOAD_QUALIFICATION_CATEGORY_DATA_SUCCESS:
      return { ...state, category: action.payload };
    default: {
      return state;
    }
  }
}
