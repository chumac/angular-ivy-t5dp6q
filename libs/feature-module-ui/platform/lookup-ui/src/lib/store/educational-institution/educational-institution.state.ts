import { IEducationalInstitution } from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";

export interface IEducationalInstitutionState {
  institutionData: IEducationalInstitution[];
  professionalData: IEducationalInstitution[];
  showEditor:boolean;
  isProcessing: boolean;
  nationality:ISelectOption[];
  stateData:ISelectOption[];

}

export const initialEducationalInstitutionState: IEducationalInstitutionState = {
  institutionData: [],
  showEditor: false,
  isProcessing: false,
  nationality:[],
  stateData:[],
  professionalData: [],
}

