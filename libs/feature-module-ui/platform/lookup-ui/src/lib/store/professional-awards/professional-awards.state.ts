import { IProfessionalAwards } from "@nutela/models/platform/lookup";

export interface IProfessionalAwardsState {
  awardData: IProfessionalAwards[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialProfessionalAwardsState: IProfessionalAwardsState = {
  awardData: [],
  showEditor: false,
  isProcessing: false,
}

