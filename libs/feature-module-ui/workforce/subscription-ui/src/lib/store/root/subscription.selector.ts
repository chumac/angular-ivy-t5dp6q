import { createFeatureSelector } from "@ngrx/store";
import { ISubscriptionsState } from "./subscription.state";

export const getState = createFeatureSelector<ISubscriptionsState>('subscription');
