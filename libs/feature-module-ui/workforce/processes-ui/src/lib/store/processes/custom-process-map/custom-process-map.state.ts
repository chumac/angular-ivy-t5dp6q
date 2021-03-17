import { ICustomForm, ICustomProcessMap, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';
import { IBasicData } from '@nutela/models/core-data';

export interface ICustomProcessMapState {
  customProcessMapData: ICustomProcessMap[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  roles: IBasicData[];
  empPermissions: IBasicData[];
  customFormList: ICustomForm[];
}

export const initialCustomProcessMapState: ICustomProcessMapState = {
  customProcessMapData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  roles: [],
  empPermissions: [],
  customFormList: []
}

