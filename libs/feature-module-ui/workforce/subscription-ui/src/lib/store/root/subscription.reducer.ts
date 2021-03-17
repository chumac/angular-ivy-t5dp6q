import { ActionReducerMap } from "@ngrx/store";

import { ISubscriptionsState } from "./subscription.state";
import { subscriptionReducer } from "../../store/subscription";

export const subscriptionsReducer: ActionReducerMap<ISubscriptionsState> = {
  subscription: subscriptionReducer,
};
