// import { ActionReducerMap } from "@ngrx/store";

// import { IRootState } from "./root.state";
// // import { approvalReducer } from "../approval";
// // import { leaveEditReducer } from "../leave-edit";

// export const rootReducer: ActionReducerMap<IRootState> = {
//   // approval: approvalReducer,
//   // leaveEdit: leaveEditReducer
// };

import { ActionReducerMap } from "@ngrx/store";
import { IHRFoundationState } from "./root.state";

import { organizationReducer } from "../organization";
import { optionReducer } from "../option";
import { notificationReducer } from "../notification";
import { workDefinitionReducer } from "../workflow-definition"
import { workFlowMapReducer } from "../workflow-map/workflow-map.reducers";
import { systemReducer } from "../system";
import { emailReducer } from "../email";
import { workDetailsReducer } from "../workflow-details";
import { workFlowMapAlternateReducer } from "../alt-workflow-map";
import { reportReducer } from "../report";
import { securityReducer } from "../security";


export const rootReducer: ActionReducerMap<IHRFoundationState> = {
  organization: organizationReducer,
  Options: optionReducer,
  notification: notificationReducer,
  workDefinition: workDefinitionReducer,
  workFlowMap: workFlowMapReducer,
  system: systemReducer,
  email: emailReducer,
  workDetails: workDetailsReducer,
  altWorkFlowMap: workFlowMapAlternateReducer,
  report: reportReducer,
  security: securityReducer
};
