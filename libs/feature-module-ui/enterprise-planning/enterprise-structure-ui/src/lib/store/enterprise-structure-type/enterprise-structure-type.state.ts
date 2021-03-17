import { IEnterpriseStructure, IVirtualLinkTransform } from "../../models/interfaces";
import { ISelectOption } from "@nutela/models/core-data";


export interface IEnterpriseStructureTypeState {
  enterpriseStructuretypes: IEnterpriseStructure[];
  structureTransformed: ISelectOption[];
  knownTypes: ISelectOption[];
  isProcessing: boolean;
  isProcessingVlink: boolean;
  showEditor: boolean;
  showVLinkEditor: boolean;
  virtualLinks: IVirtualLinkTransform[];
}

export const initialEnterpriseStructureTypeState: IEnterpriseStructureTypeState = {
  enterpriseStructuretypes: [],
  structureTransformed: null,
  knownTypes: null,
  isProcessing: false,
  isProcessingVlink: false,
  showEditor: false,
  showVLinkEditor: false,
  virtualLinks: []
}

