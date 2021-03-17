
import { IEmail} from '@nutela/models/foundation';


export interface IEmailState {
  emailData: IEmail[];
  description:any;
 
}

export const initialEmailState: IEmailState = {
  emailData: [],
  description: [],
}

