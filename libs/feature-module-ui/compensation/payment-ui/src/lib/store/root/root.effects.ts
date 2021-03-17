
import { ScheduleEffects } from "../schedule";
import { PayDeskEffects } from "../setup/pay-desk";
import { ScheduleDetailEffects } from "../schedule-details";
import { PendingScheduleEffects } from "../pending";
import { CompletedEffects } from "../completed";
import { ClosedEffects } from "../closed";
import { ProcessingEffects } from "../processing";

export const rootEffects = [
  PayDeskEffects,
  ScheduleEffects,
  PendingScheduleEffects,
  ScheduleDetailEffects,
  CompletedEffects,
  ClosedEffects,
  ProcessingEffects
]

