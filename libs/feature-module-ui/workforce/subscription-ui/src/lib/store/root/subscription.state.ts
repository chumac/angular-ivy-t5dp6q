import { ISubscriptionState } from "../../store/subscription";

export interface ISubscriptionsState {
  subscription: ISubscriptionState,
}

export const initialState: ISubscriptionsState = {
  subscription: null,
};
