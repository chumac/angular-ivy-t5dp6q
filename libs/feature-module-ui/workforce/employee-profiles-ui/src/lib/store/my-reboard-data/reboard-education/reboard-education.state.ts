import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { INationality } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';

export interface IReboardEducationState {
  data: IEducation[];
  institutionsList: INationality[];
  countryList: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  dataMap: { [key: number]: IEducation };

}

export const initialReboardEducationState: IReboardEducationState = {
  data: [],
  institutionsList: [],
  countryList: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  dataMap: {}
}

