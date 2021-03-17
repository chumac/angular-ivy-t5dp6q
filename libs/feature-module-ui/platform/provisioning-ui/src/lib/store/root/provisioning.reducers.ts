import { ActionReducerMap } from "@ngrx/store";

import { IProvisioningState } from "./provisioning.state";
import { newEmployeeReducer } from "../new-employee";

export const provisioningReducers: ActionReducerMap<IProvisioningState> = {
  newEmployee: newEmployeeReducer,
};
