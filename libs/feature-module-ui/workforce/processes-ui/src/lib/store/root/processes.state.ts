import { createFeatureSelector } from "@ngrx/store";

import { ISelfProcessTransactionState } from "../processes/self-process-transaction";
import { ICustomProcessLookupState } from "../processes/custom-process-lookup";
import { IProcessFormWizardState } from "../processes/process-form-wizard";
import { ITeamProcessTransactionState } from "../processes/team-process-transaction";
import { IReviewerProcessTransactionState } from "../processes/reviewer-process-transaction";
import { IHrProcessTransactionState } from "../processes/hr-process-transaction";

import { ICustomFormState } from "../processes/custom-form";
import { IHrCustomDataFormState } from "../processes/hr-custom-data-form";
import { IProcessFormDefinitionState } from "../processes/process-form-definition";
import { ICustomProcessMapState } from "../processes/custom-process-map";


export const getProcessesState = createFeatureSelector<IProcessesState>('custom-process');

export interface IProcessesState {
  customForm: ICustomFormState,
  hrCustomDataForm: IHrCustomDataFormState,
  processFormDefinition: IProcessFormDefinitionState,
  customProcessMap: ICustomProcessMapState,

  customProcessLookup: ICustomProcessLookupState,
  processFormWizard: IProcessFormWizardState,
  selfProcessTransaction: ISelfProcessTransactionState,
  teamProcessTransaction: ITeamProcessTransactionState,
  reviewerProcessTransaction: IReviewerProcessTransactionState,
  hrProcessTransaction: IHrProcessTransactionState,
}

export const initialState: IProcessesState = {
  customForm: null,
  hrCustomDataForm: null,
  processFormDefinition: null,
  customProcessMap: null,

  customProcessLookup: null,
  processFormWizard: null,
  selfProcessTransaction: null,
  teamProcessTransaction: null,
  reviewerProcessTransaction: null,
  hrProcessTransaction: null
}
