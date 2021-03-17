import { ISubscription, ISubscriptionType, IMembershipInfo } from '@nutela/models/workforce/subscription';
import { ISelectOption } from '@nutela/models/core-data';

export interface ISubscriptionState {
  approvedData: ISubscription[];
  awaitingApprovalData: ISubscription[];
  processedData: ISubscription[];
  subscriptionType: ISubscriptionType[];
  membershipList: IMembershipInfo[];
  currencyList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialSubscriptionState: ISubscriptionState = {
  approvedData: [],
  awaitingApprovalData: [],
  processedData: [],
  subscriptionType: [],
  membershipList: [],
  currencyList: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
