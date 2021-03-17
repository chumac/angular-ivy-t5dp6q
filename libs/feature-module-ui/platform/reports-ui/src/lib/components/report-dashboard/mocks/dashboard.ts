import { GridsterConfig } from "angular-gridster2";

export interface IDashboardConfig extends GridsterConfig { }

// export interface IDashboardWidget extends DashboardItem { }

export interface ICustomDashboard {
  id?: string;
  name?: string;
  // widgets?: IDashboardWidget[];
}
