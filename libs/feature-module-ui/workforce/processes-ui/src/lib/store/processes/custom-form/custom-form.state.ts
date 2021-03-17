import { ICustomForm, ICustomFormType, ICustomFormArea, ICustomFormScope, ICustomFormEligibility } from "@nutela/models/workforce/employee-profiles";
import { IBasicData } from "@nutela/models/core-data";
import { IWorkDefinition } from "@nutela/models/foundation";

export interface ICustomFormState {
  customFormData: ICustomForm[];
  typeList: ICustomFormType[];
  areaList: ICustomFormArea[];
  scopeList: ICustomFormScope[];
  eligibilityList: ICustomFormEligibility[];
  workFlowList: IWorkDefinition[];
  dataSetTypes: IBasicData[];
  cascadeDataSetTypes: IBasicData[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCustomFormState: ICustomFormState = {
  customFormData: [],
  typeList: [],
  areaList: [],
  scopeList: [],
  eligibilityList: [],
  workFlowList: [],
  dataSetTypes: [],
  cascadeDataSetTypes: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

