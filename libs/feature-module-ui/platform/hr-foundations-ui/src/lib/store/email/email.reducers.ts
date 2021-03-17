import { initialEmailState, IEmailState } from './email.state';
import { EmailActions, EmailActionTypes } from './email.actions';

export function emailReducer(
  state = initialEmailState,
  action: EmailActions
): IEmailState {
  switch (action.type) {
    case EmailActionTypes.LOAD_EMAIL_DATA_SUCCESS:
      return { ...state, emailData: action.payload };
    default: {
      return state;
    }
  }
}
