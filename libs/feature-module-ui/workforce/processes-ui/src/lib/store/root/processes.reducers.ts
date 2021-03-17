import { ActionReducerMap } from '@ngrx/store';

import { IProcessesState } from './processes.state';

import { customFormReducer } from '../processes/custom-form';
import { hrCustomDataFormReducer } from "../processes/hr-custom-data-form";
import { processFormDefinitionReducer } from '../processes/process-form-definition';
import { customProcessMapReducer } from '../processes/custom-process-map';
import { selfProcessTransactionReducer } from '../processes/self-process-transaction';
import { customProcessLookupReducer } from '../processes/custom-process-lookup';
import { processFormWizardReducer } from '../processes/process-form-wizard';
import { teamProcessTransactionReducer } from '../processes/team-process-transaction';
import { reviewerProcessTransactionReducer } from '../processes/reviewer-process-transaction';
import { hrProcessTransactionReducer } from '../processes/hr-process-transaction';




export const processesReducer: ActionReducerMap<IProcessesState> = {
  customForm: customFormReducer,
  hrCustomDataForm: hrCustomDataFormReducer,
  processFormDefinition: processFormDefinitionReducer,
  customProcessMap: customProcessMapReducer,

  customProcessLookup: customProcessLookupReducer,
  processFormWizard: processFormWizardReducer,
  selfProcessTransaction: selfProcessTransactionReducer,
  teamProcessTransaction: teamProcessTransactionReducer,
  reviewerProcessTransaction: reviewerProcessTransactionReducer,
  hrProcessTransaction: hrProcessTransactionReducer
};
