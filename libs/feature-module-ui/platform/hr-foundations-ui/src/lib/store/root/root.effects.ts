// // import { ApprovalEffects } from "../approval";
// // import { LeaveEditEffects } from "../leave-edit";

// export const rootEffects = [
//   // ApprovalEffects, LeaveEditEffects
// ]
import { OrganizationEffects } from "../organization";
import { OptionEffects } from "../option";
import { NotificationEffects } from "../notification";
import { WorkflowMapEffects  } from "../workflow-map";
import { WorkDefinitionEffects} from "../workflow-definition";
import { EmailEffects } from "../email";
import { SystemEffects } from "../system";
import { WorkDetailsEffects } from "../workflow-details";
import { AltWorkflowMapEffects } from "../alt-workflow-map";
import { SecurityEffects } from "../security";
import { ReportEffects } from "../report";

export const rootEffects = [
  OrganizationEffects, OptionEffects, EmailEffects, SystemEffects, NotificationEffects, WorkDefinitionEffects, WorkflowMapEffects,
  WorkDetailsEffects, AltWorkflowMapEffects, SecurityEffects, ReportEffects
]
