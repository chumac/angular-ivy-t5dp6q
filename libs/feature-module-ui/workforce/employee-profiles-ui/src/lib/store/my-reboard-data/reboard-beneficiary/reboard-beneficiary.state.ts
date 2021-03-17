
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export interface IReboardBeneficiaryState {
  data: IBeneficiary[];
  photo: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardBeneficiaryState: IReboardBeneficiaryState = {
  data: [],
  photo: null,
  stateList: [],
  cityList: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false
}

