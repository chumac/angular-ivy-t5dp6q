import { IEnterpriseStructureDetailState } from "../enterprise-structure-detail";
import { IEnterpriseStructureTypeState } from "../enterprise-structure-type";

export interface IEnterpriseStructureState {
  enterpriseStructureType: IEnterpriseStructureTypeState;
  enterpriseStructureDetail: IEnterpriseStructureDetailState;
}

export const initialState: IEnterpriseStructureState = {
  enterpriseStructureType: null,
  enterpriseStructureDetail: null
};

