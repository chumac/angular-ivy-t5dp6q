import { createFeatureSelector } from "@ngrx/store";
import { IAbsenceState } from "./absence.state";

export const getState = createFeatureSelector<IAbsenceState>('absence');
