
import { IOrganization } from '@nutela/models/foundation';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IOrganizationState {
  organizationData: IOrganization[];
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  logo: any;
  isProcessing: boolean;
  showEditor: boolean;
  
  
}

export const initialOrganizationState: IOrganizationState = {
  organizationData: [],
  stateList: [],
  cityList: [],
  logo: null,
  isProcessing: false,
  showEditor: false,
  
 
}

