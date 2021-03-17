
import { IHurdle } from '@nutela/models/talent/performance';

export interface IHurdleState {
  hurdleData: IHurdle[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHurdleState: IHurdleState = {
  hurdleData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

