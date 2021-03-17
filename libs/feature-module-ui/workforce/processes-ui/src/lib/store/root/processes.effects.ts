import { CustomFormEffects } from '../processes/custom-form';
import { HrCustomDataFormEffects } from "../processes/hr-custom-data-form";
import { ProcessFormDefinitionEffects } from '../processes/process-form-definition';
import { CustomProcessMapEffects } from '../processes/custom-process-map';

import { SelfProcessTransactionEffects } from '../processes/self-process-transaction';
import { CustomProcessLookupEffects } from '../processes/custom-process-lookup';
import { ProcessFormWizardEffects } from '../processes/process-form-wizard';
import { TeamProcessTransactionEffects } from '../processes/team-process-transaction';
import { ReviewerProcessTransactionEffects } from '../processes/reviewer-process-transaction';
import { HrProcessTransactionEffects } from '../processes/hr-process-transaction';

export const processesEffects = [
  CustomFormEffects,
  HrCustomDataFormEffects,
  ProcessFormDefinitionEffects,
  CustomProcessMapEffects,

  CustomProcessLookupEffects,
  ProcessFormWizardEffects,
  SelfProcessTransactionEffects,
  TeamProcessTransactionEffects,
  ReviewerProcessTransactionEffects,
  HrProcessTransactionEffects
];
