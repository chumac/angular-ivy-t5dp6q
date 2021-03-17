import { createFeatureSelector } from "@ngrx/store";
import { IExitState } from "./exit.state";

export const getState = createFeatureSelector<IExitState>('exit');
