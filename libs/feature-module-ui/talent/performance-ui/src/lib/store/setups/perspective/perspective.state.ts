
import { IPerspective } from '@nutela/models/talent/performance';

export interface IPerspectiveState {
  perspectiveData: IPerspective[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPerspectiveState: IPerspectiveState = {
  perspectiveData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

