
import { createFeatureSelector } from '@ngrx/store';
import { IApplicationsState } from '../applications';
import { IRepaymentsState } from '../repayments';
import { IProxyApplicationsState } from '../proxy-applications';
import { IDisbursementsState } from '../disbursements';
import { IDefinitionsState } from '../definitions';
import { IClosureState } from '../closure';
import { ITransactionsState } from '../transactions';
import { IClosedState } from '../closed';


export interface ILoanState {
  applications: IApplicationsState;
  repayments: IRepaymentsState;
  proxyApplication: IProxyApplicationsState;
  disbursements: IDisbursementsState;
  definitions: IDefinitionsState;
  closure: IClosureState;
  closed: IClosedState;
  transactions: ITransactionsState;
}

export const initialState: ILoanState = {
  applications: null,
  repayments: null,
  proxyApplication: null,
  disbursements: null,
  definitions: null,
  closure: null,
  closed: null,
  transactions: null
};

export const getLoanState = createFeatureSelector<ILoanState>('loans');
