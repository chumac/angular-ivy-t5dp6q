
import { ISubscriptionDefinition, IPage } from '@nutela/models/talent/performance';

export interface ISubscriptionDefinitionState {
  subscriptionDefinitionData: ISubscriptionDefinition[];
  subscriptionPagesList: IPage[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialSubscriptionDefinitionState: ISubscriptionDefinitionState = {
  subscriptionDefinitionData: [],
  subscriptionPagesList: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
}

