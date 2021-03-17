
import { ISelectOption } from "dist/libs/models/core-data";
import { IEnterpriseStructureDetail, ICostCentreTransform, INameAndId } from "../../models/interfaces";

export interface IEnterpriseStructureDetailState {
  enterpriseStructureDetailList: IEnterpriseStructureDetail[];
  enterpriseStructureLink: ISelectOption[];
  positionsDataList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showMover: boolean;
  showEditorConnect: boolean;
  showEditorConnectChildren: boolean;
  showEditorAddCostCentre: boolean;
  showEditorRemoveCostCentre: boolean;
  showSharedCodeEditor: boolean;
  costCentres: ICostCentreTransform[],
  costCentresById: ICostCentreTransform[],
  selectedRows: IEnterpriseStructureDetail[],
  structureNameAndId: INameAndId
}

export const initialEnterpriseStructureDetailState: IEnterpriseStructureDetailState = {
  enterpriseStructureDetailList: [],
  enterpriseStructureLink: null,
  positionsDataList: [],
  isProcessing: false,
  showEditor: false,
  showMover: false,
  showEditorConnect: false,
  showEditorConnectChildren: false,
  showEditorAddCostCentre: false,
  showEditorRemoveCostCentre: false,
  showSharedCodeEditor: false,
  costCentres: null,
  costCentresById: null,
  selectedRows: null,
  structureNameAndId: null
}

