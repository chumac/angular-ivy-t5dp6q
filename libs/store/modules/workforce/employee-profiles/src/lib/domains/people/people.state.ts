import { IPeople } from '@nutela/models/workforce/personnel';

export interface IPeopleState {
  peopleData: IPeople[];
  isProcessing: boolean;
  isLoading: boolean;
  showViewer: boolean;
}

export const initialPeopleState: IPeopleState = {
  peopleData: [],
  isProcessing: false,
  isLoading: false,
  showViewer: false
};
