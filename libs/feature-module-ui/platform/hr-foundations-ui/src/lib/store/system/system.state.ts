
import { ISystem} from '@nutela/models/foundation';


export interface ISystemState {
  systemData: ISystem[];
  description:any;
  isProcessing:Boolean;

}

export const initialSystemState: ISystemState = {
  systemData: [],
  description: [],
  isProcessing:false,
}

