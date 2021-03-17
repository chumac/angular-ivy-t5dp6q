import { ActionReducerMap } from "@ngrx/store";


import { enterpriseStructureTypeReducer } from "../enterprise-structure-type";
import { enterpriseStructureDetailReducer } from "../enterprise-structure-detail";
import { IEnterpriseStructureState } from "./enterprise-structure-root.state";

export const enterpriseStructureReducers: ActionReducerMap<IEnterpriseStructureState> = {
  enterpriseStructureType: enterpriseStructureTypeReducer,
  enterpriseStructureDetail: enterpriseStructureDetailReducer
};
