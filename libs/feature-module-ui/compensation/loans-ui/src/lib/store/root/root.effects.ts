import { ApplicationsEffects } from "../applications";
import { RepaymentsEffects } from "../repayments";
import { ProxyApplicationsEffects } from "../proxy-applications";
import { DisbursementsEffects } from "../disbursements";
import { DefinitionsEffects } from "../definitions";
import { ClosureEffects } from "../closure";
import { TransactionsEffects } from "../transactions";
import { ClosedEffects } from "../closed";

export const rootEffects = [
  ApplicationsEffects,
  RepaymentsEffects,
  ProxyApplicationsEffects,
  DisbursementsEffects,
  DefinitionsEffects,
  ClosureEffects,
  ClosedEffects,
  TransactionsEffects
]

