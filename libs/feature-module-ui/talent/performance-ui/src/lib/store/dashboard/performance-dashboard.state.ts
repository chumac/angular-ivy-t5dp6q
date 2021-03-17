
import { IPerfDashboardMasters, IPerfDashboardObjectives, IPlan } from '@nutela/models/talent/performance';

export interface IPerformanceDashboardState {
  masters: IPerfDashboardMasters;
  objectives: IPerfDashboardObjectives[];
  teamMasters: IPerfDashboardMasters;
  teamObjectives: IPerfDashboardObjectives[];
  currentPlan: IPlan;
  isProcessing: boolean;
  isProcessingTeam: boolean;
}

export const initialPerformanceDashboardState: IPerformanceDashboardState = {
  masters: null,
  objectives: [],
  teamMasters: null,
  teamObjectives: [],
  currentPlan: null,
  isProcessing: false,
  isProcessingTeam: false
}

