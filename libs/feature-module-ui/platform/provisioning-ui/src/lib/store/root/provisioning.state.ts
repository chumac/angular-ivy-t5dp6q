import { INewEmployeeState } from "../new-employee";


export interface IProvisioningState {
  newEmployee: INewEmployeeState;
}

export const initialState: IProvisioningState = {
  newEmployee: null
};
