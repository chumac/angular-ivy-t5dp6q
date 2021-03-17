import { ActionReducerMap } from "@ngrx/store";
import { applicationsReducer } from '../applications';

import { ILoanState } from "./root.state";
import { repaymentsReducer } from "../repayments";
import { proxyApplicationsReducer } from "../proxy-applications";
import { disbursementsReducer } from "../disbursements";
import {definitionsReducer } from "../definitions";
import { closureReducer } from "../closure";
import { transactionsReducer } from "../transactions";
import { closedReducer } from "../closed";

export const rootReducer: ActionReducerMap<ILoanState> = {
  applications: applicationsReducer,
  repayments: repaymentsReducer,
  proxyApplication: proxyApplicationsReducer,
  disbursements: disbursementsReducer,
  definitions: definitionsReducer,
  closure: closureReducer,
  closed: closedReducer,
  transactions: transactionsReducer
};
